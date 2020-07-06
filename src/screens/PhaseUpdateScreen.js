import React, { useState, useContext } from "react"
import {View, StyleSheet, Picker, TouchableOpacity} from 'react-native'
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Button, Text, Input } from 'react-native-elements';
import {EvilIcons} from '@expo/vector-icons'
import { Context as PhaseContext } from "../context/phaseContext";
import { Context as UserContext } from "../context/userContext";
import DescriptionField from "../components/DescriptionField";
import InputField from "../components/InputField";

const PhaseUpdateScreen = ({navigation}) => {

    const {state: phaseState, updatePhase} = useContext(PhaseContext)
    const {state, getUserList} = useContext(UserContext)
    const phase = phaseState.phases.find(
        phase => phase._id === navigation.getParam('phaseId')
    )
    const [name, setName] = useState(phase.name)
    const [description, setDescription] = useState(phase.description)
    const [userId, setUserID] = useState(phase.userId)

    return(
        <View style={{margin: 20}}>
        <NavigationEvents onWillFocus={getUserList}/>
        <InputField
            label="Phase name"
            value={name}
            onChangeText={newName => setName(newName)} />
        <DescriptionField
            label="Description"
            value={description}
            onChangeText={newDescription => setDescription(newDescription)} />
        <Picker 
            selectedValue={userId}
            style={{ height: 50, width: 300, borderRadius: 5, borderWidth: 4, borderColor: "rgba(172,172,172,0.7)" }}
            onValueChange={(itemValue, itemIndex) => {
            setUserID(itemValue)}}>
            {state.userList !== [] ? (state.userList.map(user => {return <Picker.Item label={user.fullName} value={user._id} key={user._id}/>})) : (
        <Picker.Item label="Loading..." value="" />
    )}
        </Picker>
        <TouchableOpacity style={styles.button} onPress={()=>updatePhase({phaseId: phase._id ,userId, name, description, taskId: phase.taskId, isFinished: phase.isFinished})}>
          <Text style={{ color: "#FFF" }}>Submit</Text>
  
        </TouchableOpacity>
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
            paddingHorizontal: 30,
            paddingVertical: 12, 
            width: "40%",
            alignItems: "center",
            backgroundColor: "#0057FF",
            borderRadius: 4
          }
    })
export default PhaseUpdateScreen