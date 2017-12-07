import React, { Component } from 'react';
import { ToastAndroid } from 'react-native'
import { Title, Body, Text, Container, Header, Footer, Icon, Grid, Col, Row, Thumbnail, Content, List, ListItem, Spinner } from 'native-base';


export default class ScreenTemplate extends Component {

    constructor(props) {
        super(props);
  
    }

    
    render() {
       
        return (

            <Container>
                <Header>
                    <Body>
                        <Title>History</Title>
                    </Body>
                </Header>
                <Content>
             </Content> 
            </Container>
        );
    }
}