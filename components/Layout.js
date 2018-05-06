import React from 'react';
import Head from 'next/head';
import Header from './Header';
import { Container } from 'semantic-ui-react';

//<Head> from Next.js - incorporate <link> into root html file
export default (props)=>{
  return(
      <Container>
          <Head>
            <link 
                rel="stylesheet" 
                href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css">
            </link>
            <link 
                rel="stylesheet" type="text/css" charset="UTF-8" 
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
            <link 
                rel="stylesheet" type="text/css" 
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
          </Head>
          <Header />
          {props.children}
      </Container>
  );
};