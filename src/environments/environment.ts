// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // HOST_APIV1: 'https://www.scooter-app.team/appback/api/v1',
  HOST_APIV1: 'https://www.scooterdev.tech/appback/api/v1',
  // HOST_APIV1: 'http://127.0.0.1:8000/api/v1',
  // HOST_APIV1: 'http://192.168.0.6:8000/api/v1',
  // WS_SOCKET: 'ws://192.168.0.6',
  WS_SOCKET: 'wss://www.scooterdev.tech/ws',
  // WS_SOCKET: 'wss://www.scooter-app.team/ws',
  firebase: {
    apiKey: 'AIzaSyDcAruMxBUQlW9S672oSoe1dyr7l8WIxlU',
    authDomain: 'scooter-277719.firebaseapp.com',
    databaseURL: 'https://scooter-277719.firebaseio.com',
    projectId: 'scooter-277719',
    storageBucket: 'scooter-277719.appspot.com',
    messagingSenderId: '566246125587',
    appId: '1:566246125587:web:d8fd400351edef9d9acfe6',
    measurementId: 'G-VFTE1Y2E90'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
