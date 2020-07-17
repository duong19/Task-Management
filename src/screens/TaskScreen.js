import React, {useContext, useEffect, useState} from "react"
import { TouchableOpacity ,View, StyleSheet, AsyncStorage } from 'react-native'
import { SafeAreaView } from "react-navigation";
import { Button, Text, Input, SearchBar } from 'react-native-elements';
import {  FlatList } from 'react-native-gesture-handler'
import {EvilIcons} from '@expo/vector-icons'
import { NavigationEvents } from "react-navigation";
import {Context as TaskContext} from "../context/taskContext";
import {Context as AuthContext} from "../context/authContext";
import {Context as UserContext} from "../context/userContext";
import TaskItem from '../components/TaskItem'
import Icon from 'react-native-vector-icons/AntDesign';




const TaskScreen = ({navigation}) => {
    const {state, getTask, deleteTask} = useContext(TaskContext)
    const {state: {role, userId}} = useContext(AuthContext)
    const {getUserList} = useContext(UserContext)
    const [textInput, setTextInput] = useState('')
    
    // props.navigationOptions = ({navigation}) => {
    // console.log(navigation)
    // return {
    //     headerRight: () => 
    //     (<TouchableOpacity>
    //         <EvilIcons name="plus" size={40} onPress={()=> navigation.navigate("TaskCreate")}/>
    //     </TouchableOpacity>),
    //     title: "Task List"
    // }
    
    
    return(
        <SafeAreaView forceInset={{top: 'always'}} style={{marginVertical: 10}}>
            <NavigationEvents onWillFocus={() => {getTask() 
            getUserList()}}/>
            <View style={{flexDirection: 'row', margin: 10}}>
            <SearchBar
    value={textInput}
    onChangeText={(searchInput) => setTextInput(searchInput)}
    inputStyle={{backgroundColor: 'white'}} inputContainerStyle={{backgroundColor:"white"}}
    containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5, flex: 5}}
    placeholder={'Search'}/>
    {role === "admin" ? (<TouchableOpacity style={{margin: 10}} onPress={() => { navigation.navigate('TaskCreate') }}>
                <Icon name="pluscircleo" size={40} color='blue'/>
     </TouchableOpacity>) : null}
    </View>
    <View style={{marginHorizontal: 10}}>
            <FlatList
                data={textInput !== '' ? (state.tasks.filter(item => item.name.includes(textInput))) : state.tasks}
                // data={state.tasks}
                style={{height: 567}}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item._id}
                renderItem={({item}) => {
                    return (
                    <TouchableOpacity onPress={() => navigation.navigate('PhaseList', {taskId: item._id, taskName: item.name, role: role})}>
                        <TaskItem name={item.name} description={item.description} isFinished={item.isFinished} _id={item._id} navigation={navigation} role={role} deleteTask={deleteTask}/>
                    </TouchableOpacity>)
                }} />
                </View>
        </SafeAreaView>
    )
}

TaskScreen.navigationOptions = ({navigation}) => {
    return {
        // headerRight: role === "admin" ? () =>  
        // (<TouchableOpacity>
        //     <EvilIcons name="plus" size={40} onPress={()=> navigation.navigate("TaskCreate")}/>
        // </TouchableOpacity>) : null,
        header: null
    }
}

export default TaskScreen