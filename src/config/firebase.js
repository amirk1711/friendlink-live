import firebase from 'firebase/app';
import 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_FRIENDLINK_IMAGE_API_KEY,
    authDomain: `${process.env.REACT_APP_FIREBASE_FRIENDLINK_IMAGE_PROJECT_ID}.firebaseapp.com`,
    projectId: `${process.env.REACT_APP_FIREBASE_FRIENDLINK_IMAGE_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_FIREBASE_FRIENDLINK_IMAGE_PROJECT_ID}.appspot.com`,
    messagingSenderId: process.env.REACT_APP_FIREBASE_FRIENDLINK_IMAGE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_FRIENDLINK_IMAGE_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default};
