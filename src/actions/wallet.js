import * as types from '../constants/types';
import * as connectionURL from '../config/url'
import fetchFunction from '../config/api'

const hitAPI = new fetchFunction

export const fetchingCommonRequest = () => ({
    type: types.FETCHING_COMMON_REQUEST,
});

export const fetchingCommonFailure = errorMsg => ({
    type: types.FETCHING_COMMON_FAILURE,
    payload: errorMsg,
});

export const fetchTokenEtherBalance = data => ({
    type: types.FETCHING_TOKEN_ETHER_BALANCE_SUCCESS,
    payload: data,
});

export const transferTokensSuccess = () => ({
    type:types.TOKEN_TRANSFER_SUCCESS
})

export const cancel = () => ({
    type: types.CANCEL,
});


const getTokenBalanceURL=(walletAddress,tokenName)=>{
    let modifiedURL = connectionURL.tokenEtherBalanceURL +walletAddress;
    console.log(modifiedURL);
    return modifiedURL
}

export const fetchWalletBalance = (walletAddress, tokenName) => {
    let url = getTokenBalanceURL(walletAddress, tokenName)
    return dispatch => {
        dispatch(fetchingCommonRequest());
        try{
            hitAPI.fetchGet(url, data =>{
                if(data.success === true){
                    dispatch(fetchTokenEtherBalance(data));
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

export const transferTokens = (bodyData,token) => {
    let url = ""
    if(bodyData.tokenName){
        url = connectionURL.tokenTransferURL
    }else{
        url = connectionURL.etherTransferURL
    }
    return dispatch=> {
        dispatch(fetchingCommonRequest());
        try{
            hitAPI.fetchPost(url, bodyData, token, data=>{
                if(data.msg==="Ether D transfer successful"){
                    console.log(data)
                    dispatch(transferTokensSuccess())
                }else{
                    console.log(data)
                    dispatch(fetchingCommonFailure(data.msg))
                }
            })
        }catch(error){
            dispatch(fetchingCommonFailure(error))
        }
    }
}