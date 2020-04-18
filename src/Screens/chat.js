
import React, { Component } from 'react'

import { Platform } from 'react-native'
import emojiUtils from 'emoji-utils'
import {connect} from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat'

import MessageBody from '../components/MessageBody'
import {loginUser, retrieveInitialData} from '../actions/auth';
import {fetchWalletBalance} from '../actions/wallet';

const URL = 'ws://13.52.235.156:443'

class Chat extends Component {
  state = {
    name: '',
    messages: [],
  }

  ws = new WebSocket(URL)

  async componentDidMount() {
    let tokenName = null
    let firstName = ""
    let lastName = ""
    await this.props.retrieveInitialData().then(()=>{
      let initialData = JSON.parse(this.props.loginReducer.initialData)
      walletAddress = initialData.walletAddress
      firstName = initialData.firstName
      lastName = initialData.lastName
      
      this.setState({
        name:firstName+" "+lastName
      })
    })
    
    await this.props.fetchWalletBalance(walletAddress, tokenName)
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      this.addMessage(message)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }

  addMessage(messages = []){
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  submitMessage = messageString => {
    this.ws.send(JSON.stringify(messageString))
    this.addMessage(messageString)
  }

  renderMessage(props) {
    const {
      currentMessage: { text: currText },
    } = props

    let messageTextStyle

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === 'android' ? 34 : 30,
      }
    }

    return <MessageBody {...props} messageTextStyle={messageTextStyle} />
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messageString => this.submitMessage(messageString)}
        user={{
          _id: 1,
          name:this.state.name
        }}
        renderMessage={this.renderMessage}
        renderAvatarOnTop={true}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  };
};

module.exports = connect(mapStateToProps,{
  loginUser,
  fetchWalletBalance,
  retrieveInitialData
})(Chat)