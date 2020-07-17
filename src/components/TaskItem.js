import React, { useContext } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity,Alert } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { Context as TaskContext } from "../context/taskContext";

const TaskItem = props => {

    const {deleteTask} = useContext(TaskContext)

    const {name, description, isFinished, navigation, _id, role} = props
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
            { text: "OK", onPress: () => deleteTask(phaseId) }
          ],
          { cancelable: false }
        );
      

    return (
        <View style={styles.cardContainer}>
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
            <Text style={{fontWeight: 'bold', fontSize: 15}}>Description: </Text>
            <Text style={{color: 'black'}}>{description}</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                
                {role === "admin" ? (<TouchableOpacity onPress={() => navigation.navigate('TaskEdit', {_id: _id})}>
                    <Feather size={30} name="edit" color="blue"/>
                </TouchableOpacity>) : null}
                {role === "admin" ? (<TouchableOpacity onPress={() => createTwoButtonAlert(_id)}>
                    <Feather size={30} name="trash" color="red"/>
                </TouchableOpacity>) : null }
            </View>
            </View>
        </View>
    )
}

export default TaskItem

const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: "#FFF",
      borderRadius: 10,
      marginVertical: 10,
      marginHorizontal: 5,
      borderWidth: 2
    },
    titleText: {
      fontWeight: "bold",
      fontSize: 20
    },
    bodyText: {
      color: "gray",
      paddingVertical: 15
    }
  });