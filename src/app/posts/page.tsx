"use client"
import { PostsI } from '@/interfaces/Posts';
import { getAllPosts } from '@/library/redux/postsSlice';
import { Container, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../_components/Post';
import { AppDispatch, RootState } from '@/library/redux/store';

export default function Posts() {
    const dispatch = useDispatch<AppDispatch>()
    const { posts }: { posts: PostsI[] } = useSelector((state: RootState) => state.posts)
    console.log(posts);

    useEffect(() => { 
        dispatch(getAllPosts()) 
    }, [])
    return (
        <Container maxWidth="sm">
            <Typography variant='h5' color='initial'>Posts</Typography>
            <Stack spacing={3} marginTop={3}>
                {posts.map((post)=>(
                    <Post post={post} commentLimit={1} key={post._id}/>
                ))}
            </Stack>
        </Container>
    )
};
