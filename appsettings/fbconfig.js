import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCYea0gE2Lq3tNrscYGkDSskt2Ait3a4Z8",
    authDomain: "animereact-118b8.firebaseapp.com",
    databaseURL: "https://animereact-118b8.firebaseio.com",
    projectId: "animereact-118b8",
    storageBucket: "animereact-118b8.appspot.com",
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

