import { db, firestoreInstance } from "dbFirebase";
import React from "react";

const Tweet = ({ tweetObj, isOwner }) => {
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this tweet?");
        if (ok) {
            await firestoreInstance.deleteDoc(firestoreInstance.doc(db, `tweets/${tweetObj.id}`));
        }
    }
    return (
        <div>
        <h4>{tweetObj.text}</h4>
        {isOwner && <>
            <button onClick={onDeleteClick}>Delete</button>
            <button>Edit</button>
        </>}
    </div>
    )
}

export default Tweet