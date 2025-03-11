import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
interface UserState {
    isLoggedIn : boolean,
};

export const getLogin = createAsyncThunk(
    'userSlice/getLogin',
    async (formData: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post("https://linked-posts.routemisr.com/users/signin", formData)
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(error.response?.data || "Login failed");
        };
    });

const initialState: UserState = {
    isLoggedIn: !!Cookies.get("token"),
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserIsLoggedIn: (state, action) =>{
            state.isLoggedIn = action.payload
        }
    },
});

export const { setUserIsLoggedIn } = userSlice.actions;
export default userSlice.reducer;