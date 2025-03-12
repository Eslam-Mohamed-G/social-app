import { postsReducer } from './postsSlice';
import userReducer from "./userSlice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore ({
    reducer:{
        user: userReducer,
        posts: postsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;