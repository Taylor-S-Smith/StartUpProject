import React from 'react';
import { BrowserRouter, NavLink, Route, Routes, Navigate } from 'react-router-dom';
import {Login} from './login/login';
import {Story} from './story/story';
import {Weave} from './weave/weave';
import {Pending} from './pending/pending';
import {Users} from './users/users';

import './App.css'

function App() {
  const INITIAL_CHAPTER_ID = '5f9519cd-940b-4462-83f7-225be2856391'
  
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);

  return (
    <>
      <BrowserRouter>
        <div className='app'>
          <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
            <a className="navbar-brand" href="/">Storyweave</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to='/'>{isAuthenticated ? 'Logout' : 'Login'}</NavLink>
                </li>
                {isAuthenticated && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to='/story'>Read the Story</NavLink>
                  </li>
                )}
                {isAuthenticated && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to='/weave'>View the Weave</NavLink>
                  </li>
                )}
                {isAuthenticated && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to='/pending'>ADMIN: Pending Submissions</NavLink>
                  </li>
                )}
                {isAuthenticated && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to='/users'>ADMIN: View Users</NavLink>
                  </li>
                )}
              </ul>
            </div>
          </nav>

          <main className="container-fluid my-3">
            <div className="row justify-content-center">
              <div className="col-11">
                <Routes>
                  <Route path='/' element={<Login setAuthentication={setIsAuthenticated}/>} exact />
                  <Route path='/story' element={<Story initialChapterId={INITIAL_CHAPTER_ID}/>} />
                  <Route path='/weave' element={<Weave/>} />
                  <Route path='/pending' element={<Pending/>} />
                  <Route path='/users' element={<Users/>} />
                  <Route path='*' element={<Navigate to='/' replace />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </BrowserRouter>


      <hr />

      <footer  className="container-fluid">
        <div className="row text-center">
          <span>Created by Taylor Smith</span>
          <a href="https://github.com/tss67/StartUpProject">GitHub</a>
        </div>
      </footer>
    </>
  )
}

export default App
