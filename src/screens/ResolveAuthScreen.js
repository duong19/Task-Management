import React, { useState, useContext, useEffect } from "react"
import {View, StyleSheet, Picker, Item, TouchableOpacity} from 'react-native'
import {Button, Text, Input } from 'react-native-elements';
import InputField from '../components/InputField'
import {Context as AuthContext} from '../context/authContext'


const ResolveAuthScreen = () => {
    const {tryLocalSignIn} = useContext(AuthContext)

    useEffect(() => {
        tryLocalSignIn()
    },[])
    
    return null
}

export default ResolveAuthScreen