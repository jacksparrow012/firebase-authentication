




// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAbtUtQu-7mhy2wHnNQ7DWwJFybywDIjxY",
    authDomain: "net-ninja-guidez-game.firebaseapp.com",
    projectId: "net-ninja-guidez-game",
    storageBucket: "net-ninja-guidez-game.appspot.com",
    messagingSenderId: "775482219810",
    appId: "1:775482219810:web:100baf386a8c992d9a197b",
    measurementId: "G-BZ24KCDV7T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

