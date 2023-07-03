import { authService, db, firebaseInstance, firestoreInstance } from "dbFirebase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const navigate = useNavigate();
    const onLogOutClick = async () => {
        await firebaseInstance.signOut(authService);
        navigate('/');
    }
    useEffect(() => {
        getMyTweets();
    })
    const getMyTweets = async () => {
        const q = firestoreInstance.query(firestoreInstance.collection(db, 'tweets'), firestoreInstance.where("creatorId", '==', userObj.uid), firestoreInstance.orderBy('createdAt', 'desc'))
        const snapshot = await firestoreInstance.getDocs(q);
        snapshot.forEach((doc) => {
            console.log(doc.data());
        })
    }
    const onChange = (e) => {
        const {target: { value }} = e;
        setNewDisplayName(value);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await firebaseInstance.updateProfile(userObj, {
                displayName: newDisplayName,
            })
        }
    }


    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Display name" onChange={onChange} value={newDisplayName} />
                <input type="submit" value="Update Profile" />

            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}
export default Profile