import React from 'react';
import { useState, useEffect } from "react";

import {Read} from './storyRead';
import {Edit} from './storyEdit';


export function Story({initialChapterId}) {
    const [chapterId, setChapterId] = useState(initialChapterId);
    const [chapter, setChapter] = useState('');
    const [choices, setChoices] = React.useState([]);
    const [mode, setMode] = useState('read');
    const [errorMsg, setErrorMsg] = React.useState(null);
    
    useEffect(() => {
      const getChapterData = async () => {
        const chapterData = await getChapter(chapterId);
        if(chapterData) {
          setChapter(chapterData);

            if(chapterData.connectedTo) {
              const choiceData = await Promise.all(
                chapterData.connectedTo.map((connectionId) => getChapter(connectionId))
              );
              setChoices(choiceData)
            }
        }
      };

      getChapterData();
    }, [chapterId]);

    async function getChapter(id) {
      const response = await fetch(`/api/story/getchapter/${id}`, {
          method: 'get',
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
      });
      const responseJson = await response.json()

      
      if(response?.status === 200) {
          return responseJson.chapter;
      } else {
          setErrorMsg(responseJson.msg)
          return null;
      }

  }

    return (
      <>
        {mode === 'read' && (
            <Read title={chapter.Title} text={chapter.Text} choices={choices} setChapterId={setChapterId} setMode={setMode}/>
        )}
        {mode === 'edit' && (
            <Edit connectionId={chapterId} setMode={setMode}/>
        )}
        
        <div className="errorMsg text-center">
            {errorMsg}
        </div>
      </>
    );
}