import session from './sagas/session';
import game from './sagas/game';
import transitions from'./sagas/transitions'

export default [...session, ...transitions]