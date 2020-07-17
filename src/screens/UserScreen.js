import React, { useContext, useEffect, useState } from "react"
import {View, StyleSheet, TouchableOpacity, Image, ActivityIndicator} from 'react-native'
import { Button, Text, Input } from 'react-native-elements';
import { SafeAreaView } from "react-navigation";
import {Context as AuthContext} from '../context/authContext'
import {Context as UserContext} from '../context/userContext'
import {EvilIcons} from '@expo/vector-icons'
import { NavigationEvents } from "react-navigation";
import InfoField from "../components/InfoField";
import {Context as DepartmentContext} from '../context/departmentContext'

const UserScreen  = ({navigation}) => {
    const {state: {userId}, signout} = useContext(AuthContext)
    const {state ,getUser} = useContext(UserContext)
// const {fullName, age, isMale} = state.user
    const {state: {departments}, getDepartment} = useContext(DepartmentContext)
    const [loading, setLoading] = useState(true)
    let isMounted = false
    // let dep
    // const dep = departments.find( item => item._id === state.user.department)
    return (
        <View style={{marginTop: 30}}>
            <NavigationEvents onWillFocus={() => {isMounted = true
            getUser(userId).then(function(){ return getDepartment()}).then(result => { if (isMounted) { setLoading(false)}})}} onWillBlur={isMounted = false}
            />
        { !loading ? 
        (
        <View style={{flexDirection: 'row', margin: 15}}>
        
        <Image source={state.user.isMale ? require('../../assets/user_male.png') : require('../../assets/user_female.png')} style={{width: 80,height: 80,resizeMode: 'contain', marginTop: 10, marginLeft: 15, marginRight: 5}}/>  
        
 
        <View>
            <InfoField label='Full Name' data={state.user.fullName}/>
            <InfoField label='Age' data={state.user.age}/>
            <InfoField label='Gender' data={state.user.isMale ? "Male" : "Female"}/>
            {state.user.department ? (<InfoField label='Department' data={departments.find( item => item._id === state.user.department).name}/>) : null}

            <InfoField label='Role' data={state.user.isAdmin ? "Admin" : "User"}/>

        </View>
        </View>) : <ActivityIndicator size="large" />}
        { !loading && state.user.isAdmin? 
        (  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserList')}>
                    <Text style={{ color: "#FFF" }}>Manage Users</Text>
            </TouchableOpacity>) : null}
            
            <TouchableOpacity style={styles.buttonOut} onPress={signout}>
                    <Text style={{ color: "#FFF" }}>SIGN OUT</Text>
            </TouchableOpacity>
        </View>
    )
}

UserScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => 
        (<TouchableOpacity onPress={() => navigation.navigate('UserEdit')}>
            <EvilIcons name="pencil" size={40}/>
        </TouchableOpacity>),
        title: 'User Info'
    }
}

const styles = StyleSheet.create({
   
      button: {
        margin: 15,
        paddingHorizontal: 30,
        paddingVertical: 12,
        width: "90%",
        alignItems: "center",
        backgroundColor: "#0057FF",
        borderRadius: 4,
        color: 'red'
      },
      buttonOut: {
        margin: 15,
        paddingHorizontal: 30,
        paddingVertical: 12,
        width: "90%",
        alignItems: "center",
        backgroundColor: "red",
        borderRadius: 4,
        color: 'red'
      }
})

export default UserScreen