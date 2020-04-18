import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, SafeAreaView } from 'react-native';

//routes
import HeaderComponent from './components/shared/customHeader';
import DrawerComponent from './components/drawerComponent';
import Login from './Screens/login'
import Chat from './Screens/chat'
import AuthLoad from './Screens/AuthLoadingScreen';
import QRScreen from './Screens/qrcodescreen';
import QRGenScreen from './Screens/qrCodeGenerator';
import ChatHome from "./Screens/chatHome";

const Stack = createStackNavigator();

function drawerComponent(){
    return(
        <DrawerComponent/>
    )
}

function ChatHomeComponent({navigation}) {
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="ChatHome" 
            component={ChatHome}
            options={{header:()=><HeaderComponent navigation={navigation} screenName="ChatHome"/> }}
            />
        </Stack.Navigator>
    )  
}

function AuthLoadComponent(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            options={{headerShown:false}}
            name="AuthLoad"
            component={AuthLoad}
            />
        </Stack.Navigator>
    )
}

function QRGenScreenComponent(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            options={{headerShown:false}}
            name="QRGenScreen"
            component={QRGenScreen}
            />
        </Stack.Navigator>
    )
}

function QRScreenComponent(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            options={{headerShown:false}}
            name="QRScreen"
            component={QRScreen}
            />
        </Stack.Navigator>
    )
}

function LoginComponent(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            options={{headerShown:false}}
            name="Login"
            component={Login}
            
            />
        </Stack.Navigator>
    )
}

function ChatComponent({navigation}){
    return(
        <Stack.Navigator>
            <Stack.Screen
            options={{header:()=><HeaderComponent navigation={navigation} screenName="Chat"/> , headerLeft:null}}
            name="Chat"
            component={Chat}
            />
        </Stack.Navigator>
    )
}

class routes extends Component {
    constructor(props) {
        super(props);
        obj = this;
    }

    render() {
        
        const Drawer = createDrawerNavigator();
        return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={()=>drawerComponent()}>
                <Stack.Screen
                name="AuthLoadComponent"
                component={AuthLoadComponent}
                />
                <Stack.Screen
                name="QRGenScreenComponent"
                component={QRGenScreenComponent}
                />
                <Drawer.Screen
                name="ChatHomeComponent"
                component={ChatHomeComponent}
                />
                <Drawer.Screen
                name="QRScreenComponent"
                component={QRScreenComponent}
                />
                <Drawer.Screen
                name="LoginComponent"
                component={LoginComponent}
                />
                <Drawer.Screen
                name="ChatComponent" 
                options={{swipeEnabled:true}}
                component={ChatComponent}
                />
            </Drawer.Navigator>
        </NavigationContainer>
        );
    }
}
module.exports = routes;