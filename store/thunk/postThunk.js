import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserPosts } from "../../firebase/firebase";

const postThunk = createAsyncThunk("postsUser", async(userId, {rejectWithValue}) => {
    try {
        const posts = await getUserPosts(userId);
        return posts;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

export default postThunk;

getUserPosts("NJAPZXdxWTST0pQvN8iF3vMrwO03")
  .then((result) => {
    console.log("Result", result);
  })
  .catch((error) => {
    console.error("Error fetching posts:", error);
  });