import types from '../types';

const initialState = {
  name: '',
  uid: '',
}

function self(state = initialState, action) {
	switch(action.type) {
		case types.dataReceived: {

			if(action.payload.path === 'names') {
				const {meta: {uid}, payload: {path, data}} = action
				return {
					...state,
					name: data[uid] || '',
					uid,
				}
			}
		}
	}
  return state;
}
export default self;