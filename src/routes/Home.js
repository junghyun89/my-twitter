import Tweet from "components/tweet";
import { db, firestoreInstance, storageInstance } from "dbFirebase";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);
    const [attachment, setAttachment] = useState('');
    const fileInput = useRef();
    useEffect(() => {
        const q = firestoreInstance.query(firestoreInstance.collection(db, 'tweets'), firestoreInstance.orderBy('createdAt', 'desc'));
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
        let attachmentUrl = '';

        if (attachment !== '') {
            const attachmentRef = storageInstance.ref(storageInstance.getStorage(), `${userObj.uid}/${uuidv4()}`);
            await storageInstance.uploadString(attachmentRef, attachment, 'data_url');
            attachmentUrl = await storageInstance.getDownloadURL(attachmentRef);
        }
        
        const tweetObj = {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        }
        await firestoreInstance.addDoc(firestoreInstance.collection(db, 'tweets'), tweetObj)
        setTweet('');
        fileInput.current.value = null;
        setAttachment('');
    }
    const onChange = (e) => {
        const {target : { value }} = e;
        setTweet(value);
    }
    const onFileChange = (e) => {
        const {target: { files }} = e;
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: { result }} = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(file);
    }
    const onClearAttachment = () => {
        setAttachment('');
        fileInput.current.value = null;
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={tweet} placeholder="What's on your mind?" maxLength={120} onChange={onChange} />    
                <input type="file" accept="image/*" onChange={onFileChange} ref={fileInput} />
                <input type="submit" value="Tweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width='50px' height='50px' alt="preview" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
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