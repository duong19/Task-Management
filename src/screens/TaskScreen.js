import React, {useContext, useEffect, useState} from "react"
import { TouchableOpacity ,View, StyleSheet} from 'react-native'
import { SafeAreaView } from "react-navigation";
import { Button, Text, Input, SearchBar } from 'react-native-elements';
import {  FlatList } from 'react-native-gesture-handler'
import {EvilIcons} from '@expo/vector-icons'
import { NavigationEvents } from "react-navigation";
import {Context as TaskContext} from "../context/taskContext";
import TaskItem from '../components/TaskItem'

const TaskScreen = ({navigation}) => {
    const {state, getTask, deleteTask} = useContext(TaskContext)
    const [textInput, setTextInput] = useState('')

    return(
        <View style={{margin: 20}}>
            <NavigationEvents onWillFocus={getTask}/>
            <SearchBar
    value={textInput}
    onChangeText={(searchInput) => setTextInput(searchInput)}
    inputStyle={{backgroundColor: 'white'}} inputContainerStyle={{backgroundColor:"white"}}
    containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5, margin: 10}}
    placeholder={'Search'}/>
            <FlatList
                data={textInput !== '' ? (state.tasks.filter(item => item.name.includes(textInput))) : state.tasks}
                // data={state.tasks}
                keyExtractor={item => item._id}
                renderItem={({item}) => {
                    return (
                    <TouchableOpacity onPress={() => navigation.navigate('PhaseList', {taskId: item._id})}>
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