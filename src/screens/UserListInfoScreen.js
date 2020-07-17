import React, { useContext, useEffect, useState } from "react"
import {View, Text, Picker, StyleSheet, TouchableOpacity, Image, Button, ScrollView, FlatList, ActivityIndicator} from 'react-native'
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Context as UserContext } from "../context/userContext";
import { Context as DepartmentContext } from "../context/departmentContext";
import { Context as PhaseContext } from "../context/phaseContext";
import InputField from '../components/InputField'
import {Input, SearchBar } from 'react-native-elements';
import UserItem from '../components/UserItem'
import Feather from "@expo/vector-icons/Feather";
import InfoField from "../components/InfoField";
import PhaseItem from "../components/PhaseItem";

const UserListInfoScreen = ({navigation}) => {

    const {state: {departments}, getDepartment} = useContext(DepartmentContext)
    const {state: {userList}} = useContext(UserContext)
    const {state: {phases}, getPhasesByUser} = useContext(PhaseContext)

    const userId = navigation.getParam('userId')
    const user = userList.find(item => item._id === userId)
    const [loading, setLoading] = useState(true)
    let isMounted = false

    return (
        <View style={{marginTop: 20}}>
        <NavigationEvents onWillFocus={() => {isMounted = true
            getPhasesByUser(userId).then(result => {if (isMounted) { setLoading(false)}})}} onWillBlur={isMounted = false}/>

            <View style={{flexDirection: 'row', margin: 10}}>
        
        <Image source={user.isMale ? require('../../assets/user_male.png') : require('../../assets/user_female.png')} style={{width: 80,height: 100,resizeMode: 'contain', marginTop:20,  marginLeft: 15, marginRight: 5}}/>  
        
 
        <View>
            <InfoField label='Full Name' data={user.fullName}/>
            <InfoField label='Age' data={user.age}/>
            <InfoField label='Gender' data={user.isMale ? "Male" : "Female"}/>
            {user.department ? (<InfoField label='Department' data={departments.find( item => item._id === user.department).name}/>) : null}

            <InfoField label='Role' data={user.isAdmin ? "Admin" : "User"}/>

        </View>
        </View>
        {/* <View style={{marginHorizontal: 20, flexDirection: 'column'}}> */}
            <Text style={{fontWeight: 'bold', fontSize: 15, marginHorizontal: 10}}>Assigned phases:</Text>
            {!loading ? (<FlatList
                showsVerticalScrollIndicator={false}
                style={{ height: 350, margin: 5, marginHorizontal: 10}} 
                data={phases}
                keyExtractor={item => item._id}
                renderItem={({item}) => {
                    return (
                        <PhaseItem name={item.name} description={item.description} isFinished={item.isFinished} _id={item._id} navigation={navigation} userID={item.userId} role='admin' screen='list' />
                    )
                }}/>) : <ActivityIndicator size="large" /> }
        {/* </View> */}
        </View>
    )
}
UserListInfoScreen.navigationOptions = ({navigation}) => {
    return {
        title: `Employee Information`
    }
}
export default UserListInfoScreen