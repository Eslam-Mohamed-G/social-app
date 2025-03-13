import { PostsI } from './Posts';
export interface PostsSliceInitState{
    posts: PostsI[],
    post: PostsI | null
}