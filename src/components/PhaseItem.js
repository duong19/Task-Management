import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context as PhaseContext } from "../context/phaseContext";
import { Context as AuthContext } from "../context/authContext";

import userAPI from "../api/task";
import { NavigationEvents } from "react-navigation";



const PhaseItem = props => {
    const {name, description, userID, taskId, isFinished, _id, navigation, role, screen} = props
    const [username, setUsername] = useState('')
    const {deletePhase} = useContext(PhaseContext)
    const {state: {userId}} = useContext(AuthContext)
    // const [userID, setUserID] = useState(userId ? userId : '')
    const getReponse = async () => {
        const res = await userAPI.get(`users/${userID}`)
        setUsername(res.data.fullName) }
      
        useEffect(() => { if(userID) {getReponse()}})
    const createTwoButtonAlert = (phaseId) =>
        Alert.alert(
          "Confirm Delete",
          "Do you want to delete this phase?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => deletePhase(phaseId) }
          ],
          { cancelable: false }
        );
    return (
        <View style={{flexDirection: 'row'}}>
        <View style={styles.cardContainer}>
        {/* <NavigationEvents onWillFocus={async () => {
                console.log(userID)
                const res = await userAPI.get(`users/${userID}`)
                setUsername(res.data.fullName)
        }}
        onDidFocus={async () => {
                console.log(userID)
                const res = await userAPI.get(`users/${userID}`)
                setUsername(res.data.fullName)
        }}
        onWillBlur={()=>{
                console.log("Blur")
                setUsername('')
                setUserID('')}} /> */}
        
        <View style={{ padding: 10 }}>
            <View style={{
            
            flexDirection: "row"
            
          }}>
          <View style={{ flex: 10 }}>
                <Text style={styles.titleText}>{name}</Text>
                </View>
                <View style={{ flex : 1 }}>
                {isFinished ? (<Feather size={20} name="check-square" color="green" />) : (
                <Feather size={20} name="square" color="gray" />
            )}
            </View>

            </View>
            <View style={{paddingVertical: 10}}>
            <Text style={{fontWeight: 'bold'}}>Description: </Text>
            <Text style={{color: 'black'}}>{description}</Text>
            </View>
            <View style={{flexDirection: 'row', paddingVertical: 10}}>
            <Text style={{fontWeight: 'bold'}}>Assigned to: </Text>
            <Text style={{color: 'black'}}>{username}</Text>
            </View>
            {screen !== 'list' ? (<View style={{flexDirection: "row", justifyContent: "space-between"}}>
                
                <TouchableOpacity onPress={() => {if((userID === userId || role==="admin") && screen !== 'list') {
                  navigation.navigate('PhaseUpdate', {phaseId: _id})}
                  }}>
                    <Feather size={30} name="edit" color="blue"/>
                </TouchableOpacity>
                {role === "admin" && screen !== 'list' ? (<TouchableOpacity onPress={() => createTwoButtonAlert(_id)}>
                    <Feather size={30} name="trash" color="red"/>
                </TouchableOpacity>) : null }
            </View>) : null}
            </View> 
        </View>
        </View>
    )
}


const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: "#FFF",
      borderRadius: 10,
      marginVertical: 10,
      marginHorizontal: 5,
      borderWidth: 2,
      backgroundColor: 'rgb(211,211,211)',
      flex: 1,
      height: 180
    },
    titleText: {
      fontWeight: "bold",
      fontSize: 20,
      color: 'black'
    },
    bodyText: {
      color: "black",
      paddingVertical: 15
    }
  });

export default PhaseItem