import React, { useContext } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import InfoListField from "./InfoListField";
import { Context as DepartmentContext } from "../context/departmentContext";
import { Context as UserContext } from "../context/userContext";
const UserItem = props => {
    const {name, department, isMale, _id} = props
    const {state: {departments}, getDepartment} = useContext(DepartmentContext)
    const {deleteUser} = useContext(UserContext)
    const departmentName = departments.find(item => item._id === department).name

    return (
        <View style={styles.cardContainer}>
            <View style={{flexDirection: 'row', margin: 15}}>
            <Image source={isMale ? require('../../assets/user_male.png') : require('../../assets/user_female.png')} style={{width: 50,height: 50,resizeMode: 'contain'}}/>  
            <View>
                <InfoListField label='Full Name' data={name}/>
                <InfoListField label='Department' data={departmentName}/>
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
export default UserItem