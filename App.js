import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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



import  UserScreen from "./src/screens/UserScreen";
import {Provider as AuthProvider} from "./src/context/authContext";
import {Provider as TaskProvider } from "./src/context/taskContext";
import { setNavigator } from "./src/navigationRef";
import TaskUpdateScreen from './src/screens/TaskUpdateScreen';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen
  }),
  mainFlow: createBottomTabNavigator({
    TaskFlow: createStackNavigator({
      TaskList: TaskScreen,
      TaskEdit: TaskDetailScreen,
      TaskCreate: TaskCreateScreen,
      TaskUpdate: TaskUpdateScreen
    }),
    UserFlow: createStackNavigator({
      UserInfo: UserScreen
    })
  })
})

const App = createAppContainer(switchNavigator)

export default () => {
  return (
    <AuthProvider>
      <TaskProvider>
      <App ref={(navigator) => {setNavigator(navigator)}}/>
      </TaskProvider>
    </AuthProvider>
  )
}
