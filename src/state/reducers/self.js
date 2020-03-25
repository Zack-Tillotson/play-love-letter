import types from '../types';

const initialState = {
  name: '',
  id: '',
}

function self(state = initialState, action) {
	switch(action.type) {
		case types.dataReceived: {

			if(action.payload.path === 'meta') {
				const {meta: {id}, payload: {path, data}} = action
				const self = data.lobby.find(player => player.id === id)

				return {
					...state,
					name: self ? self.name : '',
					id,
				}
			}
		}
	}
  return state;
}
export default self;