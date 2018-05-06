import React, { Component } from 'react';
import Layout from '../../components/Layout';
import TimeCapsule from '../../ethereum/timecapsule';
import { Card, Grid, Button, Breadcrumb } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
//import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class TimeCapsuleShow extends Component {
  //Try to get a specific TimeCapsule
  //TimeCapsule's address is in URL 
  //props - different than Component's 'props'
  //props.query.address referes to routes.js as '/timecapsules/:address'
  //there may be a delay when the getInitialProps gets call in browser

  //web3.eth.Contract returns a Result object
  //Result {
  //'0': '100',
  //'1': '0',
  //'2': '0',
  //'3': '0',
  //'4': '0x981Ba78C29954A61c5e55831929a59741dfEFf89' }
  static async getInitialProps(props) {
    const timecapsule = TimeCapsule(props.query.address);
    const summary = await timecapsule.methods.getSummary().call();
    //console.log(summary);
    return {  
      address: props.query.address,
      balance: summary[0],
      lettersCount: summary[1],
      sendersCount: summary[2],
      receiversCount: summary[3],
      ownersCount: summary[4],
      manager: summary[5]

    };
  }
  renderCards() {
    const { 
            balance, 
            lettersCount, 
            sendersCount, 
            receiversCount, 
            ownersCount, 
            manager } = this.props;
    const items = [
      {
        header: 'Manager of Time Capsule',
        description: 'Manager Address',
        meta: manager,
        color:'orange',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: 'Number of Owners',
        description: 'Owners qualify to create Letters by making contributions.',
        meta: ownersCount,
        color:'olive',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: 'Number of Senders',
        description: 'Senders are ones who wish to send the Letter created by Owner. Senders and Owners can be the same people.',
        meta: sendersCount,
        color:'violet',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: 'Number of Receivers',
        description: 'Receivers are ones who allow to open Letters designated to them.',
        meta: receiversCount,
        color:'pink',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: 'Number of Letters',
        description: 'Total Number of Letters in this Time Capusle Contract',
        meta: lettersCount,
        color:'brown',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: 'Contract balance (ether)',
        description: 'Time Capsule balance contributed by Owners.',
        meta: web3.utils.fromWei(balance, 'ether'),
        color:'teal',
        style: { overflowWrap: 'break-word'}
      },

    ];
    return <Card.Group items={items} />
  }
  render() {
      return(
          <Layout>
            <Grid>
              <Grid.Row>
                <Grid.Column width={16}>
                  { this.renderCards() }
                </Grid.Column>
              </Grid.Row>
            </Grid>            
          </Layout>
      );
  }
}

export default TimeCapsuleShow;