


import {Alert} from 'react-native';

var context;
export default class ConnectionAPI {
  constructor() {
    context = this;
  }


  async fetchGet(url,callback){
    fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson)
      callback(responseJson);
    })
    .catch((error)=> {
      console.log(error)
      let errorMsg = JSON.stringify(error.message);
      let title = '';
      let desc = '';
      switch (errorMsg) {
        case '"Network Error"': {
          title = 'No Internet Connection';
          desc =
            'Connect your phone to the Internet by using an available Wi-Fi or cellular network.';
          break;
        }
        default: {
          title = errorMsg;
          desc = 'Please try again later';
          break;
        }
      }

      Alert.alert(title, desc, [
        {text: 'Cancel', onPress: () => callback(null)},
        {
          text: 'Retry',
          onPress: () => context.fetchGet(url, callback),
        },
      ]);
    });
  }

  async fetchPost(url, data, token, callback) {
      fetch(url, {
        method:'post',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':token
        },
        body: JSON.stringify(data)})
        .then(response => response.json())
        .then(responseJson => {
          callback(responseJson);
        })
        .catch((error)=> {
          console.log(error.message)
          let errorMsg = JSON.stringify(error.message);
          let title = '';
          let desc = '';
          switch (errorMsg) {
            case '"Network Error"': {
              title = 'No Internet Connection';
              desc =
                'Connect your phone to the Internet by using an available Wi-Fi or cellular network.';
              break;
            }
            default: {
              title = 'Server Error';
              desc = 'Please try again later';
              break;
            }
          }

          Alert.alert(title, desc, [
            {text: 'Cancel', onPress: () => callback(null)},
            {
              text: 'Retry',
              onPress: () => context.fetchGet(url, callback),
            },
          ]);
        });
  }
}

