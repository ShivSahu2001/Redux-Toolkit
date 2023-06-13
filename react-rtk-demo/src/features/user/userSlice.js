// const createSlice = require("@reduxjs/toolkit").createSlice
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
// const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk
import axios from "axios"
// const axios = require("axios")

const initialState = {
    loading: false,
    users: [],
    error: "",
}

// Generates pending, fulfilled and rejected action types
export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
  return  axios.get("https://jsonplaceholder.typicode.com/users1")
    .then(response => response.data)
    // we dont need catch block error is handled
})

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchUsers.pending, state => {
            state.loading = true


        })
        builder.addCase(fetchUsers.fulfilled, (state,action) => {
            state.loading = false,
            state.users = action.payload,
            state.error = ""
        })
        builder.addCase(fetchUsers.rejected,(state, action) => {
            state.loading = false,
            state.users = [],
            state.error = action.error.message
        })
    }
})

export default  userSlice.reducer