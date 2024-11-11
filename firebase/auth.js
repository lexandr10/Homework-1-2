import { getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    updateProffile, 
    signOut } from 'firebase/auth';
    import { doc, getDoc, } from "firebase/firestore";
import { auth } from '../config';
import { clearInfo, setUser } from '../store/slices/Slice';
import { addUser } from './firebase';

export const registerDB = async(data) => {
try {
    const credentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = credentials.user;
   await addUser(user.uid, {uid: user.uid,email: user.email, displayName: data.login })
} catch (error) {
    throw error;
}
}

export const authStateChanged = async (dispatch) => {
 onAuthStateChanged(auth, (user) => {
    if(user) {
        dispatch(setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
        }))
    }else {
        dispatch(clearInfo());
    }
})
}

export const loginDB = async ({email, password}, dispatch) => {
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        const user = credentials.user;
        const userDocRef = await doc(db, "users", credentials.user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            const userData = userDoc.data();
            dispatch(setUser({
                uid: user.uid,
                email: user.email,
                displayName: userData.displayName 
            }));
        } else {
            console.log("Документ пользователя не найден в Firestore.");
        }
    } catch (error) {
        throw error;
    }
}
export const logoutDB = async (dispatch) => {
    try {
        await signOut(auth);
        dispatch(clearInfo());
    } catch (error) {
        throw error
    }
}