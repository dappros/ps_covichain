import React, { Component } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

function Item({ title, balance, close }) {
    let roundBalance = Math.round(balance*100)/100
    return (
        <TouchableOpacity onPress={()=>close(title,balance)}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#5275FF', '#479EFF', '#37BEFF']} style={styles.row}>
        <View>
          <Text style={{color:"white"}}>{title}</Text>
        </View>
        <View style={{justifyContent:'flex-end', flex:1, alignItems:'center', flexDirection:'row'}}>
            <Text style={{color:"white"}}>{roundBalance}</Text>
            <Icon color="white" 
                size={18}
                name="diamond"
            />
        </View>
      </LinearGradient>
      </TouchableOpacity>
    );
  }
  

class TokenListModal extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  componentDidMount(){
      
      let modalVisible = this.props.show
      this.setModalVisible(modalVisible)
  }


  static getDerivedStateFromProps(nextProp, prevState){
    if(nextProp.show!==prevState.modalVisible)
    {
        return{modalVisible:nextProp.show}
    }
    else 
        return null
  }

  render() {
    const { modalVisible } = this.state;
    return (
            <View>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Select a token</Text>
                            <FlatList
                            style={{marginTop: 14,
                                alignSelf: "stretch",}}
                            data={this.props.data}
                            renderItem={({ item }) => <Item title={item.tokenName} balance={item.balance} close={this.props.closeModal} />}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  centeredView: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    height:hp('60%'),
    width:wp('70%'),
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 10,
  },
  row: {
    elevation: 1,
    borderRadius: 2,
    backgroundColor: "red",
    flex: 1,
    flexDirection: 'row',  // main axis
    justifyContent: 'flex-start', // main axis
    alignItems: 'center', // cross axis
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 18,
    paddingRight: 16,
    marginLeft: 14,
    marginRight: 14,
    marginTop: 0,
    marginBottom: 6,
  },
});

export default TokenListModal;