"use client"
import Post from '@/app/_components/Post';
import { getSinglePost } from '@/library/redux/postsSlice';
import { AppDispatch, RootState } from '@/library/redux/store';
import { Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function PostDetails(props: any) {
  const { post } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    props.params.then(({ id }: any) => {
      dispatch(getSinglePost(id))
      console.log(id);
    })
  }, []);
  return (
    <Container maxWidth="sm">
      { post?<Post post = { post }/>: <Typography>loading</Typography>}
    </Container>
  )
}
