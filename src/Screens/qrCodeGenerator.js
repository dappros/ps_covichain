import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import RNFS from "react-native-fs"

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      // Default Value of the TextInput
      valueForQRCode: '',
      // Default value for the QR Code
    };
  }
  getTextInputValue = () => {
    // Function to get the value from input
    // and Setting the value to the QRCode
    this.setState({ valueForQRCode: this.state.inputValue });
  };
  shareQR = () => {
    this.svg.toDataURL(this.callback);
  }
  callback(dataURL) {
    let imgURL = `data:image/png;base64,${dataURL}`
    Share.open({url:imgURL});
    console.log({dataURL});
  }

  saveQrToDisk() {
    this.svg.toDataURL((data) => {
      RNFS.writeFile(RNFS.CachesDirectoryPath+"/some-name.png", data, 'base64')
        .then((success) => {
          // return CameraRoll.saveToCameraRoll(RNFS.CachesDirectoryPath+"/some-name.png", 'photo')
          Share.open(RNFS.CachesDirectoryPath+"/some-name.png")
        })
        .then(() => {
          this.setState({ busy: false, imageSaved: true  })
          ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
        })
    })
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <QRCode
          getRef={(c) => (this.svg = c)}
          //QR code value
          value={this.state.valueForQRCode ? this.state.valueForQRCode : 'NA'}
          //size of QR Code
          size={250}
          //Color of the QR Code (Optional)
          color="black"
          //Background Color of the QR Code (Optional)
          backgroundColor="white"
          //Logo of in the center of QR Code (Optional)
          logo={require('../assets/Dappros-platform-logo.png')}
          //Center Logo size  (Optional)
          logoSize={30}
          //Center Logo margin (Optional)
          logoMargin={2}
          //Center Logo radius (Optional)
          logoBorderRadius={15}
          //Center Logo background (Optional)
          logoBackgroundColor="white"
        />
        <TextInput
          // Input to get the value to set on QRCode
          style={styles.TextInputStyle}
          onChangeText={text => this.setState({ inputValue: text })}
          underlineColorAndroid="transparent"
          placeholder="Enter text to Generate QR Code"
        />
        <TouchableOpacity
          onPress={this.getTextInputValue}
          activeOpacity={0.7}
          style={styles.button}>
          <Text style={styles.TextStyle}> Generate QR Code </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.shareQR}
          activeOpacity={0.7}
          style={styles.button}>
          <Text style={styles.TextStyle}> Share </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default App;
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent:'center',
    paddingTop: 40,
  },
  TextInputStyle: {
    width: '100%',
    height: 40,
    marginTop: 20,
    borderWidth: 1,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    paddingTop: 8,
    marginTop: 10,
    paddingBottom: 8,
    backgroundColor: '#479EFF',
    marginBottom: 20,
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});