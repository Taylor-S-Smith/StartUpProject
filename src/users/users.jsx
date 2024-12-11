import React from 'react';
import { useState, useEffect  } from "react";
import './users.css'

export function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
      getUsers();
  }, []);

  async function getUsers() {
      const response = await fetch('api/users/getall', {
        method: 'get',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
      });
  
      let jsonResponse = await response.json();
  
      setUsers(jsonResponse);
  }

  const userRows = users.map((user) => {

    return (
      <tr key={user.username}>
        <td>{user.username}</td>
        <td>{user.dateJoined}</td>
      </tr>
    );
  });

    return (
      <>
        <h1>User List</h1>

        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Date Joined</th>
            </tr>
          </thead>
          <tbody>
            {userRows}
          </tbody>
        </table>
      </>
    );
}