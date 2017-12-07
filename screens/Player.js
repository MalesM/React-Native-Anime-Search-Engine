import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Title, Text, Container, Header, Footer, Icon, Grid, Col, Row, Thumbnail, Content, Spinner, Left, Button, Body, Right } from 'native-base';
import Video from 'react-native-video';

import VideoPlayer from 'react-native-video-controls';


export default class Player extends Component {

    static navigationOptions = {
        gesturesEnabled: false
    }

    static navigationOptions = ({ navigation }) => ({
        header: null,
        tabBarVisible: false,
    });

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            episodeLink: params.episodeLink,
            isLoading: true
        }


    }



    componentDidMount() {
        // StatusBar.setHidden(true);
    }

    componentWillMount() {
        this.getStreams();
        console.log("WILL MOUNT");
    }

    componentWillUnmount() {


    }
    render() {
        // return (
        //     <Container>
        //         <Header>
        //             <Left>
        //                 <Button transparent
        //                     onPress={() => this.props.navigation.goBack()}>
        //                     <Icon name='arrow-back' />
        //                 </Button>
        //             </Left>
        //             <Body>
        //                 <Title></Title>
        //             </Body>
        //             <Right>

        //             </Right>
        //         </Header>
        //         <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
        //             {this.state.isLoading ? <Spinner /> :
        //                 <VideoPlayer
        //                     videoProps={{
        //                         shouldPlay: true,
        //                         resizeMode: Video.RESIZE_MODE_CONTAIN,
        //                         source: {
        //                             uri: this.state.gstream,
        //                         },

        //                     }}
        //                     isPortrait={true}
        //                     playFromPositionMillis={0}
        //                     playbackCallback={(playbackStatus) => {
        //                         console.log(playbackStatus.isLoaded)
        //                     }}
        //                     errorCallback={(error) => {
        //                         console.log('Error: ', error.message, error.type, error.obj);0
        //                     }}
        //                     switchToLandscape={this.switchToLandscape.bind(this)}
        //                     switchToPortrait={this.switchToPortrait.bind(this)}

        //                 />}
        //         </Content>
        //     </Container>

        // );
        return (
            this.state.isLoading ? <Spinner /> : <VideoPlayer
                source={{ uri: this.state.gstream }}
                paused={true}

            />
        )
    }

    async getStreams() {
        var params = {
            LinkIos: this.state.episodeLink
        }

        var formData = new FormData();
        for (var k in params)
            formData.append(k, params[k]);
        await fetch('http://animeonline.club/php/animewatch_new.php', {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    gstream: responseJson.gstream,
                    isLoading: false
                })
                console.log(this.state.gstream);
            })
    }


}