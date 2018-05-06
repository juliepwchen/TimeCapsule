import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default ()=> {
  //state = {}

  //handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    //const { activeItem } = this.state

    return (
      <Menu style={{ marginTop: 10}}>
        <Link route='/'>
          <a className='item'>CryptoLetters</a>
        </Link>

        <Menu.Menu position='right'>
          <Link route='/'>
            <a className='item'>Time Capsules</a>
          </Link>

          <Link route='/timecapsules/new'>
            <a className='item'>+</a>
          </Link>
        </Menu.Menu>
      </Menu>
    );
}