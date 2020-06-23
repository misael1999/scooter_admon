importScripts('https://www.gstatic.com/firebasejs/7.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.1/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyDcAruMxBUQlW9S672oSoe1dyr7l8WIxlU",
    authDomain: "scooter-277719.firebaseapp.com",
    databaseURL: "https://scooter-277719.firebaseio.com",
    projectId: "scooter-277719",
    storageBucket: "scooter-277719.appspot.com",
    messagingSenderId: "566246125587",
    appId: "1:566246125587:web:d8fd400351edef9d9acfe6",
    measurementId: "G-VFTE1Y2E90"
  });

var messaging = firebase.messaging();
messaging.usePublicVapidKey("BNixr-Wg6hhvQqycuRuXcKwHGQtedN5phbZSWGUlUzRx8LapNC-wTIpzxTp1icRdwgm3wS6TAMXg4iftTejP6Hs");
