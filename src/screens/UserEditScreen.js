import React, { useContext, useEffect, useState } from "react"
import {View, Text, Picker, StyleSheet, TouchableOpacity, Image, Button, ScrollView} from 'react-native'
import { SafeAreaView } from "react-navigation";
import { Context as UserContext } from "../context/userContext";
import { Context as DepartmentContext } from "../context/departmentContext";
import InputField from '../components/InputField'


const UserEditScreen = (props) => {
    const {state, updateUser} = useContext(UserContext)
    const {state: {departments}, getDepartment} = useContext(DepartmentContext)


    const [name, setName] = useState(state.user.fullName)
    const [age, setAge] = useState(state.user.age)
    const [department,setDepartment] = useState(state.user.department)
    const [gender, setGender] = useState(state.user.isMale)

    return (
        <ScrollView>
        <View style={styles.container}>
            
            <InputField
            label="Your name"
            value={name}
            onChangeText={newName => setName(newName)} />
        <InputField
            label="Your age"
            value={age.toString()}
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
        <TouchableOpacity style={styles.button} onPress={()=> {updateUser({userId: state.user._id, fullName:name, age, isMale: gender, department})}}>
          
            <Text style={{ color: "#FFF" }}>Submit</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 40,
        marginVertical: 100
    },
    button: {
        margin: 20,
        paddingHorizontal: 30,
        paddingVertical: 12,
        width: "40%",
        alignItems: "center",
        backgroundColor: "#0057FF",
        borderRadius: 4,
        marginHorizontal: 90
    }
})

export default UserEditScreen