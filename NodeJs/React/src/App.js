import Login from './Routes/Login/Login.js';
import MainPage from './Routes/MainPage/MainPage';
import Register from './Routes/Login/Register/Register';
import Forgot from './Routes/Login/Forgot/Forgot.js';
// import Club2 from './Routes/Club/club2.js';
import { Routes, Route, /* Outlet, useParams, */ } from 'react-router-dom'
import React from 'react';
import Notice from './Routes/Notice/Notice.js';
import NewPost from './Routes/Notice/WritePost.js';
import ShowPost from './Routes/Notice/ShowPost.js';
import ModifyPost from './Routes/Notice/ModifyPost.js';
import Chat from './Routes/Chatting/chat.js';
import NewClub from './Routes/Club/NewClub.js';


function App() {
  
  return (
    <>
    
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/login/forgot" element={<Forgot />} />
        <Route path="/login/register" element={<Register />} />
        <Route path="notice" element={<Notice />}/>
        <Route path="notice/*" element={<ShowPost />}/>\
        <Route path="notice/writepost" element={<NewPost />}/>
        <Route path="notice/modify/*" element={<ModifyPost />}/>
        <Route path="chat" element={<Chat />}/>
        <Route path='club' element={<NewClub/>} />
        

      </Routes>
      
    </>
  );
}

export default App;
