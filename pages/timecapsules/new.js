import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router, Link } from '../../routes';

//Next.js does not have dynamic routing
class TimeCapsuleNew extends Component {
    state={
        minimumContribution: '',
        errorMessage: '',
        loading: false
    };

    //no need for binding 'this' using this syntax
    onSubmit = async (event) => {
        //prevent automatic Form submitting to backend server
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });
        try {
            const accounts = await web3.eth.getAccounts();

            //no need to specify GAS when running in Browser
            //MetaMask will automatically calculate GAS for us
            //specify GAS only when testing
            
            //User needs to login/unlock their Metamask accounts
            //Select right testing network: Rinkeby
            await factory.methods.createTimeCapsule(
                this.state.minimumContribution
            ).send({
                from: accounts[0]  
            });
            Router.pushRoute('/');
        } catch (e) {
            this.setState({ errorMessage: e.message });
        }
        this.setState({ loading: false });
    };

    //errorMessage = empty string (interpreted as false)
    //!"truth" = false, !!"truth" = true
    //!! turns a string into a boolean
    render() {
        return(
            <Layout>
                <h3>Create a Time Capsule</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input 
                        label='wei' 
                        labelPosition='right'
                        value={ this.state.minimumContribution }
                        onChange={event=>this.setState({
                            minimumContribution: event.target.value,
                            errorMessage: ''
                        })}
                    />
                    </Form.Field>
                    <Message error
                        header='Oooops!'
                        content={ this.state.errorMessage }
                    />
                    <div className='ui one buttons'>
                        <Button
                            loading={ this.state.loading }
                            basic color='violet' type='submit'>
                            <a style={{color:'blue'}}>Create</a>
                        </Button>
                    </div>
                </Form>
            </Layout>
        );
    }
}

export default TimeCapsuleNew;