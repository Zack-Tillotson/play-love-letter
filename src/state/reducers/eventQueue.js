import types from '../types';

// Array of events, events of this format:
// {
//   type: some string,
//   initiator: user who created event,
//   time: time of event, all events will be handled sorted by time,
// }
const initialState = {
  index: 0,
  events: [],
}

function eventQueue(state = initialState, action) {
  switch(action.type) {
    case types.dataReceived: {
      if(action.payload.path === 'events') {
        const {data = {}} = action.payload
        const events = Object.values(data)
        return {
          ...state,
          events,
        }
      }
    }
    break;
    case types.eventHandleStart: {
      if(state.events[state.index] === action.payload.event) {
        return {
          ...state,
          index: state.index + 1,
        }
      }
      return state;
    }
    break;
  }
  return state;
}
export default eventQueue;