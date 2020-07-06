import createDataContext from './createDataContext'
import departmentAPI from '../api/task'
import { AsyncStorage } from 'react-native'
import { navigate } from "../navigationRef"


const departmentReducer = (state, action) => {
    switch (action.type) {
        case 'get':
            return {departments: action.payload}
        default:
            return state
    }
}

const getDepartment = dispatch => {
    return async () => {
        try {
            const res = await departmentAPI.get('/departments')
            dispatch({type: 'get', payload: res.data})
        }catch (err) {
            console.log(err)
        }
    }
}

export const {Provider, Context} = createDataContext(
    departmentReducer,
    {getDepartment},
    {departments: []}
)