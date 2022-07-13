import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as AuthService from '../../services/AuthService' 
import { myNotification } from '../../services/service';

const initialState = {
    logged: false,
    loading: false,
    email: null,
    id: null
}

export const registration = createAsyncThunk(
    '/registration',
    async (payload, { rejectWithValue }) => {
        try{
            const response = await AuthService.registration(payload.email, payload.password);
            return response;
        }
        catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const login = createAsyncThunk(
    '/login',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await AuthService.login(payload.email, payload.password);
            return response;
        }
        catch (error){
            return rejectWithValue(error)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.logged = false
            state.loading = false
            state.email = null
            state.id = null
            localStorage.removeItem('token');
            myNotification('You logged out')
        }
    },
    extraReducers: {
        ///////////////////////////////////////////////
        [registration.pending]: (state) => {
            
        },
        [registration.fulfilled]: (state, action) => {
            localStorage.setItem('token', action.payload.tokens.accessToken);
            state.email = action.payload.user.email;
            state.id = action.payload.user.id;
            myNotification(`Registration complete`)
        },
        [registration.rejected]: (state, action) => {
            myNotification(`${action.payload.response.data || 'Network error'}`)
        },
        ///////////////////////////////////////////////
        [login.pending]: (state) => {
        },
        [login.fulfilled]: (state, action) => {
            localStorage.setItem('token', action.payload.tokens.accessToken);
            state.logged = true;
            state.email = action.payload.user.email;
            state.id = action.payload.user.id;
            myNotification(`You logged in as ${state.email}`)
        },
        [login.rejected]: (state, action) => {
            myNotification(`${action.payload.response.data || 'Network error'}`)
        },
    }
})

export const {logout} = userSlice.actions

export default userSlice.reducer;