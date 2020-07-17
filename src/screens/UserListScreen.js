import React, { useContext, useEffect, useState } from "react"
import {View, Text, Picker, StyleSheet, TouchableOpacity, Image, Button, ScrollView, FlatList, TextInput} from 'react-native'
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Context as UserContext } from "../context/userContext";
import { Context as DepartmentContext } from "../context/departmentContext";
import InputField from '../components/InputField'
import {Input, SearchBar } from 'react-native-elements';
import UserItem from '../components/UserItem'
import Feather from "@expo/vector-icons/Feather";


const UserListScreen = ({navigation}) => {
    const {state: {userList}, getUserList} = useContext(UserContext)
    const {state: {departments}, getDepartment} = useContext(DepartmentContext)

    const [textInput, setTextInput] = useState('')
    const [department, setDepartment] = useState('')

    return (
        <View style={styles.container}>
        <NavigationEvents onWillFocus={() => {getUserList() 
        getDepartment()}}/>
        <View style={{flexDirection: 'column'}}>
        
            {/* <SearchBar
    value={textInput}
    onChangeText={(searchInput) => setTextInput(searchInput)}
    inputStyle={{backgroundColor: 'white'}} inputContainerStyle={{backgroundColor:"white"}}
    containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
    placeholder={'Search'}/> */}
    <View style={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5, flexDirection: 'row', marginHorizontal: 10}}>
        <Feather name="search" size={20} style={{margin: 15}}/>
        <TextInput value={textInput} onChangeText={(searchInput) => setTextInput(searchInput)} placeholder={'Search'} style={{ paddingVertical: 10, flex: 1}}/>
    </View>
    
        <View style={{ height: 50,  borderRadius: 5, borderWidth: 1,  margin: 10 }}>
        <Picker 
            selectedValue={department}
            style={{ height: 50,  borderRadius: 5, borderWidth: 4, borderColor: "rgba(172,172,172,0.7)" }}
            onValueChange={(itemValue, itemIndex) => { 
            setDepartment(itemValue)}}>
            <Picker.Item label='Select department' value='' />
            {departments !== [] ? (departments.map(dep => {return <Picker.Item label={dep.name} value={dep._id} key={dep._id}/>})) : (<Picker.Item label='Select department' value='' />
    )}
        </Picker>
        </View>
        </View>
        <FlatList
                data={department === '' ? (
                    textInput !== '' ?  userList.filter(item => item.fullName.includes(textInput)) : userList
                 ) : (
                    textInput !== '' ?  userList.filter(item => item.department === department).filter(item => item.name.includes(textInput)) : userList.filter(item => item.department === department)
                )
                }
                // data={state.tasks}
                style={{height: 470}}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item._id}
                renderItem={({item}) => {
                    return (
                    <TouchableOpacity onPress={() => {navigation.navigate('UserListInfo', {userId: item._id})}}>
                        <UserItem name={item.fullName} _id={item._id} department={item.department} isMale={item.isMale} age={item.age} />
                    </TouchableOpacity>)
                }} />
        
        </View>
    )




}
const styles = StyleSheet.create({
    container: {
        margin: 20,
        flexDirection: 'column'
    }
})
UserListScreen.navigationOptions = ({navigation}) => {
    return {
        title: `Employee list`
    }
}
export default UserListScreen