import React, { Component } from 'react';
import { ToastAndroid, AsyncStorage, Image } from 'react-native'
import { Text, Container, Footer, Icon, Grid, Col, Row, Thumbnail, Content, Button, Left, Body, Right, Header, Title, Card, CardItem, StyleProvider, Spinner } from 'native-base';
import firebase from '../appsettings/fbconfig';
import getTheme from '.././native-base-theme/components';
import material from '.././native-base-theme/variables/material';

export default class AnimeInfo extends Component {

    constructor(props) {
        super(props);
        this.itemsRef = firebase.database().ref();
        this.favoriteKey = '';
        this.checks = false;
        const { params } = this.props.navigation.state;
        this.state = {
            favoriteIcon: false,
            isLoading: true,
            animeTitle: params.title,
            animeLink: params.animeLink,
            animeThumb: params.image,
            titleA: params.title,
            animeGenres: params.animeGenres
        }

    }

    componentWillMount() {
        this.getEpisodeList();
    }

    render() {
        const Dimensions = require('Dimensions');
        const window = Dimensions.get('window');

        if (!this.checks) {
            this.checkFavorites();
            this.checks = true;
        }

        return (
            <Container >
                <StyleProvider style={getTheme(material)}>
                    <Header backgroundColor='#FB8C00'>
                        <Left>
                            <Button transparent
                                onPress={() => this.props.navigation.goBack()}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>{this.state.animeTitle.trim()}</Title>
                        </Body>
                        <Right>
                            {/* <Button transparent
                                onPress={() => this.addToFavorite()}>
                                <Icon name={this.state.favoriteIcon ? 'ios-star' : 'ios-star-outline'} style={{ fontSize: 30, color: 'orange' }} />
                            </Button> */}
                        </Right>
                        {/* <Icon name={this.state.favoriteIcon ? 'ios-star' : 'ios-star-outline'} style={{ color: 'orange' }} /> */}
                    </Header>
                </StyleProvider>
                <Content contentContainerStyle={{ justifyContent: 'center' }}>
                    <Card style={{}} >
                        <CardItem>
                            <Left>
                                <Body>
                                    <Text>{this.state.animeTitle}</Text>
                                    <Text note>{this.state.animeGenres}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{ uri: this.state.animeThumb }} style={{ height: 200, width: null, flex: 1, resizeMode: 'cover' }} />

                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent
                                    onPress={() => this.addToFavorite()}>
                                    <Icon name={this.state.favoriteIcon ? 'ios-star' : 'ios-star-outline'} style={{ fontSize: 30, color: 'orange' }} />
                                    <Text>Favorite</Text>
                                </Button>
                            </Left>
                            <Body>

                            </Body>
                            <Right>
                                {this.state.isLoading ?
                                    <Button transparent disabled
                                        onPress={() => this.goToEpisodes()}>
                                        <Icon name='ios-play' style={{ fontSize: 30, color: 'orange' }} />
                                        <Text>Watch</Text>
                                    </Button> :
                                    <Button transparent
                                        onPress={() => this.goToEpisodes()}>
                                        <Icon name='ios-play' style={{ fontSize: 30, color: 'orange' }} />
                                        <Text>Watch</Text>
                                    </Button>
                                }

                            </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text>Description</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                {this.state.isLoading ? <Spinner /> :
                                    <Text>
                                        {this.state.animeDesc.trim()}
                                    </Text>}
                            </Body>
                        </CardItem>
                    </Card>

                </Content>
            </Container >
        );
    }
    goToEpisodes() {
        const { navigate } = this.props.navigation;
        
        navigate('Episodes', { animeLink: this.state.animeLink, animeTitle: this.state.animeTitle, userID: this.idUser/* , episodeSource: this.state.episodeSource */ });
    }

    addToFavorite() {

        AsyncStorage.getItem('userID')
            .then((value) => {
                this.setState({ favoriteIcon: !this.state.favoriteIcon }, () => {
                    if (this.state.favoriteIcon) {
                        ToastAndroid.showWithGravity("Added to Favorites", ToastAndroid.SHORT, ToastAndroid.CENTER);
                        this.favoriteKey = this.itemsRef.child('Users').child(value).child('Favorites').push({ name: this.state.titleA, thumb: this.state.animeThumb, link: this.state.animeLink }).key;

                    } else {
                        ToastAndroid.showWithGravity("Removed from Favorites", ToastAndroid.SHORT, ToastAndroid.CENTER);
                        this.itemsRef.child('Users').child(value).child('Favorites').child(this.favoriteKey).remove();
                    }
                });

            }).done();
    }

    checkFavorites() {
        AsyncStorage.getItem('userID')
            .then((id) => {
                this.idUser = id;
                this.itemsRef.child('Users').child(id).child('Favorites').once('value').then((snapshot) => {
                    snapshot.forEach(element => {
                        if (element.child('name').val() == this.state.titleA) {
                            this.setState({ favoriteIcon: true });
                            this.favoriteKey = element.key;
                        }
                    });
                });

            }).done();

    }

    getEpisodeList() {
        var params = {
            Episodes: this.state.animeLink
        }

        var formData = new FormData();
        for (var k in params)
            formData.append(k, params[k]);
        fetch('http://animeonline.club/php/animewatch_new.php', {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.released[0].content);
                this.setState({
                    episodeSource: responseJson.episodes,
                    animeStatus: _.trim(responseJson.status[0].content),
                    animeReleased: _.trim(responseJson.released[0].content),
                    animeDesc: responseJson.desc[0].content,
                    isLoading: false
                })
            })
    }
}