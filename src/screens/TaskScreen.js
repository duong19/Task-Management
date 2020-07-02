import React, {useContext, useEffect} from "react"
import {View, StyleSheet} from 'react-native'
import { SafeAreaView } from "react-navigation";
import { Button, Text, Input } from 'react-native-elements';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import {EvilIcons} from '@expo/vector-icons'
import { NavigationEvents } from "react-navigation";
import {Context as TaskContext} from "../context/taskContext";
import TaskItem from '../components/TaskItem'

const TaskScreen = ({navigation}) => {
    const {state, getTask, deleteTask} = useContext(TaskContext)
    return(
        <View style={{margin: 20}}>
            <NavigationEvents onWillFocus={getTask}/>
            <FlatList
                data={state.tasks}
                keyExtractor={item => item._id}
                renderItem={({item}) => {
                    return (
                    <TouchableOpacity>
                        <TaskItem name={item.name} description={item.description} isFinished={item.isFinished} _id={item._id} navigation={navigation} deleteTask={deleteTask}/>
                    </TouchableOpacity>)
                }} />
        </View>
    )
}

TaskScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => 
        (<TouchableOpacity>
            <EvilIcons name="plus" size={40} onPress={()=> navigation.navigate("TaskCreate")}/>
        </TouchableOpacity>),
        title: "Task List"
    }
}

export default TaskScreen