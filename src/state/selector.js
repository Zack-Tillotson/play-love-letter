const selector = state => state;

const selectEventQueue = state => selector(state).eventQueue;

export default selector;
export {selectEventQueue}