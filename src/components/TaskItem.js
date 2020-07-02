import React, { useContext } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context as TaskContext } from "../context/taskContext";

const TaskItem = props => {

    const {deleteTask} = useContext(TaskContext)

    const {name, description, isFinished, navigation, _id} = props
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
            <Text style={styles.bodyText}>{description}</Text>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                
                <TouchableOpacity onPress={() => navigation.navigate('TaskEdit', {_id: _id})}>
                    <Feather size={30} name="edit" color="blue"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTask(_id)}>
                    <Feather size={30} name="trash" color="red"/>
                </TouchableOpacity>
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