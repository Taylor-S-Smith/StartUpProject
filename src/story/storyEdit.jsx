import React from 'react';
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";

import './storyEdit.css'

export function Edit({connectionId, setMode}) {
    const [jokeText, setJokeText] = useState('');
    const [chapterTitle, setChapterTitle] = useState('');
    const [choiceText, setChoiceText] = useState('');
    const [chapterText, setChapterText] = useState('');

    
    useEffect(() => {
        getNewJoke();
      }, []);


    async function getNewJoke() {

        const response = await fetch("/api/joke", {
            method: 'get',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });


        if (response.ok) {  // Check if the status is OK
            
            let jsonResponse = await response.json();
            setJokeText(jsonResponse.joke);
        } else {
            console.error('Failed to fetch joke:', response.status, response.statusText);
        }
    }

    async function submitChapter() {

        const response = await fetch('/api/story/submitchapter', {
            method: 'post',
            body: JSON.stringify({ choiceText: choiceText, chapterTitle: chapterTitle, chapterText: chapterText, proposedConnection: connectionId}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if(response?.status === 200) {
            setMode('read');
        }
    }

    return (
      <>
        <h1 className="pt-3">Edit Mode</h1>
        
        <div className="row mt-4">
            <div className="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Choice Text</span>
                    <input id="choiceText" onChange={(e) => setChoiceText(e.target.value)} type="text" className="form-control" placeholder="You do an action..." aria-label="Choice Text" aria-describedby="basic-addon1"/>
                </div>
            </div>
        </div>
        <div className="row mt-2">
            <div className="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Chapter Title</span>
                    <input id="chapterTitle" onChange={(e) => setChapterTitle(e.target.value)} type="text" className="form-control" placeholder="Title" aria-label="Chapter Title" aria-describedby="basic-addon1"/>
                </div>
            </div>
        </div>
        
        <div className="row mt-2">
            <div className="col">
                <textarea id="chapterText" onChange={(e) => setChapterText(e.target.value)}  className="form-control" aria-label="With textarea" placeholder="Continue the story here..."></textarea>
            </div>
        </div>  
        <div className="row mt-2">
            <div className="col">
                <button className="btn btn-secondary my-3" onClick={submitChapter}>Submit for Approval</button>
            </div>
        </div>
      </>
    );
}