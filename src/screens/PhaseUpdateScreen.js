import React, { useState, useContext, useEffect } from "react"
import {View, StyleSheet, Picker, TouchableOpacity} from 'react-native'
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Button, Text, Input } from 'react-native-elements';
import {EvilIcons} from '@expo/vector-icons'
import { Context as PhaseContext } from "../context/phaseContext";
import { Context as UserContext } from "../context/userContext";
import DescriptionField from "../components/DescriptionField";
import InputField from "../components/InputField";
import {Context as DepartmentContext} from '../context/departmentContext'
import { ScrollView } from "react-native-gesture-handler";
import { Context as AuthContext } from "../context/authContext";

const PhaseUpdateScreen = ({navigation}) => {

    const {state: {role}} = useContext(AuthContext)
    const {state: phaseState, updatePhase} = useContext(PhaseContext)
    const {state, getUserList} = useContext(UserContext)
    const {state: {departments}, getDepartment} = useContext(DepartmentContext)
    
   useEffect(() => {
    getUserList()
    getDepartment()
   }, [])

    // const tempDepartment = (user.department === undefined ? (departments.find(
    //     dep => dep._id === user.department
    // )) : undefined )
    const phase = phaseState.phases.find(
        phase => phase._id === navigation.getParam('phaseId')
    )
    const user = state.userList.find(
        item => item._id === phase.userId
    )
    const [department, setDepartment] = useState(user ? user.department : '')
    const [name, setName] = useState(phase.name)
    const [description, setDescription] = useState(phase.description)
    const [userId, setUserID] = useState(user ? user._id : '')
    const [isFinished, setIsFinished] = useState(phase.isFinished)
    return(
        <View style={{margin: 20}}>
        {/* <NavigationEvents onWillFocus={() => {getUserList()
        getDepartment()}}/> */}
        <ScrollView showsVerticalScrollIndicator={false}>
        {role === 'admin' ? (<InputField
            label="Phase name"
            value={name}
            onChangeText={newName => setName(newName)} />) : (<InputField
            label="Phase name"
            value={name}
            onChangeText={newName => setName(newName)} editable={false} />) }
        {role === 'admin' ? (<DescriptionField
            label="Description"
            value={description}
            onChangeText={newDescription => setDescription(newDescription)} />) : (<DescriptionField
            label="Description"
            value={description}
            onChangeText={newDescription => setDescription(newDescription)} editable={false} />) }
         {role === 'admin' ? (<View  style={{ height: 50, width: 350, borderRadius: 5, borderWidth: 2, borderColor: "rgba(172,172,172,0.7)", marginBottom: 10 }}>
        <Picker 
            selectedValue={department}
            style={{ height: 50, width: 350, borderRadius: 5, borderWidth: 2, borderColor: "rgba(172,172,172,0.7)" }}
            onValueChange={(itemValue, itemIndex) => { if(itemValue !== ""){
            setDepartment(itemValue)}}}>
            <Picker.Item label="Select department ..." value='' color='red'/>
            {departments !== [] ? (departments.map(dep => {return <Picker.Item label={dep.name} value={dep._id} key={dep._id}/>})) : (
        <Picker.Item label="Loading..." value="" />
    )}
        </Picker>
        </View>) : null}
        {role === 'admin' ? (<View  style={{ height: 50, width: 350, borderRadius: 5, borderWidth: 2, borderColor: "rgba(172,172,172,0.7)" , marginBottom: 10}}>
        <Picker 
            selectedValue={userId}
            style={{ height: 50, width: 350, borderRadius: 5, borderWidth: 2, borderColor: "rgba(172,172,172,0.7)" }}
            onValueChange={(itemValue, itemIndex) => { if(itemValue !== ""){
            setUserID(itemValue)}}}>
            <Picker.Item label="Select user" value='' color='red'/>
            {state.userList ? (state.userList.filter(user => (user.department === department) ).map(user => {return <Picker.Item label={user.fullName} value={user._id} key={user._id}/>})) : (
            <Picker.Item label="Loading..." value="" />
    )}
        </Picker>
        </View>) : null}
        <View  style={{ height: 50, width: 350, borderRadius: 5, borderWidth: 2, borderColor: "rgba(172,172,172,0.7)" }}>
        <Picker 
            selectedValue={isFinished}
            style={{ height: 50, width: 350, borderRadius: 5, borderWidth: 2, borderColor: "rgba(172,172,172,0.7)" }}
            onValueChange={(itemValue, itemIndex) => { setIsFinished(itemValue)}}>
        <Picker.Item label="Finished" value={true} color="red"/>
        <Picker.Item label="Unfinished" value={false} color="red"/>
        </Picker>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>{updatePhase({phaseId: phase._id ,userId, name, description, taskId: phase.taskId, isFinished: isFinished}) 
        navigation.goBack()}}>
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
            marginVertical: 20,
            marginHorizontal: 100,
            paddingHorizontal: 30,
            paddingVertical: 12, 
            width: "40%",
            alignItems: "center",
            backgroundColor: "#0057FF",
            borderRadius: 4
          }
    })
export default PhaseUpdateScreen