import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import userService from "./service";

const initialState = {
    loginData: {
        status : "init",
        error : "",
        data :[]
    }
}

export const loginUser = createAsyncThunk(
    "users/loginUser",
    async (data, {rejectWithValue}) =>{
        try {
            const response = await userService.LoginUser(data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error?.message);
        }
    }
);

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
            .addCase(loginUser.pending, (state) =>{
                state.loginData.status = "pending",
                state.loginData.error = "";
            })
            .addCase(loginUser.fulfilled, (state, action) =>{
                state.loginData.status = "idle",
                state.loginData.error = "";
                state.loginData.data = action.payload || []
            })
            .addCase(loginUser.rejected, (state, action) =>{
                state.loginData.status = "rejected",
                state.loginData.error = action.payload;
                state.loginData.data = [];
            })
    }
});

export const {} = userSlice.actions;
export default userSlice.reducer;