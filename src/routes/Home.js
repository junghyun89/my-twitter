import Tweet from "components/tweet";
import { db, firestoreInstance } from "dbFirebase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);
    useEffect(() => {
        const q = firestoreInstance.query(firestoreInstance.collection(db, 'tweets'));
        firestoreInstance.onSnapshot(q, (snapshot) => {
            const array = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(array);
        })
    }, [])
    const onSubmit = async (e) => {
        e.preventDefault();
        await firestoreInstance.addDoc(firestoreInstance.collection(db, 'tweets'), {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid
        })
        setTweet('');
    }
    const onChange = (e) => {
        const {target : { value }} = e;
        setTweet(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={tweet} placeholder="What's on your mind?" maxLength={120} onChange={onChange} />    
                <input type="submit" value="Tweet" />
            </form>
            <div>
                {tweets.map(tweet => (
                    <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    )
}

export default Home