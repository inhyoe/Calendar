
import Login from './Routes/Login/Login.js';
import MainPage from './Routes/MainPage/MainPage';
import Register from './Routes/Login/Register/Register';
import Forgot from './Routes/Login/Forgot/Forgot.js';
import { Routes, Route, /* Outlet, useParams, */ } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="login" element={<Login />} />

        <Route path="/login/register" element={<Register />} />
        <Route path="/login/forgot" element={<Forgot />} />

        

      </Routes>
    </>
  );
}

export default App;
