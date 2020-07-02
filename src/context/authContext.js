import createDataContext from './createDataContext'
import userAPI from '../api/task'
import { AsyncStorage } from 'react-native'
import { navigate } from "../navigationRef";


const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload}
        case "signin":
            return {errorMessage: '', token: action.payload.token, role: action.payload.role}
        case "clear_error_msg":
            return {...state, errorMessage: ''}
        case 'signout':
            return {token: null, errorMessage: '', role: null}
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
        console.log(token)
        if (token && role) {
            dispatch({type: 'signin', payload: {token, role}})
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
            console.log("H")
            await AsyncStorage.setItem('token', res.data.token)
            res.data.isAdmin === true ? await AsyncStorage.setItem('role', 'admin') : await AsyncStorage.setItem('role', 'user')
            dispatch({type: 'signin', payload: {token: res.data.token, role: (res.data.isAdmin === true ? 'admin' : 'user')}})

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


            dispatch({type: 'signin', payload: {token: res.data.token, role: (res.data.isAdmin === true ? 'admin' : 'user')}})
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
        dispatch({type: 'signout'})
        navigate('loginFlow')
    }
}



export const {Provider, Context} = createDataContext(
    authReducer,
    {signup, signin, clearErrorMessage, tryLocalSignIn, signout},
    { token: null, errorMessage: '',role: null}
)