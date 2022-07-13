import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from './features/taskSlice'
import userReducer from './features/userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        tasks: tasksSlice
    },
})