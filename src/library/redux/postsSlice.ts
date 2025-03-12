import axios from 'axios';
import { PostsSliceInitState } from './../../interfaces/PostsSliceInitState';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
    try {
        const response = await axios.get("https://linked-posts.routemisr.com/posts?limit=50", {
            headers: {
                token: Cookies.get("token")
            }
        })
        return response.data.posts
    } catch (error) {
        
    }
})
const initialState:PostsSliceInitState = {
    posts: []
}

const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(getAllPosts.fulfilled, (state, action) =>{
            state.posts = action.payload
        })
    },
});

export const postsReducer = postsSlice.reducer;