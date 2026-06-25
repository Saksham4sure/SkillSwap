import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { TriangleAlert } from 'lucide-react';



const Login = () => {
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", formData);
            console.log(response.data);
            navigate("/profile");
            window.location.reload();
        } catch (err) {
            if (err.response) {
                console.log(err.response.data.message);
                setError(err.response.data.message);
            }
        };
    };

    return (
        <div className='px-10 flex h-screen items-center justify-center'>
            <form className='w-100 flex flex-col' onSubmit={handleSubmit} >
                <div className='w-10 h-10 rounded-xl overflow-hidden'>
                    <img className='w-full h-full object-cover' src="/Logo.png" alt="" />
                </div>
                <h1 className='mt-2 text-lg bold'>Login to SkillSwap</h1>
                <p className='text-sm mt-0.5 text-zinc-600'>Enter your credentials to login to your account.</p>
                <input onChange={handleChange} className='mt-8 border border-zinc-300 outline-0 rounded-xl px-4 py-2 ' placeholder='Email' type="email" name="email" id="email" />
                <input onChange={handleChange} className='mt-3 border border-zinc-300 outline-0 rounded-xl px-4 py-2 ' placeholder='Password' type="password" name="password" id="password" />
                <button type='submit' className='mt-3 bg-[#B3FE3A] rounded-xl px-4 py-2 border border-zinc-300 cursor-pointer'>Log in</button>
                {error && <div className='text-red-500 text-sm flex justify-center items-center mt-4'><TriangleAlert className='h-4 ' /><span className=' h-4'>{error}</span></div>}
                <p className='mt-5 text-sm text-zinc-600'>Don't have an account? <Link className='text-black bold' to="/register">Sign up</Link></p>
            </form>
        </div>
    )
}

export default Login