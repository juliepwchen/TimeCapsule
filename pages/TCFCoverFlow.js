import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Coverflow from 'react-coverflow';

class TimeCapsuleFactoryCoverFlow extends Component {
    componentDidMount() {
        
    }
    onClick = () => {

    }
    render() {
        return(
            <Coverflow
                width='960'
                height='480'
                displayQuantityOfSide={2}
                navigation={false}
                enableHeading={false}
                enableScroll={true}
                clickable={true}
                active={0}
            >
            <div
                onClick={this.onClick }
                onKeyDown={this.onClick }
                role="menuitem"
                tabIndex="0"
            >
            <img
                src='[image/path/please_change]'
                alt='title or description'
                style={{ display: 'block', width: '100%' }}
            />
            </div>
                <img src='[image/path/please_change]' alt='title or description' data-action="http://andyyou.github.io/react-coverflow/"/>
                <img src='[image/path/please_change]' alt='title or description' data-action="http://andyyou.github.io/react-coverflow/"/>
            </Coverflow>, 
            document.querySelector('.content')
        );
    }
}

export default TimeCapsuleFactoryCoverFlow;

