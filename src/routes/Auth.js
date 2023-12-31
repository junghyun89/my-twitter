import React, { useState } from "react";
import { authService, firebaseInstance } from "dbFirebase";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');
    
    const onChange = (e) => {
        const {target: { name, value }} = e;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (newAccount) {
                await firebaseInstance.createUserWithEmailAndPassword(authService, email, password);
            } else {
               await firebaseInstance.signInWithEmailAndPassword(authService, email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    }

    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = async (e) => {
        const {target: { name }} = e;
        let provider;
        if (name === 'google') {
            provider = new firebaseInstance.GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new firebaseInstance.GithubAuthProvider();
        }
        await firebaseInstance.signInWithPopup(authService, provider);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="Email" required value={email} name="email" onChange={onChange} />
                <input type="password" placeholder="Password" required value={password} name="password" onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? 'Sign In' : 'Create Account'}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth