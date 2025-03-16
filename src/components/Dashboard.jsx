import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Footer from './Footer';

function Dashboard() {
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();
    const id = data._id;
    const [source, setSource] = useState("");
    const goToHome = () =>{
        console.log("going to home");
        navigate('/homepage', {state: id});
      }
    
      const goToAnalysis = () =>{
        navigate('/analysis', {state: data});
      }
    
      const goToProfile = () =>{
        navigate('/profile', {state: data});
      }

      const handleLogOut = () =>{
        localStorage.removeItem('token');
        navigate('/');
      }
    
    useEffect(()=>{
        findSource(data.score)
    },[data])

      const findSource = (score) =>{
        if(score >= 90){
        setSource("src/assets/congrats.avif");
        }
        else if(score >= 75){
            setSource("src/assets/keepitup.jpeg");
        }
        else if(score >= 50){
            setSource("src/assets/survive.jpeg");
        }
        else if(score >= 30){
            setSource("src/assets/notsogood.jpeg");
        }
        else{
            setSource("src/assets/danger.jpeg");
        }
    }
  return (
    <div className='w-full min-h-screen bg-[url(src/assets/bg.jpeg)] bg-cover'>
        <div className='flex justify-between w-full px-4 py-6 bg-[#004D40] text-[#ffffff] border-b border-black'>
            <div className='ml-2 lg:ml-6'>
                <h1 className='text-xl font-bold lg:text-3xl'>Insight Invest</h1>
            </div>
            <div className='flex gap-6 mr-2 lg:mr-6 lg:gap-10'>
                <div onClick={goToAnalysis} className="relative hidden cursor-pointer lg:block top-2">Analysis</div>
                <div onClick={goToProfile} to="/profile" className='relative hidden cursor-pointer lg:block top-2'>Update Profile</div>
                <div onClick={goToHome} className='relative hidden cursor-pointer lg:block top-2'>Home</div>
                <div onClick={handleLogOut} className='px-4 lg:px-10 py-2 bg-[#FFC107] hover:bg-[#FFB300]  text-[#333333] rounded-xl'>Log out</div>
            </div>
        </div>
        <div className='flex justify-center px-4 pt-8 pb-4'>
            <div>
                <h2 className='text-xl font-bold text-center lg:text-2xl'>Welcome to your personalized dashboard!</h2>
                <p className='max-w-2xl mt-4 text-center'>Hey {data.name}! This is your personalized dashboard. Stay on top of your savings, analyze your spending habits, and get tailored financial advice to reach your goals faster!</p>
            </div>
        </div>
        <div className='flex justify-center py-4'>
            <div>
                <div className='p-8 border border-green-900 rounded-xl'>
                    <p className='py-2'>As per our analysis, you have obtained a score of <span className='font-semibold '>{data.score}</span> out of 100.</p>
                    <div className='flex justify-center'>
                        <img src={source} alt='source' className='my-4 max-w-60 max-h-60 rounded-xl' />
                    </div>
                </div>
                <div className='my-6'>
                    <p className='py-2'>Here are some key metrics:</p>
                    <ul className='ml-10 list-disc'>
                        <li className='my-2'>Total Savings in your bank account: <span className='font-semibold '>{data.total_savings}</span></li>
                        <li className='my-2'>Amount currently invested: <span className='font-semibold '>{data.invested_value}</span></li>
                        <li className='my-2'>Total Debts: <span className='font-semibold '>{data.total_debts}</span></li>
                        <li className='my-2'>Emergency Fund Coverage: <span className='font-semibold '>{(data.total_savings / data.monthly_expense).toFixed(0)}</span>Month(s)</li>
                        <li className='my-2'>Credit Score: <span className='font-semibold '>{data.credit_score}</span></li>
                    </ul>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Dashboard