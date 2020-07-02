import React,{useState, useContext} from "react"
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import { Button, Text, Input } from 'react-native-elements';
import InputField from '../components/InputField'
import { navigate } from "../navigationRef";
import {Context as authContext} from '../context/authContext'
import { NavigationEvents } from "react-navigation";

const SigninScreen = ({navigation}) => {

  const {state, signin, clearErrorMessage} = useContext(authContext)
   
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading,setLoading] = useState(false)

    console.log(state)
    return (
      
        <View style={styles.container}>
        <NavigationEvents
          onWillBlur={()=>{clearErrorMessage()}}/>
        <Text h2 style={{marginBottom: 15}}>Sign In</Text>
        <InputField
            label="Username"
            value={username}
            onChangeText={newUsername => setUsername(newUsername)} />
        <InputField
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={newPassword => setPassword(newPassword)} />
        {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={()=>signin({username, password})}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={{ color: "#FFF" }}>SIGN IN</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
          <Text style={styles.link}>Don't have account? Click here to sign up</Text>
        </TouchableOpacity>
        </View>
    )
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
      link: {
        color: 'blue',
        
      },
      errorMessage: {
        color: 'red'
      }
})

export default SigninScreen