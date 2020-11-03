import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import LoginPage from '../components/Login';
import HomePage from '../components/Home';
import OpenOrdersPage from '../components/OpenOrders';
import MyOrdersPage from '../components/MyOrders';
import { AuthContext, AuthContextProvider } from '../context/AuthContext';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const SignInNavigation = () => (
    < Stack.Navigator >
        < Stack.Screen
            name='Sign in'
            component={LoginPage}
            options={{ header: (() => { }) }} />
    </Stack.Navigator>
)

const TabNavigation = () => (
    <Tab.Navigator
        tabBarOptions={{
            activeTintColor: '#FF8217',
            inactiveTintColor: '#000'
        }}>
        <Tab.Screen
            name="Смены"
            component={HomePage}
            options={{
                tabBarIcon: ({ color, size }) =>
                    (<MaterialIcons name='date-range' color={color} size={size} />)
            }} />
        <Tab.Screen
            name="Заказы"
            component={OpenOrdersPage}
            options={{
                tabBarIcon: ({ color, size }) =>
                    (<MaterialIcons name='format-list-bulleted' color={color} size={size} />)
            }} />
        <Tab.Screen
            name="Мои заказы"
            component={MyOrdersPage}
            options={{
                tabBarIcon: ({ color, size }) =>
                    (<MaterialIcons name='shopping-cart' color={color} size={size} />)
            }} />
    </Tab.Navigator>
)

const LoginManager = () => {
        const { isSigned } = useContext(AuthContext);
        return isSigned ? <TabNavigation/> : <SignInNavigation />
}

export default function AppStack() {
    return (
        <NavigationContainer>
            <AuthContextProvider>
                <LoginManager/>
            </AuthContextProvider>
        </NavigationContainer>
    )
}