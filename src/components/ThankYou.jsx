import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

function ThankYou() {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;
    useEffect(()=>{
        axios.post('http://localhost:3001/Details', {data})
        .then(res=>{
          if(res.data.status === 'success'){
            navigate('/Homepage', {state: res.data.data._id});
          }
        })
        .catch(err => console.log(err));
    },[])
  return (
    <div className='w-full min-h-screen bg-[url(src/assets/bg.jpeg)] bg-cover'>
      <div className='flex py-40 justify-center text-[#004D40]'>
        <div className='px-20 py-12 bg-[#DFF5F2] rounded-xl w-11/12 lg:w-2/5'>
        <h2 className='mt-3 mb-5 text-lg lg:text-xl font-bold text-center text-[#004D40]'>THANK YOU FOR SPENDING YOUR VALUABLE TIME</h2>
        <p className='text-center text-[#004D40] mb-5'>Now we are all set!!!</p>
        </div>
      </div>
    </div>
  )
}

export default ThankYou;