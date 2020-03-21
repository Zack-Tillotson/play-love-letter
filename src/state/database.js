import * as fb from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyAEUknyYOOqgCxDs_mH3O5xQoSAhhv_qMY",
	authDomain: "playloveletter.firebaseapp.com",
	databaseURL: "https://playloveletter.firebaseio.com",
	projectId: "playloveletter",
	storageBucket: "playloveletter.appspot.com",
	messagingSenderId: "89791651563",
	appId: "1:89791651563:web:af8b3f371c342038ff28ae",
	measurementId: "G-09S6CSEF3Q"
};

fb.initializeApp(firebaseConfig);
fb.analytics();

const authPromise = fb.auth().signInAnonymously()

function* getAuth() {
	yield authPromise
	return fb.auth()
}

function* watch(gameId, dataPath, callback) {
	yield authPromise
	return fb.firestore().collection('game').doc(gameId).collection('data').doc(dataPath).onSnapshot(snapshot => callback(snapshot.data()))
}


function* get(gameId, dataPath) {
	yield authPromise
	return fb.firestore().collection('game').doc(gameId).collection('data').doc(dataPath).get()
}

function* set(gameId, dataPath, value) {
	yield authPromise
	return fb.firestore().collection('game').doc(gameId).collection('data').doc(dataPath).set(value)
}

export default {
	getAuth,
	watch,
	get,
	set,
}