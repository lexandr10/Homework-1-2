import { createSlice } from "@reduxjs/toolkit";

const sliceUser = createSlice({
    name: "users",
    initialState: {userInfo: null},
    reducers: {
        setUser: (state, {payload}) => {
    state.userInfo = {...payload}
        },
        update: (state, {payload}) => {
    state.userInfo = {...state.userInfo, ...payload};
        },
        clearInfo: (state) => {
            state.userInfo = null
        }
    }
    
})

export const {setUser, update, clearInfo} = sliceUser.actions;
export const reducerUser = sliceUser.reducer;