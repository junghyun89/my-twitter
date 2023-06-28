import { authService, firebaseInstance } from "dbFirebase";
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const onLogOutClick = async () => {
        await firebaseInstance.signOut(authService);
        navigate('/');
    }

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}
export default Profile