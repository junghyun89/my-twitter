import { db, firestoreInstance } from "dbFirebase";
import React, { useState } from "react";

const Tweet = ({ tweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this tweet?");
        if (ok) {
            await firestoreInstance.deleteDoc(firestoreInstance.doc(db, `tweets/${tweetObj.id}`));
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (e) => {
        e.preventDefault();
        await firestoreInstance.updateDoc(firestoreInstance.doc(db, `tweets/${tweetObj.id}`), {
            text: newTweet,
        })
        setEditing(false);
    }
    const onChange = (e) => {
        const {target: { value }} = e;
        setNewTweet(value);
    }

    return (
        <div>
        {editing ? (
            <>
               {isOwner && (
                    <>
                        <form onSubmit={onSubmit}>
                            <input type="text" placeholder="Edit your tweet" value={newTweet} required onChange={onChange} />
                            <input type="submit" value="Update Tweet" />
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </>
               )}
            </>
        ) : (
            <>
                <h4>{tweetObj.text}</h4>
                {isOwner && (
                    <>
                        <button onClick={onDeleteClick}>Delete</button>
                        <button onClick={toggleEditing}>Edit</button>
                    </>
                )}
            </>
        )}
    </div>
    )
}

export default Tweet