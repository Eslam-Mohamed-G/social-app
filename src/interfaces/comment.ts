import { UserI } from './user';
export interface CommentI {
    _id: string
    content?: string
    commentCreator: UserI
    post: string
    createdAt: string
}