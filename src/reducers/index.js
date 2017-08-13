import { combineReducers } from 'redux';
import BlackjackReducer from './blackjack'
import ErrorReducer from './error'

const rootReducer = combineReducers({
  blackJack: BlackjackReducer,
  error: ErrorReducer,
});

export default rootReducer;
