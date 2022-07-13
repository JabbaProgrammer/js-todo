import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { myNotification } from '../../services/service';
import * as TaskService from '../../services/TaskService'

const initialState = {
    elements: []
}

export const getTasks = createAsyncThunk(
    '',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await TaskService.getAllTasks(payload.id);
            return data;
        }
        catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const addTask = createAsyncThunk(
    '/create',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await TaskService.createTask(payload);
            return data;
        }
        catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const completeTask = createAsyncThunk(
    '/complete',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await TaskService.completeTask(payload);
            return data;
        }
        catch (error) {
            return rejectWithValue(error)
        }
    }
)



export const taskSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        clearStorage: (state) => {
            state.elements = []
        }
    },
    extraReducers: {
        ///////////////////////////////////////////////
        [getTasks.fulfilled]: (state, action) => {
            state.elements = action.payload;
        },
        [getTasks.rejected]: (state, action) => {
            myNotification(`${action.payload.response.data}`)
        },
        ///////////////////////////////////////////////
        [addTask.fulfilled]: (state, action) => {
            state.elements.push(action.payload);
            myNotification('Task added')
        },
        [addTask.rejected]: (state, action) => {
            myNotification(`${action.payload.response.data}` || 'Something went wrong')
        },
        ///////////////////////////////////////////////
        [completeTask.fulfilled]: (state, action) => {
            state.elements.map((t) => {
                if(t.id === action.payload.id){
                    t.complete = action.payload.complete
                }
                return 0;
            });
        },
        [completeTask.rejected]: (state, action) => {
            myNotification('Something went wrong')
        }
        ///////////////////////////////////////////////
    }
})

export const {clearStorage} = taskSlice.actions;

export default taskSlice.reducer;