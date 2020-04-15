import types from '../types'

const initialState = {
	isOpen: false, // See full sized card in detail	
	isTargetting: false, // Dragging to target player
  isTargettingPlayers: false, // Is dragged over player box
  targetPlayer: '', // ID of closest player during drag
	cardValue: 0,
	sourceId: '',
	currentPosition: null,
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

		case types.transitionCardTarget: {
			const {eventType, cardValue, eleId, position, targetPlayer, isTargettingPlayers} = action.payload

      switch(eventType) {
        case 'active-card-drag': {
          return {
            ...state,
            isOpen: false,
            isTargetting: true,
            cardValue,
            sourceId: eleId,
            currentPosition: position,
            targetPlayer,
            isTargettingPlayers,
          }
        }
        case 'active-card-drag-end': {
          return initialState
        }
      }
		}
	}
	return state;
}

export default cardAction