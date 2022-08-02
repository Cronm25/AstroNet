import React from "react";
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from "./Details";
import Allproducts from "../Components/Allproducts";
import Home from "../Components/Home";
import Categories from "../Screens/Details";
import Login from "../Components/Login";
import UserCreate from "../Components/UserCreate";
import Cart from "../Components/CartLobby";
import OrderDetail from "../Components/OrderDetail";
import Checkout from "../Components/config/Checkout";
import ProductModify from "../Components/AdminPanel/ProductModify";

const Stack = createNativeStackNavigator();

const UserHome = () => {
    return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen
                    name='Home'
                    component={Home}
                />
                <Stack.Screen
                    name='Allproducts'
                    component={Allproducts}
                />
                <Stack.Screen
                    name='Categories'
                    component={Categories}
                />
                <Stack.Screen
                    name='Details'
                    component={Details}
                />
                <Stack.Screen
                    name='Login'
                    component={Login}
                />
                <Stack.Screen
                    name='UserCreate'
                    component={UserCreate}
                />
                <Stack.Screen 
                    name='Cart' 
                    component={Cart} 
                />
                <Stack.Screen 
                    name='OrderDetail' 
                    component={OrderDetail} 
                />
                <Stack.Screen 
                    name='Checkout' 
                    component={Checkout} 
                />
                <Stack.Screen 
                    name='ProductModify' 
                    component={ProductModify} 
                />
            </Stack.Navigator>
    )
}


export default UserHome
                