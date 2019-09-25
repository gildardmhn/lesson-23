import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCf0SabEgDNfOR_iweBl9czbAnYOZlTLtg",
  authDomain: "crwn-db-d6bb9.firebaseapp.com",
  databaseURL: "https://crwn-db-d6bb9.firebaseio.com",
  projectId: "crwn-db-d6bb9",
  storageBucket: "crwn-db-d6bb9.appspot.com",
  messagingSenderId: "549898352499",
  appId: "1:549898352499:web:0891369bc347f66bc77706"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
