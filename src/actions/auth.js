import * as types from '../constants/types';
import * as connectionURL from '../config/url'
import fetchFunction from '../config/api'
import AsyncStorage from '@react-native-community/async-storage';

const hitAPI = new fetchFunction

export const fetchingCommonRequest = () => ({
    type: types.FETCHING_COMMON_REQUEST,
});

export const fetchingCommonFailure = errorMsg => ({
    type: types.FETCHING_COMMON_FAILURE,
    payload: errorMsg,
});

export const loginUserSuccess = data => ({
    type: types.FETCHING_USER_LOGIN_SUCCESS,
    payload: data,
});


export const getToken = (token) => ({
    type: types.GET_TOKEN,
    token,
});

export const saveToken = token => ({
    type: types.SAVE_TOKEN,
    token
});

export const removeToken = () => ({
    type: types.REMOVE_TOKEN,
});

export const getInitialData = (data) => ({
    type:types.INITIAL_DATA,
    data
})

export const saveInitialDataAction = (data) => ({
    type:types.SAVE_INITIAL_DATA,
    data
})

export const cancel = () => ({
type: types.CANCEL,
});

export const loading = bool => ({
    type: types.LOADING,
    isLoading: bool,
});

// export const removeUserToken = () => dispatch =>
// AsyncStorage.removeItem('token')
//     .then((data) => {
//         dispatch(loading(false));
//         dispatch(removeToken(data));
//     })
//     .catch((err) => {
//         dispatch(loading(false));
//         dispatch(error(err.message || 'ERROR'));
//     })

export const getUserToken = () => 
        dispatch =>
            AsyncStorage.getItem('token').
            then((data)=>{
                console.log(data)
                dispatch(loading(false))
                dispatch(getToken(data))
            })

export const retrieveInitialData = () =>
    dispatch =>
        AsyncStorage.getItem('initialLoginData').
        then((data)=>{
            dispatch(loading(false))
            dispatch(getInitialData(data))
        })

export const saveInitialData = data =>
        AsyncStorage.setItem('initialLoginData', JSON.stringify(data))

export const saveUserToken = token => 
    AsyncStorage.setItem('token', token)



export const loginUser = (username, password, navigation) => {
    let bodyData = {"username":username, "password":password}
    return dispatch => {
        dispatch(fetchingCommonRequest());
        try{
            hitAPI.fetchPost(connectionURL.loginURL, bodyData, null, data =>{
                if(data.success === true){
                    saveUserToken(data.token).
                    then((data) =>{
                        dispatch(loading(false))
                        dispatch(saveToken(data))
                    }).catch((error)=>{
                        console.log(error)
                    })

                    let {firstName,lastName} = data.user
                    let {walletAddress} = data.user.defaultWallet
                    saveInitialData({firstName,lastName,walletAddress}).
                    then((data)=>{
                        console.log('save initial data called')
                        dispatch(saveInitialDataAction(data))
                    }).then(dispatch(loginUserSuccess(data)))
                
                    navigation.navigate('ChatHomeComponent')
                }else{
                    dispatch(fetchingCommonFailure(data.msg));
                }
            });
        } catch (error){
            console.log(error);
            dispatch(fetchingCommonFailure('Something went wrong'));
        }
    }
}