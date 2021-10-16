import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from './../Pages/Login/Firebase/firebase.init';

initializeAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth();

    const signInUsingGoole = () => {
        setIsLoading(true);
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
        .then(result => {
            setUser(result.user);
        })
        .finally(() => setIsLoading(false));
    }

    // observe user state change
    useEffect( () => {
        const unsubcribed = onAuthStateChanged(auth, user => {
            if(user){
                setUser(user);
            }
            else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubcribed;

    }, [])

    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
        .then(() => {})
        .finally (() => setIsLoading(false));
    }


    return {
        user,
        isLoading,
        signInUsingGoole,
        logOut
    }
}

export default useFirebase;