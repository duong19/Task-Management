import createDataContext from './createDataContext'
import phaseAPI from '../api/task'
import { AsyncStorage } from 'react-native'
import { navigate } from "../navigationRef";


const phaseReducer = (state, action) => {
    switch (action.type) {
        case 'create_phase':
            return {phases: [...state.phases, action.payload]}
        case 'get_phases':
            return {phases: action.payload}
        case 'get_phases_user':
            return {phases: action.payload}
        case 'delete_phase':
            return {phases: state.phases.filter(phase => phase._id !== action.payload)}
        case 'update_phase':
            return {phases: state.phases.map(phase => phase._id === action.payload._id ? action.payload : phase)}
        default:
            return state
    }
}

const deletePhase = dispatch => {
    return async (taskId) => {
        try {
            const res = await phaseAPI.delete(`/phases/${taskId}`)
            dispatch({type: 'delete_phase', payload: taskId})
        }catch(err){
            console.log(err)
        }
    }
}

const createPhase = dispatch => {
    return async ({taskId, name, description, userId}) => {
        try {
            const res = await phaseAPI.post('/phases', {name, description, taskId, userId})
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
const getPhasesByUser = dispatch => {
    return async (userId) => {
        try {
        const res = await phaseAPI.get(`/phases?userId=${userId}`)
        dispatch({type: 'get_phases_user', payload: res.data})
        }catch (err){
            console.log(err)
        }
    }
}
const updatePhase = dispatch => {
    return async ({phaseId, name, description, isFinished, userId, taskId}) => {
        try {
        const res = await phaseAPI.put(`/phases/${phaseId}`, { name, description, isFinished, userId, taskId})
        dispatch({type: 'update_phase', payload: res.data})
        }catch (err){
            console.log(err)
        }

    }
}

export const {Provider, Context} = createDataContext(
    phaseReducer,
    {getPhases, createPhase, deletePhase, updatePhase, getPhasesByUser},
    {phases: []}
)