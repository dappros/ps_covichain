import {View, Text} from 'react-native';
import React, { Component, Fragment } from 'react'
import {StyleSheet, SafeAreaView, Image, TouchableHighlight, TouchableOpacity, Platform, FlatList} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
import {fetchWalletBalance, transferTokens} from '../../actions/wallet';
import {retrieveInitialData} from '../../actions/auth';
import ModalList from './tokenListModal';
import {sendSearchText} from '../../actions/searchAction';
import {SearchBar} from 'react-native-elements';
const imgURL = require('../../assets/familyguy.png')
class HeaderComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            balance:0,
            name:"",
            tokenName:"",
            tokenDetails:[],
            showModal:false,
            text:null
        }

        
    }

    async componentDidMount(){
        let walletAddress = ""
        let tokenName = null
        let firstName = ""
        let lastName = ""
        await this.props.retrieveInitialData().then(()=>{
        let initialData = JSON.parse(this.props.loginReducer.initialData)
        walletAddress = initialData.walletAddress
        firstName = initialData.firstName
        lastName = initialData.lastName
        console.log(lastName,'this is lastname')
        let name = firstName+" "+lastName
        this.setState({
            name
        })
        })

        this.fetchWalletBalanceFunction(walletAddress,tokenName)
        
    }

    static getDerivedStateFromProps(nextProp, prevState){
       console.log(nextProp,'from get derived')
       return null
    }

    
    //Fetch balance of desired wallet
    async fetchWalletBalanceFunction(walletAddress,tokenName){
        await this.props.fetchWalletBalance(walletAddress, tokenName)
        setTimeout(() => {
            let balance = 0
            let tokenName = ""
            let tokenDetails = []
            if(this.props.walletReducer.balance!==undefined){
                balance = Math.round(this.props.walletReducer.balance[0].balance*100)/100
                tokenName = this.props.walletReducer.balance[0].tokenName
                tokenDetails = this.props.walletReducer.balance
            }
            // tokenDetails = this.props.walletReducer.balance?this.props.walletReducer.balance:tokenDetails
            this.setState({
                balance,
                tokenName,
                tokenDetails
            })
        }, 4000);
        
    }

    //close the modal
    closeModal = (tokenName,balance)=>{
        let roundBalance = Math.round(balance*100)/100
        this.setState({
            showModal:false,
            tokenName,
            balance:roundBalance
        })
    }

    //send or transfer token
    tokenTransferFunc =()=>{
        let bodyData = {}
        if(this.state.tokenName=="Ether D"){
            bodyData = {"toWallet":"0xE9C8687550f9FeC26881FC77f5390fE61cB4FaF3", amount:1}
        }else{
            bodyData = {"tokenId":"ERC20", "tokenName":this.state.tokenName,"toWallet":"0xE9C8687550f9FeC26881FC77f5390fE61cB4FaF3","amount":1}
        }
        
        let token = this.props.loginReducer.token

        this.props.transferTokens(bodyData, token)
    }

    updateSearch(text){
        this.setState({text})
        this.props.sendSearchText(text)
    }


    //Header for chatHome Screen
    chatHomeHeader(){
        return(
            <View style={{backgroundColor: '#2775EA',height:hp('20%'), padding:10}}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#2775EA', '#2775EA', '#2775EA']} style={styles.linearGradient}>
                        <SafeAreaView style={styles.container}>
                            <View style={{flex:1, flexDirection:'row', alignItems:'center', height:hp('10%')}}>
                                <TouchableOpacity style={{ flex:0.1, justifyContent:'center', alignItems:'center'}} onPress={()=>this.props.navigation.openDrawer()}>
                                    <Icon name="bars" color="#ffff" size={25}/>
                                </TouchableOpacity>
                                <View style={{ flex:0.9, justifyContent: 'center', alignItems:'flex-start'}}>
                                    <Text style={{fontSize:hp('2.3%'), color:"#ffff", fontFamily:'Montserrat-Medium'}}>Dappros Messenger</Text>
                                </View>
                            </View>
                        </SafeAreaView>
                        {/* <View style={{height:hp('7%')}}>
                        <SearchBar
                        placeholder="Type Here..."
                        searchIcon={<Icon name="search" size={20} color="#414046"/>}
                        containerStyle={{backgroundColor:"white", paddingBottom:0, paddingTop:0, padding:0, borderWidth:0, borderTopColor:'transparent', borderBottomColor:'transparent'}}
                        inputContainerStyle={{marginLeft:0,marginRight:0, height:hp('6%'), backgroundColor:'#F6F7FB'}}
                        inputStyle={{color:'#414046'}}
                        lightTheme  
                        round   
                        onChangeText={text => this.updateSearch(text)}
                        value={this.state.text}
                        autoCorrect={false}             
                        />
                        </View> */}
                </LinearGradient>
            </View>
        )
    }

    //Header for main chat screen
    chatHeader=()=>{
        return(
            <View style={{backgroundColor: 'white',}}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#D2DBFF', '#D2E7FF', '#D0EFFF']} style={styles.linearGradient}>
                    <SafeAreaView style={styles.container}>
                        
                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flexDirection:'row', justifyContent:'flex-start', flex:0.5}}>
                            <View style={{justifyContent:'center', paddingLeft:Platform.OS=='ios'?wp('6%'):wp('3%')}}>
                                <Image
                                source={imgURL}
                                style={{
                                    height:wp('12%'),
                                    width:wp('12%'),
                                    borderRadius:6
                                }}
                                />
                            </View>
                            <View style={{justifyContent:'center', paddingLeft:wp('4%'), flex:1}}>
                                <Text style={{color:'#001', fontWeight:'bold'}}>{this.state.name}</Text>
                            </View>
                            </View>
                            <TouchableHighlight onPress={()=>this.setState({showModal:true})} style={{flex:0.5, justifyContent:'center'}} >
                            <View style={{flex:1, paddingRight:wp('6%'),justifyContent:'center', alignItems:'flex-end'}}>
                                <View style={{ flexDirection:'row', flex:1, justifyContent:'flex-end', alignItems:'center',}}>
                                    <View>
                                        <Icon name="diamond" size={25} color="#6582FF"/>
                                    </View>
                                    <View style={{paddingLeft:wp('3%')}}>
                                        <Text>{this.state.balance}</Text>
                                    </View>
                                </View>
                                <Text>{this.state.tokenName}</Text>
                            </View>
                            </TouchableHighlight>
                        </View>
                        
                    </SafeAreaView>
                </LinearGradient>
    
            {/*group header */}  
                
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#5275FF', '#479EFF', '#37BEFF']} style={styles.linearGradient}>
                    <View style={{width:wp('100%'), height:hp('9%')}}>
                        <TouchableOpacity onPress={()=>this.tokenTransferFunc()} style={{justifyContent:'center', alignItems:'center', flex:1}}>
                            <Text style={{color:'white'}}>GK Accounting & Finance pros</Text>
    
                            <View style={{flexDirection:'row'}}>
                                <Icon name="group" size={20} color='white'/>
                                <Text style={{color:'white'}}>102</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <ModalList 
                show={this.state.showModal}
                data={this.state.tokenDetails}
                closeModal={this.closeModal}/>
            </View>
        )
    }
    
    render(){
        let screenName = this.props.screenName;

        switch(screenName){
            case "Chat":
               return (<View>{this.chatHeader()}</View>)
            
            case "ChatHome":
                return (this.chatHomeHeader())

            default:
                return this.chatHomeHeader()
        }
    }
}

const styles = StyleSheet.create({
    container:{
        width:wp('100%'),
        height:Platform.OS=='ios'? hp('14%'):hp('10%'),
        flexDirection:'row',
    },
})

const mapStateToProps = state => {
    return {
      ...state,
    };
};

module.exports = connect(mapStateToProps,{
    fetchWalletBalance,
    retrieveInitialData,
    transferTokens,
    sendSearchText
})(HeaderComponent)
