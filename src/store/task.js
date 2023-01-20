import { createSlice } from "@reduxjs/toolkit"
import todosService from "../services/todos.service"
import { setError } from "./errors"

const initialState = {entities: [], isLoading: true}

 const taskSlice = createSlice({name: "task", initialState, reducers: {
  recived(state, action){
    state.entities = action.payload
    state.isLoading = false
  },
  update(state, action){
    const elementIndex = state.entities.findIndex(el => el.id === action.payload.id)
    state.entities[elementIndex] = {...state.entities[elementIndex], ...action.payload}},
  remove(state, action){
    state.entities = state.entities.filter(
      (el) => el.id !== action.payload.id
  );
  },
  create(state, action){
    state.entities.push({...action.payload})
    state.isLoading = false
  },
   taskReqested(state) {
    state.isLoading = true
   },
   taskReqestFailed(state) {
    state.isLoading = false
   }
 }})

 const {actions, reducer: taskReducer} = taskSlice
 const { update, remove, recived, create, taskReqested, taskReqestFailed } = actions

 export const loadTasks = () => async (dispatch) => {
  dispatch(taskReqested())
  try {
    const data = await todosService.fetch()
    dispatch(recived(data))
  } catch (error) {
    dispatch(taskReqestFailed())
    dispatch(setError(error.message))
  }
 }

 export const completeTask=(id) => (dispatch) => {
  dispatch(update({id, completed: true}))
 }

export  const titleChanged = (id) => {
  return update({id, title: `New title for task ${id}`})
}

export  const taskDeleted = (id) => {
   return remove({id})
}

export const createTask = (state) => async (dispatch) => {
  dispatch(taskReqested())
  try {
    const data = await todosService.create(state)
    dispatch(create(data))
  } catch (error) {
    dispatch(taskReqestFailed())
    dispatch(setError(error.message))
  }
 }

export const getTasks = () => (state) => state.tasks.entities
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

export default taskReducer