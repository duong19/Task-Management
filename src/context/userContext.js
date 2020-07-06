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
            console.log(res.data)
            dispatch({type: 'list_user', payload: res.data})
        }catch (err) {
            console.log(err)
        }
    }
}





export const {Provider, Context} = createDataContext(
    userReducer,
    {getUser, getUserList},
    {user: null, userList: []}
)