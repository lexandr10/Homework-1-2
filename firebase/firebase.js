import { collection, addDoc, doc, setDoc,query, where, getDocs,arrayUnion, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, Timestamp } from "firebase/storage";
import { db, storage } from "../config";


export const addUser = async(userId, userData) => {
try {
    const docRef = await addDoc(collection(db, "users"), userData);
} catch (error) {
    throw error
}
}

export const uploadImage = async (userId, file, postData) => {
    try {
        const uniqueId = new Date().getTime();
        const imageRef = ref(storage, `postsPhotos/${userId}/${uniqueId}_postPhoto.jpg`);
        await uploadBytes(imageRef, file);

        const imageURL = await getDownloadURL(imageRef);

        const postRef = doc(collection(db, "posts"));
        await setDoc(postRef, {
       name: postData.name,
       location: postData.location,
       userId: userId,
       imageURL: imageURL,
       coordinates: {
       latitude: postData.locationPhoto.latitude,
       longitude: postData.locationPhoto.longitude
       },
       likes: 0,
       comments: [],
       id: postRef.id
        })
        return postRef.id;
    } catch (error) {
        throw error
    }
}

export const getUserPosts = async (userId) => {
    try {
        const postsRef = await collection(db, "posts");
        const q = query(postsRef, where("userId", "==", userId));
        const snapshot = await getDocs(q);

        const userPosts = snapshot.docs.map((doc) => 
            ({
                id: doc.id, 
                ...doc.data() 
                
            }))
            return userPosts;
    } catch (error) {
        throw error
    }
}

export const addComment = async (postId, comment) => {
try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
        comments: arrayUnion({
            userId: comment.userId,
            text: comment.text,
          })
    })
    console.log("Comment added to post:", postId);
} catch (error) {
    throw error;
}
}