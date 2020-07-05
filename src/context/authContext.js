import createDataContext from './createDataContext'
import userAPI from '../api/task'
import { AsyncStorage } from 'react-native'
import { navigate } from "../navigationRef";


const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload}
        case "signin":
            return {errorMessage: '', token: action.payload.token, role: action.payload.role, userId: action.payload.userId}
        case "clear_error_msg":
            return {...state, errorMessage: ''}
        case 'signout':
            return {token: null, errorMessage: '', role: null, userId: null}
        default:
            return state
    }
}

const clearErrorMessage = dispatch => {
    return ()=>{ dispatch({type: 'clear_error_msg'})}
}



const tryLocalSignIn = dispatch => {
    return async ()=>{
        const token = await AsyncStorage.getItem('token')
        const role = await AsyncStorage.getItem('role')
        const id = await AsyncStorage.getItem('userId')
        console.log(id)
        if (token && role && id) {
            dispatch({type: 'signin', payload: {token, role, userId: id}})
            navigate('mainFlow')
        } else {
            navigate('Signin')
        }
    }
}

const signup = dispatch => {
    return async ({username, password, fullName, role, gender, age}) => {
        try {
            const res = await userAPI.post('/signup', {username, password, isAdmin: role, fullName, age, isMale: gender})
            await AsyncStorage.setItem('token', res.data.token)
            res.data.isAdmin === true ? await AsyncStorage.setItem('role', 'admin') : await AsyncStorage.setItem('role', 'user')
            await AsyncStorage.setItem('userId', res.data.userId)
            dispatch({type: 'signin', payload: {token: res.data.token, role: (res.data.isAdmin === true ? 'admin' : 'user'), userId: res.data.userId}})

            navigate('TaskList')
        }catch(err){
            dispatch({type: 'add_error', payload: 'Something went wrong with sign up'})
        }
    }
}
const signin = dispatch => {
    return async ({username, password}) => {
        try {
            const res = await userAPI.post('/signin', {username, password})
            console.log(res)
            await AsyncStorage.setItem('token', res.data.token)

            res.data.isAdmin === true ? await AsyncStorage.setItem('role', 'admin') : await AsyncStorage.setItem('role', 'user')
            await AsyncStorage.setItem('userId', res.data.userId)


            dispatch({type: 'signin', payload: {token: res.data.token, role: (res.data.isAdmin === true ? 'admin' : 'user'), userId: res.data.userId}})
            navigate('TaskList')
        }catch(err){
            dispatch({type: 'add_error', payload: 'Something went wrong with sign in'})
        }
    }
}

const signout = dispatch => {
    return async () => {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('role')
        await AsyncStorage.removeItem('userId')
        dispatch({type: 'signout'})
        navigate('loginFlow')
    }
}



export const {Provider, Context} = createDataContext(
    authReducer,
    {signup, signin, clearErrorMessage, tryLocalSignIn, signout},
    { token: null, errorMessage: '',role: null, userId: null}
)