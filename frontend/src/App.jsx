import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import { useEffect, useState } from 'react';
import api from './services/api';
import Discover from './pages/Discover';
import Requests from './pages/Requests';

function App() {
  const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await api.get("/profile");
            setUser(response.data.user);
        };

        fetchProfile();

    }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/discover' element={<Discover />} />
        <Route path='/requests' element={<Requests />} />
        <Route path='/profile' element={<Profile user={user} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
