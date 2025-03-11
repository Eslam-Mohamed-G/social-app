import { CommentI } from './comment';
import { UserI } from './user';
export interface PostsI {
    _id: string
    body: string
    image: string
    user: UserI
    createdAt: string
    comments: CommentI[]
    id: string
}