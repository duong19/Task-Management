import React, { useState, useContext } from "react"
import {View, StyleSheet} from 'react-native'
import { SafeAreaView } from "react-navigation";
import { Button, Text, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler'
import {EvilIcons} from '@expo/vector-icons'
import InputField from "../components/InputField";
import { Context as PhaseContext } from "../context/phaseContext";
import DescriptionField from "../components/DescriptionField";

const PhaseCreateScreen = ({navigation}) => {
    const taskId =navigation.getParam('taskId')

    console.log(taskId)
    const {createPhase} = useContext(PhaseContext)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    return(
        <View style={styles.container}>
        <InputField
            label="Phase name"
            value={name}
            onChangeText={newName => setName(newName)} />
        <DescriptionField
            label="Description"
            value={description}
            onChangeText={newDescription => setDescription(newDescription)} />
             <TouchableOpacity style={styles.button} onPress={()=>createPhase({name, description, taskId})}>
          
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

export default PhaseCreateScreen