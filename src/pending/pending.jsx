import React from 'react';
import { useState, useEffect  } from "react";
import './pending.css'

export function Pending() {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    getChapters();
  }, []);

  async function getChapters() {
    const response = await fetch('api/story/getawaitingapproval', {
      method: 'get',
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
    });

    let jsonResponse = await response.json();

    setChapters(jsonResponse);
  }

  async function approveChapter(chapterId) {
    const response = await fetch('api/story/approvechapter', {
        method: 'post',
        body: JSON.stringify({ chapterId: chapterId}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    getChapters();
  }

  async function denyChapter(chapterId) {
    const response = await fetch('api/story/denyChapter', {
        method: 'delete',
        body: JSON.stringify({ chapterId: chapterId}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    getChapters();
  }


  const chapterRows = chapters.map((chapter) => {
    return (
      <tr key={chapter.Id}>
        <td>{chapter.chapterTitle}</td>
        <td>{chapter.chapterText}</td>
        <td>
          <button className="btn btn-lg btn-success btn-block" onClick={() => approveChapter(chapter.Id)}>Approve</button>
          <button className="btn btn-lg btn-danger btn-block" onClick={() => denyChapter(chapter.Id)}>Deny</button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h1>Pending Approval</h1>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th scope="col">Chapter Title</th>
            <th scope="col">Chapter Text</th>
            <th scope="col">Contributions</th>
          </tr>
        </thead>          
        <tbody>
          {chapterRows}
        </tbody>
        
      </table>
    </>
  );
}