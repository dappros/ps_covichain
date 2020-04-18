import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';

export default class DrawerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
    <SafeAreaView style={{justifyContent: 'center', alignItems: 'center', flex:1}}>
      <Avatar
      size="xlarge"
      rounded
      source={{
        uri:
          'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      }}
      />
      <Text>
          drawer Content
      </Text>
      <View style={{
    position: 'relative',
    top: 11,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    width:'100%'
  }}/>
    </SafeAreaView>
    );
  }
}
