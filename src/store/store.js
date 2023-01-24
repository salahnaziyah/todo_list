import { configureStore } from "@reduxjs/toolkit"
import todoReducer from 'todo_list/todoSlice'

export const store=configureStore({
    reducer:{
        todo:todoReducer,
    },
})