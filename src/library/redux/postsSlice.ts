import { PostsSliceInitState } from './../../interfaces/PostsSliceInitState';
import { createSlice } from "@reduxjs/toolkit";

const initialState:PostsSliceInitState = {
    posts: []
}
createSlice({
    name:'posts',
    initialState,
    reducers:{},
    extraReducers(builder) {
        
    },
})