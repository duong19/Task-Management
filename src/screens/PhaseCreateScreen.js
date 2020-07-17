import React, { useState, useContext } from "react"
import {View, StyleSheet, Picker, ScrollView} from 'react-native'
import { SafeAreaView, NavigationActions, NavigationEvents } from "react-navigation";
import { Button, Text, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler'
import {EvilIcons} from '@expo/vector-icons'
import InputField from "../components/InputField";
import { Context as PhaseContext } from "../context/phaseContext";
import { Context as UserContext } from "../context/userContext";
import DescriptionField from "../components/DescriptionField";
import {Context as DepartmentContext} from '../context/departmentContext'

const PhaseCreateScreen = ({navigation}) => {
    const taskId =navigation.getParam('taskId')

    const {createPhase} = useContext(PhaseContext)
    const {state, getUserList} = useContext(UserContext)
    const {state: {departments}, getDepartment} = useContext(DepartmentContext)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [userId, setUserID] = useState('')
    const [department, setDepartment] = useState('')
    return(
        <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <NavigationEvents onWillFocus={() => {getUserList()
        getDepartment()}}/>
        <InputField
            label="Phase name"
            value={name}
            onChangeText={newName => setName(newName)} />
        <DescriptionField
            label="Description"
            value={description}
            onChangeText={newDescription => setDescription(newDescription)} />
        <View  style={{ height: 50, width: 350, borderRadius: 5, borderWidth: 2, borderColor: "rgba(172,172,172,0.7)", marginBottom: 10 }}>
        <Picker 
            selectedValue={department}
            style={{ height: 50, width: 350, borderRadius: 5, borderWidth: 2, borderColor: "rgba(172,172,172,0.7)" }}
            onValueChange={(itemValue, itemIndex) => { if(itemValue !== ""){
            setDepartment(itemValue)}}}>
            <Picker.Item label="Select department" value='' color='red'/>
            {departments !== [] ? (departments.map(dep => {return <Picker.Item label={dep.name} value={dep._id} key={dep._id}/>})) : (
        <Picker.Item label="Loading..." value="" />
    )}
        </Picker>
        </View>
        <View  style={{ height: 50, width: 350, borderRadius: 5, borderWidth: 2, borderColor: "rgba(172,172,172,0.7)" }}>
        <Picker 
            selectedValue={userId}
            style={{ height: 50, width: 350, borderRadius: 5, borderWidth: 2, borderColor: "rgba(172,172,172,0.7)" }}
            onValueChange={(itemValue, itemIndex) => { if(itemValue !== ""){
            setUserID(itemValue)}}}>
            <Picker.Item label="Select user" value='' color='red'/>
            {state.userList !== [] ? (state.userList.filter(user => user.department === department).map(user => {return <Picker.Item label={user.fullName} value={user._id} key={user._id}/>})) : (
        <Picker.Item label="Loading..." value="" />
    )}
        </Picker>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>createPhase({name, description, taskId, userId})}>
          <Text style={{ color: "#FFF" }}>Submit</Text>
  
      </TouchableOpacity>
        </ScrollView>
        </View>
      
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 20
      },
      button: {
        margin: 10,
        marginHorizontal: 110,
        paddingHorizontal: 30,
        paddingVertical: 12, 
        width: "40%",
        alignItems: "center",
        backgroundColor: "#0057FF",
        borderRadius: 4
      }
})

export default PhaseCreateScreen