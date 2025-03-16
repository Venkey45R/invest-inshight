import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import growth from '../components/growth.jpg';
import { useNavigate } from 'react-router-dom';


function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            navigate('/homepage');
        }
    },[])
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:3001/signin', {email, password})
        .then(res =>{
            if(res.data.message === "success"){
                const id = res.data.id;
                localStorage.setItem("id", id);
                const token = res.data.token;
                localStorage.setItem('token', token);
                navigate('/homepage', {state: id});
            }
            else{
                alert(res.data.message);
            }
        })
    }
  return (
    <div className='items-center justify-center block h-screen lg:flex bg-[url(src/assets/bg.jpeg)] bg-cover py-6 lg:py-0'>
        <form onSubmit={handleSubmit} className='w-4/5 ml-10 lg:ml-0 px-10 rounded-t-xl lg:rounded-r-none rounded-s-none lg:rounded-s-xl py-6 lg:py-16 bg-[#DFF5F2] h-1/2 lg:h-3/5 lg:w-1/3'>
            <h2 className='mt-0 mb-5 text-xl font-bold text-center text-[#004D40]'>SIGN IN</h2>
            <div className='my-8'>
                <label className='text-lg text-[#004D40] mb-4'>Email:</label>
                <input type='email' placeholder='Enter your email:' className='w-full border border-[#80CBC4] h-10 px-2 bg-white rounded-lg placeholder:text-gray mt-2' onChange={(e)=>{setEmail(e.target.value)}} />
            </div>
            <div className='my-8'>
                <label className='text-lg text-[#004D40] mb-4'>Password:</label>
                <input type='password' placeholder='Enter your password:' className='w-full border border-[#80CBC4] h-10 px-2 bg-white rounded-lg placeholder:text-gray mt-2' onChange={(e)=>{setPassword(e.target.value)}} />
            </div>
            <div className='flex justify-center mt-12'>
                <button className='px-14 py-2 text-white rounded-xl bg-[#00C853] hover:bg-[#009624]'>SUBMIT</button>
            </div>  
        </form>
        <div className='flex items-center justify-center w-4/5 ml-10 rounded-b-xl lg:rounded-b-none lg:ml-0 bg-[#1A237E] lg:w-1/4 h-1/2 lg:h-3/5 px-5 rounded-t-none lg:rounded-e-xl'>
            <div className=''>
                <h3 className='my-2 text-2xl font-bold text-center text-white lg:my-5'>Welcome Back!</h3>
                <p className='my-3 font-semibold text-center text-white'>Log-in to access your personalized insights.</p>
                <p className='mt-5 mb-6 text-center text-white lg:mt-10'>Don't have an account? Get a free account</p>
                <div className='flex justify-center'>
                    <Link to="/Signup" className='px-14 py-2 text-white bg-[#00C853] rounded-xl mb-4 lg:mb-8 hover:bg-[#009624]'>Sign up</Link>
                </div>
                <img src={growth} alt='growth image' className='w-full h-32 mt-0 lg:h-40' />
            </div>
        </div>
    </div>
  )
}

export default SignIn;