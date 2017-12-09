import React, { Component } from 'react';
import { ToastAndroid, AsyncStorage } from 'react-native'
import { Title, Body, Text, Container, Header, Footer, Icon, Grid, Col, Row, Thumbnail, Content, List, ListItem, Spinner, StyleProvider } from 'native-base';
import getTheme from '.././native-base-theme/components';
import material from '.././native-base-theme/variables/material';
import firebase from '../appsettings/fbconfig';

export default class FavoritesTab extends Component {

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

    componentWillMount() {

    }


    render() {
        const { navigate } = this.props.navigation;
        this.addFavorites();


        /* if(!this.added){
            this.addFavorites();
        } */
        return (

            <Container>
                <StyleProvider style={getTheme(material)}>
                    <Header backgroundColor='#FB8C00'>
                        <Body>
                            <Title>Favorites</Title>
                        </Body>
                    </Header>
                </StyleProvider>
                <Content>
                    {this.state.isLoading ? <Spinner /> :
                        <List dataArray={this.state.listData}
                            renderRow={(item) =>
                                <ListItem
                                    button={true}
                                    onPress={() => {
                                        /* this.added = false; */
                                        navigate('Info', { title: item.name, image: item.thumb, animeLink: item.link });
                                    }}
                                >

                                    <Text style={{ textAlign: 'center', flex: 1 }}>  {item.name}</Text>
                                </ListItem>
                            }>

                        </List>}
                </Content>
            </Container>
        );
    }


    addFavorites() {
        AsyncStorage.getItem('userID')
            .then((id) => {
                this.itemsRef.child('Users').child(id).child('Favorites').once('value').then((snapshot) => {
                    var data = [];
                    snapshot.forEach(element => {
                        data.push({
                            name: element.child('name').val(),
                            link: element.child('link').val(),
                            thumb: element.child('thumb').val(),
                        });
                    });
                    this.added = true;
                    this.setState({ listData: data, isLoading: false })
                }, (error) => {
                    console.log(error);
                });

            }).done();
    }
}