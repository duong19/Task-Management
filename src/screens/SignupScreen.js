import React, { useState, useContext } from "react"
import {View, StyleSheet, Picker, Item, TouchableOpacity} from 'react-native'
import {Button, Text, Input } from 'react-native-elements';
import InputField from '../components/InputField'
import {Context as AuthContext} from '../context/authContext'
import { NavigationEvents } from "react-navigation";

const SignupScreen = ({navigation}) => {

    const {state, signup, clearErrorMessage} = useContext(AuthContext)
    


    const [gender, setGender] = useState(true)
    const [role, setRole] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [loading,setLoading] = useState(false)

    console.log(state)
    return (
    <View style={styles.container}>
        <Text h2 style={{marginBottom: 15}}>Sign Up</Text>
        <InputField
            label="Username"
            value={username}
            onChangeText={newUsername => setUsername(newUsername)} />
        <InputField
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={newPassword => setPassword(newPassword)} />
        <InputField
            label="Your name"
            value={name}
            onChangeText={newName => setName(newName)} />
        <InputField
            label="Your age"
            value={age}
            onChangeText={(newAge) => setAge(newAge)}
            keyboardType='numeric' />
        {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={()=>signup({username, password, fullName:name, age, role, gender})}>
          
            <Text style={{ color: "#FFF" }}>SIGN UP</Text>
        </TouchableOpacity>

      </View>
    )
}

SignupScreen.navigationOptions = () => {
    return {
        header: null
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 40
      },
      button: {
        margin: 10,
        paddingHorizontal: 30,
        paddingVertical: 12,
        width: "40%",
        alignItems: "center",
        backgroundColor: "#0057FF",
        borderRadius: 4
      },
      errorMessage: {
        fontSize: 16,
        color: 'red'
      }
})

export default SignupScreen