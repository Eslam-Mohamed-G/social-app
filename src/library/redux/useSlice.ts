import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    dateOfBirth: number;
    gender: string
}
const initialState: UserState = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    dateOfBirth: 0,
    gender: ""
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.rePassword = action.payload.rePassword;
            state.dateOfBirth = action.payload.dateOfBirth;
            state.gender = action.payload.gender;
        },
    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;