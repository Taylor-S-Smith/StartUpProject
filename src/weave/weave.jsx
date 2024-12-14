import React from 'react';
import { useState, useEffect  } from "react";
import './weave.css'

export function Weave() {
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        getChapters();
    }, []);

    async function getChapters() {
        const response = await fetch('api/story/getapproved', {
          method: 'get',
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
        });
    
        let jsonResponse = await response.json();
    
        setChapters(jsonResponse);
    }

    const chapterRows = chapters.map((chapter) => {
        return (
          <tr key={chapter._id}>
            <td>{chapter.Title}</td>
            <td>{chapter.Text}</td>
            <td>{chapter.connectedFrom.join(', ')}</td>
            <td>{chapter.connectedTo.join(', ')}</td>
          </tr>
        );
    });

    return (
      <>
        <h1>All things are connected...</h1>

        <table className="table table-bordered mt-4">
            <thead>
            <tr>
                <th scope="col">Chapter Title</th>
                <th scope="col">Chapter Text</th>
                <th scope="col">Conections From</th>
                <th scope="col">Connections To</th>
            </tr>
            </thead>          
            <tbody>
                {chapterRows}
            </tbody>
            
        </table>
        
        <div>
            <div id="pageCount">
                Total Pages So Far: Connect to database
            </div>
            <div id="choiceCount">
                Total Choices So Far: Connect to database
            </div>  
        </div>
      </>
    );
}