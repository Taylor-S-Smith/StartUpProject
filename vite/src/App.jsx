import { BrowserRouter, NavLink, Route, Routes, Navigate } from 'react-router-dom';
import {Login} from './login/login';
import {Story} from './story/story';
import {Edit} from './edit/edit';
import {Weave} from './weave/weave';

import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className='app'>
          <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
            <a className="navbar-brand" href="index.html">Storyweave</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to='/'>Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/story'>Read the Story</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/weave'>View the Weave</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/pending'>ADMIN: Pending Submissions</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/users'>ADMIN: View Users</NavLink>
                </li>
              </ul>
            </div>
          </nav>

          <main className="row justify-content-center my-3">
            <div className="col-11">  
              <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/story' element={<Story/>} />
                <Route path='/edit' element={<Edit/>} />
                <Route path='/weave' element={<Weave/>} />
                <Route path='/pending' element={<></>} />
                <Route path='/users' element={<></>} />
                <Route path='*' element={<Navigate to='/' replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </BrowserRouter>

      <footer>
        <div className="row text-center justify-content-center">
          <hr />
          <span className="text-reset">Created by Taylor Smith</span>
          <br />
          <div className="col-11">
            <a href="https://github.com/tss67/StartUpProject">GitHub</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
