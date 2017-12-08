import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Title, Text, Container, Header, Footer, Icon, Grid, Col, Row, Thumbnail, Content, Spinner, Left, Button, Body, Right } from 'native-base';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';

import VideoPlayer from 'react-native-video-controls';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob'



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
        Orientation.lockToLandscape();
    }

    componentWillMount() {
        this.getStreams();
    }

    componentWillUnmount() {
        AdMobInterstitial.setAdUnitID('ca-app-pub-3282954780570062/4893576213');

        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());

        Orientation.unlockAllOrientations();

    }




    render() {
        return (
            <Container>
                <StatusBar hidden />
                {this.state.isLoading ? <Spinner /> : <VideoPlayer
                    source={{ uri: this.state.gstream }}
                    paused={false}
                    onBack={() => {
                        this.props.navigation.goBack()
                    }}

                />}
            </Container>

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