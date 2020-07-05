import createDataContext from './createDataContext'
import userAPI from '../api/task'
import { AsyncStorage } from 'react-native'
import { navigate } from "../navigationRef";

const userReducer = (state, action) => {
    switch (action.type) {
        case 'get_user':
            return {user: action.payload}
        default:
            return state
    }
}

const getUser = dispatch => {
    return async ()=>{
        const id = await AsyncStorage.getItem('userId')
        const res = await userAPI.get(`/users/${id}`)
        console.log(res.data)
        dispatch({type: 'get_user', payload: res.data})
    }
}






export const {Provider, Context} = createDataContext(
    userReducer,
    {getUser},
    {user: null}
)