import React, { Component } from "react";
import { Card, Button, Image, Icon } from 'semantic-ui-react';
import Layout from '../components/Layout';
import Slider from 'react-slick';
import factory from '../ethereum/factory';
import { Router, Link } from '../routes';

class TimeCapsuleSlider extends Component {
    colors = [
        'red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black',
    ];
    static async getInitialProps() {
        const timecapsules = await factory.methods.getDeployTimeCapsules().call();
        return { timecapsules };
    }
    // onButtonClick = (address) => {
    //     Router.pushRoute(`/timecapsules/${address}`);
    //     //Router.pushRoute('/');
    // }
    renderSliderItem = () => (
        this.props.timecapsules.map((address, index) => 
            <div key={index}>
              <Card.Group itemsPerRow={1} style={{height: 200}}>
                <Card
                    //image={require('../images/tc1.jpg')}
                    fluid
                    //header={address}
                    //meta='Code Word'
                    //description='Description'
                    //color={this.colors[index]}
                    extra={(
                        <Link route={`/timecapsules/${address}`}>
                            <a>View Details</a>
                        </Link>
                    )}
                >
                    <Card.Content>
                        <Card.Header>
                        Code Name
                        </Card.Header>
                        <Card.Meta>
                        {address}
                        </Card.Meta>
                        <Card.Description>
                        Description
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                          <Link route={`/timecapsules/${address}`}>
                            <Button basic color='violet'>
                                <a style={{color:'blue'}}>View Details</a>
                            </Button>
                          </Link>
                        </div>
                    </Card.Content>
                </Card>
              </Card.Group>
            </div> )
    )
    
    render() {
        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2
        };
        return (
            <Layout>
                <div>
                    <Slider {...settings}>
                    {
                        this.renderSliderItem() 
                    }
                    </Slider>
                </div>
            </Layout>
        );
    }
}

export default TimeCapsuleSlider;