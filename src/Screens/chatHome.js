import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import {sendSearchText} from '../actions/searchAction';
import { connect } from 'react-redux';
import { ListItem, Card, Avatar } from 'react-native-elements';
import styles from './style/chatHomeStyle';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class ChatHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        data: [],
        error: null,
        searchText:null,
        isScanResult:false,
    };
    this.arrayholder = [];
  }

  async componentDidMount(){
    //  this.makeRemoteRequest();
  }

  componentDidUpdate(prevProps, prevState){
      if(this.props.searchReducer.searchText!==prevProps.searchReducer.searchText){
          this.searchFilterFunction(this.props.searchReducer.searchText)
      }
  }

  makeRemoteRequest = () => {
    const url = `https://randomuser.me/api/?&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.results;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  //search filter function
    searchFilterFunction  (text) {
        this.setState({
            value: text,
        });

        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        });
    };

    static getDerivedStateFromProps(nextProp, prevState){
        console.log(nextProp.searchReducer.searchText, 'this is next prop')
        if(nextProp.searchReducer.searchText!==prevState.searchText){
            return {
                searchText:nextProp.searchReducer.searchText
            }
        }
        else 
        return null
    }

    chatEmptyComponent = () => {
        return(
            <View style={styles.emptyChatContainer}>
                <View>
                    <Image source={require('../assets/chatEmpty.png')} />
                </View>
                <View style={{justifyContent:'center', margin:5}}>
                    <Text style={styles.noGroupText}>No groups found</Text>
                </View>
                <View style={{justifyContent:'center', margin:5}}>
                    <Text style={styles.descText}>You can start by creating new group orjoin existing group</Text>
                </View>
                <View style={{ justifyContent:'center', alignItems:'center', flexDirection:'row', marginTop:20}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('QRGenScreenComponent')} style={styles.button1Container}>
                        <Text style={styles.button1}>Create new</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('QRScreenComponent')} style={styles.button2Container}>
                        <Text style={styles.button2}>Scan QR to join</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    joinNewGroupCard = () => {
        return(
            <View>
                <Card containerStyle={{borderRadius:4}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:0.2}}>
                            <Avatar size="medium" title="BC" />
                        </View>
                        <View style={{flex:0.8}}>
                            <View>
                                <Text style={{color:'#4C5264', fontFamily:"Montserrat-SemiBold", fontSize:hp('1.9%')}}>Blockchain experts & advisors</Text>
                                <Text style={{color:'#4C5264', fontFamily:'Montserrat-Regular', fontSize:hp('1.6%')}}>We are a group of blockchain expertsto help you in technical developmentand business queries.</Text>
                            </View>
                            <View style={{flexDirection:'row', marginTop:20}}>
                                <TouchableOpacity style={{width:wp('25%'), height:hp('5%'), backgroundColor:'#2775EA', borderRadius:4, justifyContent:'center', alignItems:'center', marginRight:10}}>
                                    <Text style={{color:'#FFFFFF', fontFamily:'Montserrat-Regular', fontSize:hp('1.8%')}}>Join</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{width:wp('25%'), height:hp('5%'), borderWidth:1, borderColor:'#FF0000', borderRadius:4, justifyContent:'center', alignItems:'center', marginLeft:10}}>
                                    <Text style={{color:'#FF0000', fontFamily:'Montserrat-Regular', fontSize:hp('1.8%')}}>Decline</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Card>
            </View>
        )
    }

    groupList = () => {
        return(
            <ScrollView keyboardShouldPersistTaps="always" style={{flex:1}}>
                {this.state.data.map((item,index)=>(
                    <ListItem
                    key={index}
                    leftAvatar={{ source: { uri: item.picture.thumbnail } }}
                    title={`${item.name.first} ${item.name.last}`}
                    subtitle={item.email}
                    bottomDivider
                    />
                ))
                }
            </ScrollView>
        )
    }

    setScreenFucntion = () => {
        console.log(this.state.loading)
        if(this.state.loading){
            return(<View style={{justifyContent:'center', alignItems:'center', flex:1}}><Text>Loading...</Text></View>)
        }
        else if(!this.state.data.length){
            console.log('chat empty 1 called')
            return(this.chatEmptyComponent())
        }
        else if(this.state.isScanResult){
            console.log('join new group called')
            return(this.joinNewGroupCard())
        }
        else if(this.state.data.length){
            console.log('group list called')
            return(this.groupList())
        }
        else{
            console.log('chat empty 2 called')
            return(this.chatEmptyComponent())
        }
    }

  render() {
    return (
        <View style={styles.container}>
            {
               this.setScreenFucntion()
                
            }
        </View>
    );
  }
}

const mapStateToProps = state => {
    return {
      ...state,
    };
  };


module.exports = connect(mapStateToProps, {
    sendSearchText
})(ChatHome)
