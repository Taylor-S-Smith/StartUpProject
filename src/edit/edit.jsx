import React from 'react';
import { useNavigate } from "react-router-dom"
import { useState } from "react";

import './edit.css'

export function Edit(connectionId) {
    const [jokeText, setJokeText] = useState(getNewJoke);
    const [chapterTitle, setChapterTitle] = React.useState('');
    const [chapterText, setChapterText] = React.useState('');

    const navigate = useNavigate();

    function getNewJoke() {
        //TODO: Connect this to external API
        console.log("Don't forget to implement this for a future pass-off!")
        return "External API Error: Not implemented Yet";
    }

    async function submitChapter() {

        const response = await fetch('api/story/submitchapter', {
            method: 'post',
            body: JSON.stringify({ chapterTitle: chapterTitle, chapterText: chapterText, proposedConnection: connectionId}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if(response?.status === 200) {
            localStorage.setItem('userName', userName);
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
            <button className="btn btn-lg btn-secondary btn-block my-3" onClick={() => setJokeText(getNewJoke)}>Get New Joke</button>

        </div>
      </>
    );
}