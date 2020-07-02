import React, { useContext, useState } from "react"
import {View, StyleSheet} from 'react-native'
import { SafeAreaView } from "react-navigation";
import { Button, Text, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler'
import {EvilIcons} from '@expo/vector-icons'
import {Context as TaskContext} from "../context/taskContext";
import InputField from "../components/InputField";
import DescriptionField from "../components/DescriptionField";

const TaskDetailScreen = ({navigation}) => {

    const {state, editTask} = useContext(TaskContext)

    const thisTask = state.tasks.find(
        task => task._id === navigation.getParam('_id')
    )

    const [name, setName] = useState(thisTask.name)
    const [description, setDescription] = useState(thisTask.description)
    const [isFinished,setIsFinished] = useState(thisTask.isFinished)
    return(
        <View style={styles.container}>
        <InputField
            label="Task name"
            value={name}
            onChangeText={newName => setName(newName)} />
        <DescriptionField
            label="Description"
            value={description}
            onChangeText={newDescription => setDescription(newDescription)} />
        <TouchableOpacity style={styles.button} onPress={()=>editTask({_id: thisTask._id, name, description, isFinished})}>
          
          <Text style={{ color: "#FFF" }}>Submit</Text>
  
      </TouchableOpacity>
        </View>
    )

}
TaskDetailScreen.navigationOptions = ({navigation}) => {
    return {
        title: "Edit Task"
    }
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
export default TaskDetailScreen