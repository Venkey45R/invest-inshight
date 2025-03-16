import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { jwtDecode } from "jwt-decode";

function HomePage() {
  const location = useLocation();
  const id = localStorage.getItem("id");
  const [data, setData] = useState([]);
  const [advice, setAdvice] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    console.log(token);
    if(token){
      const decodedToken = jwtDecode(token);
      if(!decodedToken){
        localStorage.removeItem('token');
        navigate('/signin');
      }
    } 
    else{
      navigate('/signin');
    }
  },[])
  
  useEffect(()=>{
        axios.post('http://localhost:3001/details', {id})
        .then(user =>{
          setData(user.data);
        })
        .catch(err =>{
          console.log(err);
        })
  },[id, location])

  const handleLogOut = () =>{
    localStorage.removeItem('token');
    navigate('/');
  }

  useEffect(()=>{
    if(data.score >= 90){
      setAdvice("Maintain your habits! Consider diversifying investments for optimal growth.");
      setStatus("Excellent");
    }
    else if(data.score >= 75){
      setAdvice("Your finances are in good shape! Aim to increase emergency savings and reduce unnecessary expenses.");
      setStatus("Good");
    }
    else if(data.score >= 50){
      setAdvice("Work on reducing debts and improving your savings rate. Consider setting long-term financial goals.");
      setStatus("Fair");
    }
    else if(data.score >= 30){
      setAdvice("Focus on cutting down unnecessary expenses, increasing savings, and managing debts effectively. Seek financial advice if needed.");
      setStatus("Needs Improvement");
    }
    else{
      setAdvice("High financial risk! Prioritize reducing debts, building an emergency fund, and improving your credit score. Seek financial guidance immediately.");
      setStatus("Critical");
    }
  },[data])

  const goToDashboard = () =>{
    navigate('/dashboard', {state: data});
  }

  const goToAnalysis = () =>{
    navigate('/analysis', {state: data});
  }

  const goToProfile = () =>{
    navigate('/profile', {state: data});
  }
  
  return (
    <div className='w-full min-h-screen bg-[url(src/assets/bg.jpeg)] bg-cover'>
      <div className='flex justify-between w-full px-4 py-6 bg-[#004D40] text-[#ffffff] border-b border-black'>
        <div className='ml-2 lg:ml-6'>
          <h1 className='text-xl font-bold lg:text-3xl'>Insight Invest</h1>
        </div>
        <div className='flex gap-6 mr-2 lg:mr-6 lg:gap-10'>
          <div onClick={goToAnalysis} className="relative hidden cursor-pointer lg:block top-2">Analysis</div>
          <div onClick={goToDashboard} className='relative hidden cursor-pointer lg:block top-2'>Dashboard</div>
          <div onClick={goToProfile} className='relative hidden cursor-pointer lg:block top-2'>Update Profile</div>
          <div onClick={handleLogOut} className='px-4 lg:px-10 py-2 bg-[#FFC107] hover:bg-[#FFB300]  text-[#333333] rounded-xl'>Log out</div>
        </div>
      </div>
      <div className="px-8 py-3">
        <h2 className="text-lg font-semibold float-end">Welcome Back, {data.name}</h2>
      </div>
      <div className="flex items-center justify-center px-4 py-6 mt-6 ">
        <div className="lg:w-1/4 w-3/4 rounded-xl bg-[#004D40] text-white px-4 py-4 ">
        <div className="bg-[#FFC107] px-5 py-4 text-black rounded-xl">
          <div className="my-4 text-lg text-center">Your Financial Score: <span className="text-lg font-bold">{data.score} / 100</span></div>
          <div className="my-2 text-base font-bold text-center">{status}</div>
          <div className="max-w-lg my-2 text-sm text-center">{advice}</div>
        </div>
          <div className="my-6 text-sm text-center">To get personalised analysis: <span onClick={goToAnalysis} className="text-blue-500 underline cursor-pointer">Click here</span></div>
        </div>
      </div>
      <div className="mt-28 lg:mt-14">
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
