import React, { Component } from 'react';
import { ToastAndroid, AsyncStorage } from 'react-native'
import { List, ListItem, Title, Body, Text, Container, Header, Footer, Icon, Grid, Col, Row, Thumbnail, Content, Spinner, Left, Right, Button, StyleProvider } from 'native-base';
import getTheme from '.././native-base-theme/components';
import material from '.././native-base-theme/variables/material';
import firebase from '../appsettings/fbconfig';

export default class AnimeEpisodes extends Component {

    constructor(props) {
        super(props);
        this.itemsRef = firebase.database().ref();
        const { params } = this.props.navigation.state;
        this.state = {
            animeLink: params.animeLink,
            isLoading: false,
            animeTitle: params.animeTitle,
            userID: params.userID,
            episodeSource: [],
        }
        console.log(params.animeLink);
    }

    /* componentDidMount() {
        this.getFromHistory();
        
    } */

    componentWillMount() {
        this.getEpisodeList();
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container>
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

                        </Right>
                    </Header>
                </StyleProvider>
                <Content>
                    {this.state.isLoading ? <Spinner /> :
                        <List style={{ marginTop: 5 }} dataArray={this.state.episodeSource}
                            renderRow={(item) =>
                                <ListItem
                                    style={{ width: '100%', marginLeft: 0, paddingLeft: 0, paddingRight: 0, marginRight: 0 }}
                                    button={true}
                                    onPress={() => {
                                        this.saveToHistory(item.title, item.href);
                                        navigate('Player', { episodeLink: item.href });
                                    }
                                    }
                                >

                                    <Body style={{ flex: 1 }}><Text style={{ alignSelf: 'center', textAlign: 'center' }}>  {item.title}</Text></Body>
                                    <Right>
                                        <Button bordered primary style={{ alignSelf: 'center', marginLeft: 15 }}
                                            onPress={() => {
                                                this.downloadEpisode(item.href)
                                            }}>
                                            <Icon name='download' />
                                        </Button>
                                    </Right>
                                    <Text style={{ textAlign: 'center', flex: 1 }}>  {item.title}</Text>
                                </ListItem>
                            }>

                        </List>}
                </Content>
            </Container>
        )
    }


    saveToHistory(t, h) {

        this.itemsRef.child('Users').child(this.state.userID).child('History').once('value').then((snapshot) => {
            if (snapshot.hasChildren()) {
                var haveH = 0;
                var key = '';
                snapshot.forEach(element => {
                    if (element.child('name').val() == this.state.animeTitle) {
                        haveH++;
                        key = element.key;
                    }
                });
                if (haveH == 0) {
                    this.itemsRef.child('Users').child(this.state.userID).child('History').push({ name: this.state.animeTitle, episode: t, link: this.state.animeLink });
                } else {
                    this.itemsRef.child('Users').child(this.state.userID).child('History').child(key).remove();
                    this.itemsRef.child('Users').child(this.state.userID).child('History').push({ name: this.state.animeTitle, episode: t, link: this.state.animeLink });
                }

                const { navigate } = this.props.navigation;

            } else {

                this.itemsRef.child('Users').child(this.state.userID).child('History').push({ name: this.state.animeTitle, episode: t, link: this.state.animeLink });

            }
        });
    }

    getEpisodeList() {
        var params = {
            Episodes: this.state.animeLink
        }

        var formData = new FormData();
        for (var k in params)
            formData.append(k, params[k]);
        fetch('http://animeonline.club/php/animewatch_new1.php', {
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