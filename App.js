/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { ToastAndroid, AsyncStorage, Image, Dimensions } from 'react-native'
import { Tabs } from './appsettings/router';
import { Spinner, Container, Content, Grid, Row, Text } from 'native-base';
import firebase from './appsettings/fbconfig';
import RNFetchBlob from 'react-native-fetch-blob';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.itemsRef = firebase.database().ref();
    this.state = {
      isReady: false,
      loadUser: false
    }
    console.ignoredYellowBox = [
      'Setting a timer',
      'Circular indeterminate'
    ];

    let dirs = RNFetchBlob.fs.dirs





  }

  componentWillMount() {

    this.getCurrentUser();
  }




  render() {
    if (!this.state.loadUser || !this.state.isReady) {


      return (
        <Container>
          <Content style={{ backgroundColor: '#FB8C00' }} contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
            <Grid style={{ alignItems: 'center' }}>
              <Row size={1}>
                <Image source={require('./assets/animetitancover.png')}
                  style={{
                    width: Dimensions.get('window').width,
                    height: 170
                  }}></Image>
              </Row>
              <Grid style={{ alignItems: 'center' }}>
                <Row>
                  <Spinner style={{ margin: 'auto', alignSelf: 'center' }} color='blue' />
                </Row>
                <Row>

                  <Text style={{ color: "white", margin: 10, fontFamily: 'robot_c', alignSelf: 'center', fontWeight: 'bold', fontSize: 18 }}>THE TITANS ARE LOADING YOUR APP.</Text>
                </Row>
              </Grid>
              <Row size={1}>

              </Row>

            </Grid>
          </Content>
        </Container >


      );
    }
    else return <Tabs
      screenProps={{ originalItems: this.state.originaItems }}
    />;

    // if (!this.state.isReady) {
    //   return <Spinner />
    // }

  }


  async getCurrentUser() {

    AsyncStorage.getItem('userID')
      .then((value) => {
        if (value !== null) {
          console.log(value);
          ToastAndroid.showWithGravity("Welcome Back!", ToastAndroid.SHORT, ToastAndroid.CENTER);
          this.setState({ idd: value, loadUser: true });

        } else {
          ToastAndroid.showWithGravity("Welcome for the first time!", ToastAndroid.SHORT, ToastAndroid.CENTER);
          this.setUser();

        }
      }).done();

    await fetch('http://gomcineplex.com/data/anime/sd_android.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isReady: true,
          originaItems: responseJson
        });
        // console.log(this.state.originaItems)
      })

      .catch((error) => {
        console.error(error);
      });

  }

  setUser() {
    AsyncStorage.setItem('userID', this.itemsRef.child('Users').push().key).then(() => { this.setState({ loadUser: true }) }).done();
  }
}


