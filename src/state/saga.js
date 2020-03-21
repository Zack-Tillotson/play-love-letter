import events from './sagas/events';
import session from'./sagas/session'
import transitions from'./sagas/transitions'

export default [...events, ...session, ...transitions]