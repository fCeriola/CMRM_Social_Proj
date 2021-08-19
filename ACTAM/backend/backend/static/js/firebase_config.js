// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD69dMji8qEyg_72e-JZ8pkLpcWFhboxbg",
    authDomain: "need-chords.firebaseapp.com",
    projectId: "need-chords",
    storageBucket: "need-chords.appspot.com",
    messagingSenderId: "93635873893",
    appId: "1:93635873893:web:64c4ea4c5a723fa39c8a8c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});
const mediaStorage = firebase.storage().ref("Media/");
const songsStorage = firebase.storage().ref("Songs/");