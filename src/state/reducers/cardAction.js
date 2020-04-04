import types from '../types'

const initialState = {
	isOpen: false,
	cardValue: 0,
	selections: [],
}

function cardAction(state = initialState, action) {
	switch(action.type) {
		case types.interactionClick: {
			const {id, value} = action.payload
			switch(id) {
				case 'active-card': {
					return {
						...state,
						isOpen: true,
						cardValue: value,
					}
				}
        case 'card-selection-close': {
          return initialState
        }
				break
			}
		}
		break
	}
	return state;
}

export default cardAction