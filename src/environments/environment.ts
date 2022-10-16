// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'ba-eventplanner',
    appId: '1:427112425330:web:1ce42bb972d89559779feb',
    storageBucket: 'ba-eventplanner.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyD9_HIrkCcS7bvDkNXTeIGy7u3Udn990o8',
    authDomain: 'ba-eventplanner.firebaseapp.com',
    messagingSenderId: '427112425330',
    measurementId: 'G-H6SGG4JE5Q',
  },
  production: false,
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseConfig: {
    apiKey: 'AIzaSyD9_HIrkCcS7bvDkNXTeIGy7u3Udn990o8',
    authDomain: 'ba-eventplanner.firebaseapp.com',
    projectId: 'ba-eventplanner',
    storageBucket: 'ba-eventplanner.appspot.com',
    messagingSenderId: '427112425330',
    appId: '1:427112425330:web:1ce42bb972d89559779feb',
    measurementId: 'G-H6SGG4JE5Q',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
