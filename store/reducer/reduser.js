import { combineReducers } from "@reduxjs/toolkit";
import { reducerUser } from "../slices/Slice";
import postReduser from "../slices/PostsSlice";


const rootReducer = combineReducers ({
    users: reducerUser,
    posts: postReduser
})

export default rootReducer;

