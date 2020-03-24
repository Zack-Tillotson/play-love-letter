import types from '../types';

const initialState = {
  name: '',
  uid: '',
}

function self(state = initialState, action) {
	switch(action.type) {
		case types.dataReceived: {

			if(action.payload.path === 'meta') {
				const {meta: {uid}, payload: {path, data}} = action
				const self = data.lobby.find(player => player.uid === uid)

				return {
					...state,
					name: self ? self.name : '',
					uid,
				}
			}
		}
	}
  return state;
}
export default self;