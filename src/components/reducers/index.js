import { combineReducers } from 'redux';
import lastTen from './mathListTen';



const rootReducer = combineReducers({
lastTen, // this reducer holds the last ten math problems 
});

export default rootReducer;