import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Router } from '../../../routes';

class RequestNew extends Component {
    static async getInitialProps(props) {
        return {  
          address: props.query.address
        };
    }
    state ={
        value: '',
        description: '',
        recipient: '',
        errorMessage: '',
        loading: false
    }
    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });
        try {
            const accounts = await web3.eth.getAccounts();
            const campaign = await Campaign(this.props.address);
            await campaign.methods.createRequest(
                this.state.description,
                web3.utils.toWei(this.state.value, 'ether'),
                this.state.recipient,
                
            ).send({
                from: accounts[0]  
            });
            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        } catch (e) {
            this.setState({ errorMessage: e.message });
        }
        this.setState({ 
            loading: false
        });
    };

    render() {
        return(
            <Layout>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                    <label>Description</label>
                    <Input 
                        value={ this.state.description }
                        onChange={event=>this.setState({
                            description: event.target.value,
                            errorMessage: ''
                        })}
                    />
                    </Form.Field>
                    <Form.Field>
                    <label>Value in Ether</label>
                    <Input 
                        value={ this.state.value }
                        onChange={event=>this.setState({
                            value: event.target.value,
                            errorMessage: ''
                        })}
                    />
                    </Form.Field>
                    <Form.Field>
                    <label>Recipient</label>
                    <Input 
                        value={ this.state.recipient }
                        onChange={event=>this.setState({
                            recipient: event.target.value,
                            errorMessage: ''
                        })}
                    />
                    </Form.Field>
                    <Message error
                        header='Oooops!'
                        content={ this.state.errorMessage }
                    />
                    <Button
                        loading={ this.state.loading }
                        primary type='submit'>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default RequestNew;