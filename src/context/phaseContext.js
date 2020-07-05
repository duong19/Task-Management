import createDataContext from './createDataContext'
import phaseAPI from '../api/task'
import { AsyncStorage } from 'react-native'
import { navigate } from "../navigationRef";


const phaseReducer = (state, action) => {
    switch (action.type) {
        // case 'create_phase':
        //     return {phases: [...state.phases, action.payload]}
        case 'get_phases':
            return {phases: action.payload}
        default:
            return state
    }
}

const createPhase = dispatch => {
    return async ({taskId, name, description}) => {
        try {
            const res = await phaseAPI.post('/phases', {name, description, taskId})
            console.log(res.data)
            dispatch({type: 'create_phase', payload: res.data})
            navigate('PhaseList')
        }catch(err){
            console.log(err)
        }
    }
}
const getPhases = dispatch => {
    return async (taskId) => {
        try {
        const res = await phaseAPI.get(`/phases/${taskId}`)
        dispatch({type: 'get_phases', payload: res.data})
        }catch (err){
            console.log(err)
        }
    }
}


export const {Provider, Context} = createDataContext(
    phaseReducer,
    {getPhases, createPhase},
    {phases: []}
)