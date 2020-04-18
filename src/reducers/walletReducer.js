import * as types from '../constants/types';

const initialState = {
    isFetching : false,
    error : false,
    errorMessage: '',  
}

const walletReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.FETCHING_TOKEN_ETHER_BALANCE_SUCCESS:
            return {...state, isFetching: false, error:false, ...action.payload}

        case types.TOKEN_TRANSFER_SUCCESS:
            return {...state, isFetching:false, error:false}
        
        default:
            return state;
    }
}

export default walletReducer