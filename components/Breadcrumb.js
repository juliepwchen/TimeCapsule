import React, { Component } from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import { Link } from '../routes';

export default ()=> {
  //state = {}

  //handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    //const { activeItem } = this.state

    return (
        <Breadcrumb size='large'>
            <Breadcrumb.Section link>
                <Link route='/'>
                    <a className='item'>Home</a>
                </Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section link>
                <Link route='/'>
                    <a className='item'>Time Capsule</a>
                </Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section active>Letters</Breadcrumb.Section>
        </Breadcrumb>
    );
}