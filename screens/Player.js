import React, { Component } from 'react';
import { WebView, View, StyleSheet, StatusBar, AppState } from 'react-native';
import { Title, Text, Container, Header, Footer, Icon, Grid, Col, Row, Thumbnail, Content, Spinner, Left, Button, Body, Right } from 'native-base';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';

var VideoPlayer = require('react-native-native-video-player');


// import VideoPlayer from 'react-native-video-controls';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob'

var style = StyleSheet.create({
    fullscreen: {
        height: 500,
        width: 500
    }
})

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
            isLoading: true,
            pause: 0,
            appState: AppState.currentState
        }

    }



    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        //reactContext.addLifecycleEventListener(this);
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

        AppState.removeEventListener('change', this._handleAppStateChange);

    }




    render() {
        this.checkPause();

        return (
            <Container>
                <StatusBar hidden />
                {this.state.isLoading ? <Spinner /> :
                    // <VideoPlayer
                    //     source={{ uri: this.state.gstream }}
                    //     paused={false}
                    //     onBack={() => {
                    //         this.props.navigation.goBack()
                    //     }}
                    //     onError={(error)=>{
                    //         console.log(error);
                    //     }}
                    //     onLoadStart={(data)=>{
                    //         console.log(data);
                    //     }}

                    <Text>Test</Text>}
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
        await fetch('http://animeonline.club/php/animewatch_new1.php', {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson)
                this.setState({
                    gstream: responseJson.gstream,
                    isLoading: false, 
                    //pause: 1,
                })
                
                VideoPlayer.showVideoPlayer(this.state.gstream);

                this.pause = 1;
                // console.log(this.state.gstream);
            })
    }

    checkPause(){
        console.log(AppState.currentState);
        console.log(this.state.pause);
        if (AppState.currentState === 'active' && this.state.pause == 1) {this.props.navigation.goBack();}
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
          console.log('App has come to the foreground!')
        }
        this.setState({appState: nextAppState, pause: 1});
      }

    

}