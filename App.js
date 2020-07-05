import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs";
import  SigninScreen from "./src/screens/SigninScreen";
import  SignupScreen from "./src/screens/SignupScreen";
import ResolveAuthScreen from './src/screens/ResolveAuthScreen'
import TaskScreen from "./src/screens/TaskScreen";
import TaskDetailScreen from "./src/screens/TaskDetailScreen";
import TaskCreateScreen from "./src/screens/TaskCreateScreen";
import Feather from "@expo/vector-icons/Feather";


import  UserScreen from "./src/screens/UserScreen";
import {Provider as AuthProvider} from "./src/context/authContext";
import {Provider as TaskProvider } from "./src/context/taskContext";
import {Provider as UserProvider } from "./src/context/userContext";
import {Provider as PhaseProvider } from "./src/context/phaseContext";

import { setNavigator } from "./src/navigationRef";
import TaskUpdateScreen from './src/screens/TaskUpdateScreen';
import TaskInfoScreen from './src/screens/TaskInfoScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {EvilIcons} from '@expo/vector-icons'
import PhaseCreateScreen from './src/screens/PhaseCreateScreen';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen
  }),
  mainFlow: createBottomTabNavigator({
    TaskFlow: {
      screen: createStackNavigator({
      TaskList: TaskScreen,
      TaskEdit: TaskDetailScreen,
      TaskCreate: TaskCreateScreen,
      TaskUpdate: TaskUpdateScreen,
      PhaseList: TaskInfoScreen,
      PhaseCreate: PhaseCreateScreen
    }),
    navigationOptions: {
      tabBarIcon: ({tintColor}) => {
        return <Icon name="home" size={30} color={tintColor} />

      },
      tabBarLabel: "Home"
    }
  },
    UserFlow: {
      screen: createStackNavigator({
      UserInfo: UserScreen
    }),
    navigationOptions: {
      tabBarIcon: ({tintColor}) => {
        return <Icon name="user" size={30} color={tintColor}/>
      },
      tabBarLabel: "User"
    }
  }},
  {
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
      showIcon: true
    }
  })
})

const App = createAppContainer(switchNavigator)

export default () => {
  return (
    <AuthProvider>
      <UserProvider>
      <TaskProvider>
        <PhaseProvider>
         <App ref={(navigator) => {setNavigator(navigator)}}/>
         </PhaseProvider>
      </TaskProvider>
      </UserProvider>
    </AuthProvider>
  )
}
