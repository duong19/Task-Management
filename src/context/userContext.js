import createDataContext from './createDataContext'
import userAPI from '../api/task'
import { AsyncStorage } from 'react-native'
import { navigate } from "../navigationRef";

const userReducer = (state, action) => {
    switch (action.type) {
        case 'get_user':
            return {...state, user: action.payload}
        case 'list_user':
            return {...state, userList: action.payload}
        case 'update_user':
            return {user: action.payload, userList: state.userList.map(usr => usr._id === action.payload._id ? action.payload : usr)}
        case 'delete_user':
            return {...state, userList: state.userList.filter(user => user._d !== action.payload)}
        default:
            return state
    }
}

const getUser = dispatch => {
    return async ()=>{
        const id = await AsyncStorage.getItem('userId')
        const res = await userAPI.get(`/users/${id}`)
        dispatch({type: 'get_user', payload: res.data})
    }
}

const getUserList = dispatch => {
    return async ()=>{
        try {
            const res = await userAPI.get('/users')
            dispatch({type: 'list_user', payload: res.data})
        }catch (err) {
            console.log(err)
        }
    }
}

const updateUser = dispatch => {
    return async ({userId, fullName, age, isMale, department}) => {
        try {
            const res = await userAPI.put(`/users/${userId}`, {fullName, age, isMale, department})
            dispatch({type: 'update_user', payload: res.data})
            navigate('UserInfo')
        }catch (err) {
            console.log(err)
        }
    }
}
const deleteUser = dispatch => {
    return async (userId) => {
        try {
            const res = await userAPI.delete(`/users/${userId}`)
            dispatch({type: 'delete_user', payload: userId})
        }catch (err) {
            console.log(err)
        }
    }
}


export const {Provider, Context} = createDataContext(
    userReducer,
    {getUser, getUserList, updateUser, deleteUser},
    {user: null, userList: []}
)