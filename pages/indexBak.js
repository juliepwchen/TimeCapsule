import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

//index.js is 'Root' page for Next.js
class TimeCapsuleFactory extends Component {
    //Next.js calls this function
    static async getInitialProps() {
        const timecapsules = await factory.methods.getDeployTimeCapsules().call();
        return { timecapsules };
    }

    //Next.js does not call this function
    /*
    async componentDidMount() {
        const campaigns = await factory.methods.getDeployCampaigns().call();
        console.log(campaigns);
    } */

    renderTimeCapsules() {
        const items = this.props.timecapsules.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/timecapsules/${address}`}>
                        <a>View Time Capsules</a>
                    </Link>
                ),
                fluid: true
            };
        });
        return <Card.Group items={items} />;
    }

    /*
    render() {
        //<div> inside of <Layout> 
        //pass as a property called 'children'
        return(
            <Layout>
                <div>
                    <h3>Open Time Capsule</h3>
                    <Link route='/timecapsules/new'>
                        <a>
                            <Button
                                content='Create Time Capsule'
                                icon='add circle'
                                primary
                                floated='right'
                            />
                        </a>
                    </Link>
                    { this.renderTimeCapsules() }
                </div>
            </Layout>
        );
    } */
    render() {
        return(
            <Layout>
                <div>
                { this.renderTimeCapsules() }
                </div>
            </Layout>
        );
    }
}
export default TimeCapsuleFactory;