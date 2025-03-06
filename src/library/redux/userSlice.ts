import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserState {
    userToken: null | string,
    isError: boolean,
    isLoading: boolean,
    error: null | string,
    useData: null | string
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
    userToken: null,
    isError: false,
    isLoading: false,
    error: null,
    useData: null
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: (state, action: PayloadAction<UserState>) => {
            state.userToken = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getLogin.pending, (state, action) => {
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(getLogin.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
        })
        builder.addCase(getLogin.rejected, (state, action) => {
            state.isLoading = false
            state.isError = false
        })
    }
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;