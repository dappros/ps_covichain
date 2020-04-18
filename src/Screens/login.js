
import React, { Component } from "react";

import styles from "./style/loginStyle";
import {Keyboard, 
  Text, View, 
  TextInput, 
  ActivityIndicator, 
  TouchableWithoutFeedback, 
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  Button} from 'react-native';
import {loginUser} from '../actions/auth';
import {connect} from 'react-redux';
import authConfig from '../config/authConfig';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  User
} from '@react-native-community/google-signin';

class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            username:"",
            password:"",
            userInfo:null,
            error:null
        }
    }

    async componentDidMount() {
      this._configureGoogleSignIn();
      await this._getCurrentUser();
    }

    //call befor anything
    _configureGoogleSignIn() {
      GoogleSignin.configure({
        webClientId: authConfig.webClientId,
        offlineAccess: false,
      });
    }

    //returns userinfo if current user exists
    async _getCurrentUser() {
      try {
        const userInfo = await GoogleSignin.signInSilently();
        this.setState({ userInfo, error: null });
      } catch (error) {
        const errorMessage =
          error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;
        this.setState({
          error: new Error(errorMessage),
        });
      }
    }


    onLoginPress=async()=>{
        let {navigation} = this.props;
        let username = this.state.username
        let password = this.state.password
        if(username==""||password==""){alert("Please fill all the fields")}
        else
       await this.props.loginUser(username, password, navigation)
        
    }

    renderUserInfo(userInfo){
      console.log(userInfo)
      return(
        <View style={{flex:1, justifyContent:'center',alignItems:'center',backgroundColor: '#F5FCFF'}}>
          <Image source={{uri:userInfo.user.photo}} style={{height:50,width:50}} />
          {/* <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Welcome</Text> */}
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>{userInfo.user.name}</Text>
          {/* <Text>Your user info: {JSON.stringify(userInfo.user)}</Text> */}

        <Button onPress={this._signOut} title="Log out" />
        {this.renderError()}
        </View>
      )
    }

    _signIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        this.setState({ userInfo, error: null });
      } catch (error) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // sign in was cancelled
            Alert.alert('cancelled');
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            Alert.alert('in progress');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // android only
            Alert.alert('play services not available or outdated');
            break;
          default:
            Alert.alert('Something went wrong', error.toString());
            this.setState({
              error,
            });
        }
      }
    };

    _signOut = async () => {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
  
        this.setState({ userInfo: null, error: null });
      } catch (error) {
        this.setState({
          error,
        });
      }
    };
  

    renderError() {
      const { error } = this.state;
      if (!error) {
        return null;
      }
      const text = `${error.toString()} ${error.code ? error.code : ''}`;
      return <Text>{text}</Text>;
    }

    renderSignInButton(){
      let {isFetching, error, errorMessage} = this.props.loginReducer
      return(
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>

              <View style={{flex:0.5, justifyContent:'center', alignItems:'center'}}>
                  <Image
                      source={require('../assets/Dappros-platform-logo.png')}
                      style={{width: 100, height: 100}}
                  />
              </View>
              
              <TextInput onChangeText={(username)=>{this.setState({username})}} textContentType='emailAddress' placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
              <TextInput onChangeText={(password)=>{this.setState({password})}} placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}/>

              <TouchableOpacity
              style={styles.loginButton}
              onPress={this.onLoginPress}
              >
                <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </View>
              </TouchableOpacity>
              <View style={{justifyContent: 'center', padding:10}}>
                {isFetching ? (
                  <ActivityIndicator
                    size="small"
                    color={'black'}
                    animating={isFetching}
                  />
                ) : null}
              </View>
              <View style={{alignItems: 'center', padding:10}}>
                {error ? (
                  <Text style={{color:'red'}}>{errorMessage}</Text>
                ) : null}
              </View>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                <GoogleSigninButton
                  size={GoogleSigninButton.Size.Standard}
                  color={GoogleSigninButton.Color.Auto}
                  onPress={this._signIn}
                />
                {this.renderError()}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      )
    }

    renderIsSignedIn() {
    return (
      <Button
        onPress={async () => {
          const isSignedIn = await GoogleSignin.isSignedIn();
          Alert.alert(String(isSignedIn));
        }}
        title="is user signed in?"
      />
    );
  }

  renderGetCurrentUser() {
    return (
      <Button
        onPress={async () => {
          const userInfo = await GoogleSignin.getCurrentUser();
          Alert.alert('current user', userInfo ? JSON.stringify(userInfo.user) : 'null');
        }}
        title="get current user"
      />
    );
  }

  renderGetTokens() {
    return (
      <Button
        onPress={async () => {
          const isSignedIn = await GoogleSignin.getTokens();
          Alert.alert('tokens', JSON.stringify(isSignedIn));
        }}
        title="get tokens"
      />
    );
  }

  render() {
      

      const { userInfo } = this.state;
      const body = userInfo ? this.renderUserInfo(userInfo) : this.renderSignInButton();
    return (
      <SafeAreaView style={{flex:1}}>
        {/* {this.renderIsSignedIn()}
        {this.renderGetCurrentUser()}
        {this.renderGetTokens()} */}
        {body}
      </SafeAreaView>
    );
  }
}


const mapStateToProps = state => {
  return {
    ...state,
  };
};

module.exports = connect(mapStateToProps,{
  loginUser
})(Login)