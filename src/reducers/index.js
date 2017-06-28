import { combineReducers } from 'redux';
import BlackjackReducer from './blackjack'

const rootReducer = combineReducers({
  blackJack: BlackjackReducer
});

export default rootReducer;
