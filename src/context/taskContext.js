import createDataContext from './createDataContext'
import  taskAPI from '../api/task'
import { navigate } from "../navigationRef";


const taskReducer = (state, action) => {
    switch (action.type) {
        case 'list_task':
            return {tasks: action.payload}
        case 'create_task':
            return {tasks: [...state.tasks, action.payload]}
        case 'delete_task':
            return {tasks: state.tasks.filter((task) => task._id !== action.payload)}
        case 'update_task':
            return {tasks: state.tasks.map((task) => task._id === action.payload._id ? action.payload : task )}
        default:
            return state
    }
}

const getTask = dispatch => {
    return async () => {
        try{
            const res = await taskAPI.get('/tasks')
            dispatch({type: 'list_task', payload: res.data})
        }catch(err){
            console.log(err)
        }
        
    }
}

const createTask = dispatch => {
    return async ({name, description}) => {
        const res = await taskAPI.post('/tasks', {name, description})
        console.log(res.data)
        dispatch({type: 'create_task', payload: res.data})
        navigate('TaskList')
    }
}
const deleteTask = dispatch => {
    return async (_id) => {
        const res = await taskAPI.delete(`/tasks/${_id}`)
        console.log(res.data)
        dispatch({type: 'delete_task', payload: _id})
    }
}

const editTask = dispatch => {
    return async ({_id, name, description, isFinished}) => {
        const res = await taskAPI.put(`/tasks/${_id}`, { name, description, isFinished})
        console.log(res.data)
        dispatch({type: 'update_task', payload: res.data})
        navigate('TaskList')

    }
}

export const {Provider, Context} = createDataContext(
    taskReducer,
    {getTask, createTask, deleteTask, editTask},
    {tasks: []}
)
