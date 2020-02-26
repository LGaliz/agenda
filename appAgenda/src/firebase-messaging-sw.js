importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

  firebase.initializeApp({
    apiKey: 'AIzaSyC3gf_F64SxWOHgfFXj2pUoYXEcF0Amjhg',
    authDomain: 'agenda-6cbb0.firebaseapp.com',
    databaseURL: 'https://agenda-6cbb0.firebaseio.com',
    projectId: 'agenda-6cbb0',
    storageBucket: 'agenda-6cbb0.appspot.com',
    messagingSenderId: '1041911056800',
    appId: '1:1041911056800:web:d91195425b898ffcdabcc5',
    measurementId: 'G-0K9YRWE8BQ'
});
const messaging = firebase.messaging();