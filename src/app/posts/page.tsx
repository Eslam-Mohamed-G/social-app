"use client"
import { PostsI } from '@/interfaces/Posts';
import { getAllPosts } from '@/library/redux/postsSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Posts() {
    const dispatch = useDispatch<any>()
    const { posts }: { posts: PostsI[] } = useSelector((state: any) => state.posts)
    console.log(posts);

    useEffect(() => { 
        dispatch(getAllPosts()) 
    }, [])
    return (
        <div>
            postes
        </div>
    )
};
