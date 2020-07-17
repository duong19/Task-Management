import React, {useContext, useEffect, useState} from "react"
import {View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator} from 'react-native'
import { SafeAreaView } from "react-navigation";
import { Button, Text, Input, SearchBar } from 'react-native-elements';
import {FlatList } from 'react-native-gesture-handler'
import {EvilIcons} from '@expo/vector-icons'
import { NavigationEvents } from "react-navigation";
import {Context as PhaseContext} from "../context/phaseContext";
import TaskItem from '../components/TaskItem'
import InputField from "../components/InputField";
import DescriptionField from "../components/DescriptionField";
import PhaseItem from "../components/PhaseItem";
import { navigate } from "../navigationRef";
import Icon from 'react-native-vector-icons/AntDesign';



const TaskInfoScreen = ({navigation}) => {

    const {state, getPhases} = useContext(PhaseContext)
    const taskId = navigation.getParam('taskId')
    const role = navigation.getParam('role')
    const [textInput, setTextInput] = useState('')
    const [loading, setLoading] = useState(true)
    let isMounted = false

    // useEffect(() => {
    //     getPhases(taskId)
    //     setData(state.phases)
    // })
    // console.log(state)
    // const taskId = navigation.getParam('taskId')
    // const [data, setData] = useState(state.phases)
    return (
        <View >
            <NavigationEvents onWillFocus={() => {isMounted = true
            getPhases(taskId).then(result => {if (isMounted) {setLoading(false)}}) }} onWillBlur={isMounted=false}/>
            <View style={{flexDirection: 'row', margin: 10}}>
            <SearchBar 
                value={textInput}
                onChangeText={(searchInput) => setTextInput(searchInput)}
                placeholder={'Search'}
                inputStyle={{backgroundColor: 'white'}} inputContainerStyle={{backgroundColor:"white"}}
                containerStyle={{flex : 3, backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}/>
         {role === "admin" ? (<TouchableOpacity style={{margin: 10}} onPress={() => { navigation.navigate('PhaseCreate', {taskId: taskId}) }}>
                <Icon name="pluscircleo" size={40} color='blue'/>
            </TouchableOpacity>) : null}
            </View>
            
            {!loading ? (<FlatList
                showsVerticalScrollIndicator={false}
                style={{margin: 10, height: 520}} 
                data={textInput !== '' ? (state.phases.filter(item => item.name.includes(textInput))) : state.phases}
                keyExtractor={item => item._id}
                renderItem={({item}) => {
                    return (
                        <PhaseItem name={item.name} description={item.description} isFinished={item.isFinished} _id={item._id} navigation={navigation} userID={item.userId} role={role} screen='' />
                    )
                }}/>) : <ActivityIndicator size="large" /> }
            
            
        </View>
    )

}

TaskInfoScreen.navigationOptions = ({navigation}) => {
    return {
        title: navigation.getParam("taskName")
    }
}


export default TaskInfoScreen