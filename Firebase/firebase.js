import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyD-nQJ8W7DTucXZ_O83-R6H3br4UUUYQyw",
    authDomain: "tech-aliens.firebaseapp.com",
    projectId: "tech-aliens",
    storageBucket: "tech-aliens.appspot.com",
    messagingSenderId: "988305339733",
    appId: "1:988305339733:web:c6db008ac0cf073cdeebdc"
}

if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

export {firebase}