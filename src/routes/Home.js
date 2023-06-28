import { db, firestoreInstance } from "dbFirebase";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);
    useEffect(() => {
        getTweets();
    }, [])
    const getTweets = async () => {
        const dbTweets = await firestoreInstance.getDocs(firestoreInstance.collection(db, 'tweets'));
        dbTweets.forEach((document) => {
            console.log(document)
            const tweetObject = {
                ...document.data(),
                id: document.id,
            }
            setTweets((prev) => [tweetObject, ...prev]);
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        await firestoreInstance.addDoc(firestoreInstance.collection(db, 'tweets'), {
            tweet,
            createdAt: Date.now(),
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
                    <div key={tweet.id}>
                        <h4>{tweet.tweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home