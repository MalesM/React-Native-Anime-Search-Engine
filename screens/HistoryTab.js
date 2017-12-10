import React, { Component } from 'react';
import { ToastAndroid, AsyncStorage } from 'react-native'
import { Title, Body, Text, Container, Header, Footer, Icon, Grid, Col, Row, Thumbnail, Content, List, ListItem, Spinner, StyleProvider } from 'native-base';
import getTheme from '.././native-base-theme/components';
import material from '.././native-base-theme/variables/material';
import firebase from '../appsettings/fbconfig';

export default class HistoryTab extends Component {

    constructor(props) {
        super(props);
        this.itemsRef = firebase.database().ref();
        this.linkAnime = '';
        this.thumbAnime = '';
        this.added = false;
        // const { params } = this.props.navigation.state;
        this.state = {
            isLoading: true,
            listData: [],
        }
    }

    /* componentDidMount() {
        this.addFavorites();
    } */


    render() {
        const { navigate } = this.props.navigation;
        this.addHistory();
        /* if(!this.added){ 
            this.addFavorites();
        } */
        return (

            <Container>
                <StyleProvider style={getTheme(material)}>
                    <Header backgroundColor='#FB8C00'>
                        <Body>
                            <Title>History</Title>
                        </Body>
                    </Header>
                </StyleProvider>
                <Content >
                    {this.state.isLoading ? <Spinner /> :
                        <List style={{marginTop: 5}} dataArray={this.state.listData}
                            renderRow={(item) =>
                                <ListItem
                                    style={{marginLeft: 0}}
                                    button={true}
                                    onPress={() => {
                                        
                                        navigate('Episodes', { animeLink: item.link, animeTitle: item.name, userID: this.idUser });
                                    }}
                                >

                                    <Text style={{ textAlign: 'center', flex: 1 }}>  {item.episode}</Text>
                                </ListItem>
                            }>

                        </List>}
                </Content>
            </Container>
        );
    }

    addHistory() {
        AsyncStorage.getItem('userID')
            .then((id) => {
                this.idUser = id;
                this.itemsRef.child('Users').child(id).child('History').once('value').then((snapshot) => {
                    var data = [];
                    snapshot.forEach(element => {
                        data.push({
                            name: element.child('name').val(),
                            link: element.child('link').val(),
                            episode: element.child('episode').val(),
                        });
                    });
                    this.added = true;
                    this.setState({ listData: data, isLoading: false })
                });

            }).done();
    }

    
}