import { createSlice } from "@reduxjs/toolkit";
import postThunk from "../thunk/postThunk";



const PostsSlice = createSlice({
    name: "posts",
    initialState: {
        postsItems: [],
        status: "idle",
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(postThunk.pending, state => {
            state.status = "loading";
        }).addCase(postThunk.fulfilled, (state, {payload}) => {
            state.status = 'succeeded';
            state.postsItems = payload;
        }).addCase(postThunk.rejected, (state, {payload}) => {
            state.status = 'failed';
            state.error = payload;
        })
    }
})

const postReduser = PostsSlice.reducer;

export default postReduser;