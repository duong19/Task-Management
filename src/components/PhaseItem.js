import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context as PhaseContext } from "../context/phaseContext";
import userAPI from "../api/task";
import { NavigationEvents } from "react-navigation";



const PhaseItem = props => {
    const {name, description, userId, taskId, isFinished} = props
    const [username, setUsername] = useState('')
    // const [userID, setUserID] = useState(userId ? userId : '')
    const getReponse = async () => {
        console.log(userId)
        const res = await userAPI.get(`users/${userId}`)
        console.log(res.data)
        setUsername(res.data.fullName) }
      
         useEffect(() => { if(userId) {getReponse()}})
      
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
            <Text style={styles.bodyText}>{description}</Text>
            <Text style={styles.bodyText}>{username}</Text>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                
                <TouchableOpacity>
                    <Feather size={30} name="edit" color="blue"/>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Feather size={30} name="trash" color="red"/>
                </TouchableOpacity>
            </View>
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