import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
    },
    reducers:{
        _setUser:(state,action)=>{
            state.user = action.payload;
        },
    }
})

export const { _setUser } = userSlice.actions;

export default userSlice.reducer;