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

function* watch(dataPath, callback) {
	yield authPromise
	return fb.firestore().collection('game').doc(dataPath).onSnapshot(snapshot => callback(snapshot.data()))
}


function* get(dataPath) {
	yield authPromise
	const promise = yield fb.firestore().collection('game').doc(dataPath).get()
	return promise.data()
}

function* set(dataPath, value) {
	yield authPromise
	const data = (yield get(dataPath)) || {}
	const result = yield fb.firestore().collection('game').doc(dataPath).set({...data, ...value})
	return result
}

export default {
	getAuth,
	watch,
	get,
	set,
}