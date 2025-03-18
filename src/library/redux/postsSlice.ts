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
});

export const getSinglePost = createAsyncThunk("posts/getSinglePost", async (postId: string) => {
    try {
        const response = await axios.get("https://linked-posts.routemisr.com/posts/"+ postId, {
            headers: {
                token: Cookies.get("token")
            }
        })
        return response.data.post
    } catch (error) {
        
    }
});
const initialState:PostsSliceInitState = {
    posts: [],
    post: null,
    postIsLoading: true,
}

const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(getAllPosts.fulfilled, (state, action) =>{
            state.posts = action.payload
        })
        builder.addCase(getSinglePost.fulfilled, (state, action) =>{
            state.post = action.payload
            state.postIsLoading = false
        })
        builder.addCase(getSinglePost.pending, (state, action) =>{
            if(state.post?._id != action.meta.arg){
                state.postIsLoading = true
            }
        })
        builder.addCase(getSinglePost.rejected, (state, action) =>{
            state.postIsLoading = false
        })
    },
});

export const postsReducer = postsSlice.reducer;