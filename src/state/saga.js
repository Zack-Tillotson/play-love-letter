import events from './sagas/events';
import session from'./sagas/session'
import transitions from'./sagas/transitions'
import game from './sagas/game';

export default [...events, game.monitorCardPlays, ...session, ...transitions]