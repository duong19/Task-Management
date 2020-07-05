import React, { useContext, useEffect } from "react"
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { Button, Text, Input } from 'react-native-elements';
import { SafeAreaView } from "react-navigation";
import {Context as AuthContext} from '../context/authContext'
import {Context as UserContext} from '../context/userContext'
import {EvilIcons} from '@expo/vector-icons'
import { NavigationEvents } from "react-navigation";
import InfoField from "../components/InfoField";

const UserScreen  = ({navigation}) => {
    const {state: {userId}, signout} = useContext(AuthContext)
    const {state ,getUser} = useContext(UserContext)
// const {fullName, age, isMale} = state.user
    
    return (
        <View style={{marginTop: 30}}>
            <NavigationEvents onWillFocus={() => getUser(userId)}/>
            {console.log(state)}
        { state.user ? 
        (
        <View style={{flexDirection: 'row', margin: 15}}>
        
        <Image source={state.user.isMale ? require('../../assets/user_male.png') : require('../../assets/user_female.png')} style={{width: 100,height: 100,resizeMode: 'contain', marginTop: 10, marginLeft: 15, marginRight: 5}}/>  
        
 
        <View>
            <InfoField label='Full Name' data={state.user.fullName}/>
            <InfoField label='Age' data={state.user.age}/>
            <InfoField label='Gender' data={state.user.isMale ? "Male" : "Female"}/>
            <InfoField label='Role' data={state.user.isAdmin ? "Admin" : "User"}/>

        </View>
        </View>) : null
        }
            <TouchableOpacity style={styles.button} onPress={signout}>
                    <Text style={{ color: "#FFF" }}>SIGN OUT</Text>
            </TouchableOpacity>
        </View>
    )
}

UserScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => 
        (<TouchableOpacity>
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
      }
})

export default UserScreen