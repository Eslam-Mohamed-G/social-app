"use client"
import { PostsI } from '@/interfaces/Posts';
import { getAllPosts } from '@/library/redux/postsSlice';
import { Container, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../_components/Post';

export default function Posts() {
    const dispatch = useDispatch<any>()
    const { posts }: { posts: PostsI[] } = useSelector((state: any) => state.posts)
    console.log(posts);

    useEffect(() => { 
        dispatch(getAllPosts()) 
    }, [])
    return (
        <Container maxWidth="sm">
            <Typography variant='h5' color='initial'>Posts</Typography>
            <Stack spacing={3} marginTop={3}>
                {posts.map((post)=>(
                    <Post post={post} key={post._id}/>
                ))}
            </Stack>
        </Container>
    )
};
