import { useNavigate } from "react-router-dom"
import { useState } from "react";

import './edit.css'

export function Edit() {
    const [jokeText, setJokeText] = useState(getNewJoke);

    function getNewJoke() {
        //TODO: Connect this to external API
        console.log("Don't forget to implement this for a future pass-off!")
        return "External API Error: Not implemented Yet";
    }

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/story');
    }

    return (
      <>
        <h1 className="pt-3">Choice #3 from Chapter 1</h1>
        
        <div className="row justify-content-start pt-5">
            <div className="input-group mb-3">
                <input id="story_name" type="text" className="form-control" placeholder="Choice Text" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
        </div>

        <div className="row justify-content-start py-2">
            <div id="storytext" className="input-group">
                <textarea id="story"  className="form-control" aria-label="With textarea" placeholder="Continue the story here..."></textarea>
            </div>
        </div>

        <button className="btn btn-lg btn-secondary btn-block my-3" onClick={handleNavigation}>Submit for Approval</button>

        <div className="mt-4">
            Here's a funny joke for inspiration!
            <div id="joke" className="bg-light text-dark">{jokeText}</div>
            <button className="btn btn-lg btn-secondary btn-block my-3" onClick={() => setJokeText(getNewJoke)}>Get New Joke</button>

        </div>
      </>
    );
}