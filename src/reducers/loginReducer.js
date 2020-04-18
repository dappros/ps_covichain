import * as types from '../constants/types';

const initialState = {
    isFetching : false,
    error : false,
    errorMessage: '',
    token:null,
    loading:false,
    initialData:null
}

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.FETCHING_COMMON_REQUEST:
            return {...state, isFetching:true, error:false}
        
        case types.FETCHING_COMMON_FAILURE:
            return {...state, isFetching:false, error:true, errorMessage:action.payload}

        case types.FETCHING_USER_LOGIN_SUCCESS:
            return {...state, isFetching: false, error:false, ...action.payload}

        case types.GET_TOKEN:
            return {...state, token: action.token}

        case types.SAVE_TOKEN:
            return {...state, token: action.token}

        case types.REMOVE_TOKEN:
            return {...state, token: action.token}
        
        case types.INITIAL_DATA:
            return {...state, initialData:action.data}
        
        case types.SAVE_INITIAL_DATA:
                return {...state, initialData:action.data}

        case types.LOADING:
            return {...state, loading: action.isLoading}

        case types.CANCEL:
            return {...state, isFetching: false, error:false};

        default:
            return state;
    }
}

export default loginReducer