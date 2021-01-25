import types from '../types'

const initialState = {
	isOpen: false, // See full sized card in detail	
  isHistoryDetailOpen: false, // See a history play in detail
  isRank1SelectOpen: false, // Select a rank of cards 2-8 to guess target as
	isTargetting: false, // Dragging to target player
  isTargettingPlayers: false, // Is dragged over player box
  targetPlayer: '', // ID of closest player during drag
	cardValue: 0, // The value of the card being played
  targetCardValue: 0, // The value of the card being guessed (used by rank 1)
	sourceId: '', // DOM element ID taking action
	currentPosition: null,
  historyDetail: null,
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
            isHistoryDetailOpen: false,
						cardValue: value,
					}
				}
        case 'active-history-detail': {
          return {
            ...state,
            isOpen: false,
            isHistoryDetailOpen: true,
            historyDetail: action.payload.value.data,
          }
        }
        case 'card-selection-close': {
          return initialState
        }
        case 'rank-1-select': {
          return {
            ...state,
            isOpen: false,
            isHistoryDetailOpen: false,
            isRank1SelectOpen: true,
          }
        }
        case 'rank-1-select-card-value': {
          return {
            ...state,
            targetCardValue: action.payload.value,
          }
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
        case 'active-card-drag-reset': {
          return initialState
        }
      }
		}
	}
	return state;
}

export default cardAction