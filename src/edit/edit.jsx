import React from 'react';
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";

import './edit.css'

export function Edit() {
    const [jokeText, setJokeText] = useState('');
    const [chapterTitle, setChapterTitle] = React.useState('');
    const [chapterText, setChapterText] = React.useState('');

    const { connectionId } = useParams()

    
    useEffect(() => {
        getNewJoke();
      }, []);

    const navigate = useNavigate();

    async function getNewJoke() {

        console.log("Before")
        const response = await fetch("/api/joke", {
            method: 'get',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        console.log("Continue")


        if (response.ok) {  // Check if the status is OK
            
            console.log("worked")
            let jsonResponse = await response.json();
            setJokeText(jsonResponse.joke);
        } else {
            console.error('Failed to fetch joke:', response.status, response.statusText);
        }
    }

    async function submitChapter() {

        const response = await fetch('/api/story/submitchapter', {
            method: 'post',
            body: JSON.stringify({ chapterTitle: chapterTitle, chapterText: chapterText, proposedConnection: connectionId}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if(response?.status === 200) {
            navigate('/story');
        }
    }

    const handleNavigation = () => {
        navigate('/story');
    }

    return (
      <>
        <h1 className="pt-3">Edit Mode</h1>
        
        <div className="row justify-content-start pt-5">
            <div className="input-group mb-3">
                <input id="chapterTitle" onChange={(e) => setChapterTitle(e.target.value)} type="text" className="form-control" placeholder="Choice Text" aria-label="Chapter Title" aria-describedby="basic-addon1"/>
            </div>
        </div>

        <div className="row justify-content-start py-2">
            <div id="story" className="input-group">
                <textarea id="chapterText" onChange={(e) => setChapterText(e.target.value)}  className="form-control" aria-label="With textarea" placeholder="Continue the story here..."></textarea>
            </div>
        </div>

        <button className="btn btn-lg btn-secondary btn-block my-3" onClick={submitChapter}>Submit for Approval</button>

        <div className="mt-4">
            Here's a funny joke for inspiration!
            <div id="joke" className="bg-light text-dark">{jokeText}</div>
            <button className="btn btn-lg btn-secondary btn-block my-3" onClick={async () => getNewJoke()}>Get New Joke</button>

        </div>
      </>
    );
}