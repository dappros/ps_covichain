import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
    container:{
        flex:1,
        backgroundColor:'white'
    },
    emptyChatContainer:{
        flex:1,
        alignItems:'center', 
        marginTop:hp('10%')
    },
    noGroupText:{
        color:'#2775EA', fontSize:hp('2.5%'), fontFamily:'Montserrat-Medium'
    },
    descText:{
        color:'#121212', fontSize:hp('1.8%'), textAlign:'center', fontFamily:'Montserrat-Regular'
    },
    button1:{
        color:'#FFFFFF', fontSize:hp('1.8%'), fontFamily:'Montserrat-Regular'
    },
    button2:{
        color:'#2775EA', fontSize:hp('1.8%'), fontFamily:'Montserrat-Regular'
    },
    button1Container:{
        width:wp('35%'), height:hp('6%'), backgroundColor:'#2775EA', justifyContent:'center', alignItems:'center', borderRadius:3, marginRight:12
    },
    button2Container:{
        width:wp('35%'), height:hp('6%'), borderColor:'#2775EA', borderWidth:1, justifyContent:'center', alignItems:'center', borderRadius:3, marginLeft:12
    }
}