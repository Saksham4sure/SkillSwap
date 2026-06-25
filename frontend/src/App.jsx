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
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      }
    };

    fetchProfile();
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/discover' element={<ProtectedRoute><Discover /></ProtectedRoute>} />
        <Route path='/requests' element={<ProtectedRoute><Requests /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile user={user} /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
