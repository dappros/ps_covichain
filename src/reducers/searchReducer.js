import * as types from '../constants/types';

const initalState={
    searchText:"hol"
}
const searchReducer = (state = initalState, action) => {
    console.log(action,'in search reducer')
    switch(action.type){
        case types.SEND_SEARCH_TEXT:
            return{...state, searchText:action.payload}

        default:
            return state;
    }
}

export default searchReducer