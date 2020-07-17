import React, { useState, useContext } from "react"
import {View, StyleSheet, Picker, Item, TouchableOpacity, ScrollView} from 'react-native'
import {Button, Text, Input } from 'react-native-elements';
import InputField from '../components/InputField'
import {Context as AuthContext} from '../context/authContext'
import { NavigationEvents } from "react-navigation";
import {Context as DepartmentContext} from '../context/departmentContext'

const SignupScreen = ({navigation}) => {

    const {state, signup, clearErrorMessage} = useContext(AuthContext)
    const {state: {departments}, getDepartment} = useContext(DepartmentContext)


    const [gender, setGender] = useState(true)
    const [role, setRole] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [department,setDepartment] = useState("")

    return (
        <ScrollView>

    <View style={styles.container}>
        <NavigationEvents onWillFocus={getDepartment} onWillBlur={clearErrorMessage}/>
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
        <Text style={{marginRight: 260}}>Gender</Text>
        <View style={{ height: 50, width: 310, borderRadius: 5, borderWidth: 1, borderColor: "rgba(172,172,172,0.7)", marginBottom: 15 }}>
        <Picker 
            selectedValue={gender}
            style={{ height: 50, width: 310, borderRadius: 5, borderWidth: 4, borderColor: "rgba(172,172,172,0.7)" }}
            onValueChange={(itemValue, itemIndex) => { if (itemValue !== ""){
            setGender(itemValue)}}}>
            <Picker.Item label='Male' value={true} />
            <Picker.Item label='Female' value={false} />
    
        </Picker>
        </View>
        <Text style={{marginRight: 230}}>Department</Text>
        <View style={{ height: 50, width: 310, borderRadius: 5, borderWidth: 1, borderColor: "rgba(172,172,172,0.7)", marginBottom: 10 }}>
        <Picker 
            selectedValue={department}
            style={{ height: 50, width: 310, borderRadius: 5, borderWidth: 4, borderColor: "rgba(172,172,172,0.7)" }}
            onValueChange={(itemValue, itemIndex) => { if (itemValue !== ""){
            setDepartment(itemValue)}}}>
            <Picker.Item label='Please select your department' value='' color='red'/>
            {departments !== [] ? (departments.map(dep => {return <Picker.Item label={dep.name} value={dep._id} key={dep._id}/>})) : (<Picker.Item label='Please select an option...' value='' />
    )}
        </Picker>
        </View>
        {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={()=>signup({username, password, fullName:name, age, role, gender, department})}>
          
            <Text style={{ color: "#FFF" }}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
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
        margin: 40, marginTop: 100
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