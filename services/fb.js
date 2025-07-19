import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import Constants from 'expo-constants'

const fireabase = {
    apiKey: Constants.expoConfig.crede_firebase.apiKey,
    authDomain: Constants.expoConfig.crede_firebase.authDomain,
    databaseURL: Constants.expoConfig.crede_firebase.databaseURL,
    projectId: Constants.expoConfig.crede_firebase.projectId,
    storageBucket: Constants.expoConfig.crede_firebase.storageBucket,
    messagingSenderId: Constants.expoConfig.crede_firebase.messagingSenderId,
    appId: Constants.expoConfig.crede_firebase.appId,
    measurementId: Constants.expoConfig.crede_firebase.measurementId,
}
initializeApp(fireabase);

export const database = getFirestore();