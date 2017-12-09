/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { ToastAndroid, AsyncStorage, Image } from 'react-native'
import { Tabs } from './appsettings/router';
import { Spinner } from 'native-base';
import firebase from './appsettings/fbconfig';

export default class App extends Component {



  constructor(props) {
    super(props);
    this.loadUser = false;
    this.itemsRef = firebase.database().ref();
    this.state = {
      isReady: false
    }
    console.ignoredYellowBox = [
      'Setting a timer',
      'Circular indeterminate'
    ];
  }




  render() {
    if (!this.loadUser) { this.getCurrentUser(); this.loadUser = true; }

    // if (!this.state.isReady) {
    //   return <Spinner />
    // }
    return <Tabs />;
  }


  getCurrentUser() {

    AsyncStorage.getItem('userID')
      .then((value) => {
        if (value !== null) {
          console.log(value);
          ToastAndroid.showWithGravity("Welcome Back!", ToastAndroid.SHORT, ToastAndroid.CENTER);
          this.setState({ idd: value });

        } else {
          ToastAndroid.showWithGravity("Welcome for the first time!", ToastAndroid.SHORT, ToastAndroid.CENTER);
          this.setUser();

        }
      }).done();

  }

  setUser() {
    AsyncStorage.setItem('userID', this.itemsRef.child('Users').push().key)
  }
}


