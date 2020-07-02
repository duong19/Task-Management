import React, { useContext } from "react"
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import { Button, Text, Input } from 'react-native-elements';
import { SafeAreaView } from "react-navigation";
import {Context as AuthContext} from '../context/authContext'
import {EvilIcons} from '@expo/vector-icons'


const UserScreen = ({navigation}) => {
    const {signout} = useContext(AuthContext)
    return (
        <View>
            <Text h2>User Screen</Text>
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