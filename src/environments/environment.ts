// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   firebase: {
    apiKey: 'AIzaSyDjFjprtCLUmkUGPkDCGvpdRljJ26_p3sY',
    authDomain: 'angular-1ca2a.firebaseapp.com',
    databaseURL: 'https://angular-1ca2a.firebaseio.com',
    projectId: 'angular-1ca2a',
    storageBucket: 'angular-1ca2a.appspot.com',
    messagingSenderId: '686241214777'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
