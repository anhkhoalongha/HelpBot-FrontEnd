// import 'firebase/messaging';
// import firebase from 'firebase/compat/app';
// import localforage from 'localforage';

// const firebaseCloudMessaging = {
//   init: async () => {
//     if (!firebase?.apps?.length) {
//       // Initialize the Firebase app with the credentials
//       firebase?.initializeApp({
//         apiKey: process.env.NEXT_PUBLIC_API_KEY_FIREBASE,
//         authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//         projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//         storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//         messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDERID,
//         appId: process.env.NEXT_PUBLIC_APP_ID,
//       });

//       try {
//         const messaging = firebase.messaging();
//         const tokenInLocalForage = await localforage.getItem('fcm_token');

//         // Return the token if it is alredy in our local storage
//         if (tokenInLocalForage !== null) {
//           return tokenInLocalForage;
//         }

//         // Request the push notification permission from browser
//         const status = await Notification.requestPermission();
//         if (status && status === 'granted') {
//           // Get new token from Firebase
//           const fcm_token = await messaging.getToken({
//             vapidKey:
//               'BNHETRd_h07CmUE338fMIiLVU4rrkw_aq8gNe58z7nnQIAUmnQzvAB3dwZc-ne42QWDCF4kP272yy1ehoQUqZ20',
//           });

//           // Set token in our local storage
//           if (fcm_token) {
//             localforage.setItem('fcm_token', fcm_token);
//             return fcm_token;
//           }
//         }
//       } catch (error) {
//         console.error(error);
//         return null;
//       }
//     }
//   },
// };
// export { firebaseCloudMessaging };
