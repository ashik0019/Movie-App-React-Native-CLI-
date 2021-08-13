import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import SignIn from './Screens/SignIn'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUp from './Screens/SignUp';
import Home from './Screens/signedIn/Home';
import Apparel from './Screens/signedIn/Apparel';
import Notification from './Screens/signedIn/Notification';
import Profile from './Screens/signedIn/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import  {firebase}  from './Firebase/firebase';

const App = () => {
  const [isSignIn, setIsSignIn] = useState(false)
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        setIsSignIn(true)
      }else{
        setIsSignIn(false)
      }
    })
  }, [isSignIn])


  if (isSignIn == true) {
    return (
      <NavigationContainer>
      <Tab.Navigator
         screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Apparel') {
              iconName = focused ? 'shirt' : 'shirt-outline';
            }else if (route.name === 'Notifications') {
              iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
            }else if (route.name === 'Profile') {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="Apparel" component={Apparel} />
        <Tab.Screen name="Notifications" component={Notification} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }



}

export default App

const styles = StyleSheet.create({
  mainView: {
    marginTop: 40,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'blue',
    fontSize: 32
  }
})
