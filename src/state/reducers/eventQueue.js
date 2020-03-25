import types from '../types';

// Array of events, events of this format:
// {
//   type: some string,
//   initiator: user who created event,
//   time: time of event, all events will be handled sorted by time,
// }
const initialState = []

function eventQueue(state = initialState, action) {
  switch(action.type) {
    case types.dataReceived: {
      if(action.payload.path === 'events') {
        const {data = {}} = action.payload
        const events = Object.values(data)
        return events
      }
    }
    case types.eventHandleStart: {
      if(state?.[0] === action.payload.event) {
        return state.slice(1);
      }
      return state;
    }
  }
  return state;
}
export default eventQueue;