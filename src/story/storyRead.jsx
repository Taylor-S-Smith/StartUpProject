import React from 'react';

export function Read({title, text, choices, setChapterId, setMode}) {
          
    const choiceButtons = choices ? choices.map((chapterChoice) => {
        return (
            <div className='row mb-1'>
                <div className='col'>
                    <button id={chapterChoice._id} className="btn btn-secondary" onClick={() => setChapterId(chapterChoice._id)}>{chapterChoice.ChoiceText}</button>
                </div>
            </div>
        );
    }) : null;

    

    return (
      <>
        <h1 >{title}</h1>
        <p className="my-4">
            {text}
        </p>
        
        {choiceButtons}
        
        <button className="btn btn-secondary my-3" onClick={() => setMode('edit')}>+ Add Choice</button>
      </>
    );
}