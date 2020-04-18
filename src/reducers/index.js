import { combineReducers } from 'redux';
import loginReducer from  './loginReducer';
import walletReducer from './walletReducer';
import searchReducer from './searchReducer';

module.exports = combineReducers({
    loginReducer,
    walletReducer,
    searchReducer
})