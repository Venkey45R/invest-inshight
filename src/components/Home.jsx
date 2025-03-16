import React from 'react'
import { Link } from 'react-router-dom';
import hero from '../components/hero.jpeg';
import analysis from "../components/analysis.jpeg";
import insights from "../components/insights.jpeg";
import progress from "../components/progres.jpeg";
import freedom from "../components/freedom.jpeg";
import Footer from './Footer';

function Home() {
  return (
    <div className='w-full min-h-screen bg-[url(src/assets/bg.jpeg)] bg-cover'>
        <div className='flex justify-between w-full px-4 py-6 bg-[#004D40] text-[#ffffff] border-b border-black'>
            <div className='ml-2 lg:ml-6'>
                <h1 className='text-xl font-bold lg:text-3xl'>Insight Invest</h1>
            </div>
            <div className='flex gap-6 mr-2 lg:mr-6 lg:gap-10'>
                <a href='#about' className='relative hidden lg:block top-2'>About</a>
                <a href='#features' className='relative hidden lg:block top-2'>Features</a>
                <Link to="/signin" className='px-4 lg:px-10 py-2 bg-[#FFC107] hover:bg-[#FFB300]  text-[#333333] rounded-xl'>Sign in</Link>
                <Link to="/signup" className='px-4 lg:px-10 py-2 bg-[#FFC107] hover:bg-[#FFB300]  text-[#333333] rounded-xl'>Sign up</Link>
            </div>
        </div>
        <div className='block lg:flex justify-center h-5/6 items-center gap-32 px-10 py-20 text-[#333333]'>
            <div className='max-w-full ml-6 lg:ml-0 lg:max-w-xl'>
                <h2 className='py-6 text-3xl font-bold'>Track Your Finance, Achieve Your Goals.</h2>
                <p className='pt-4 pb-10 text-[#555555]'>Track, analyze, and improve your finances effortlessly with personalized insights.</p>
                <Link to="/Signin" className='px-14 mt-10 py-4 text-[#004D40] bg-[#FFC107] hover:bg-[#FFB300] rounded-xl mb-4 lg:mb-8'>Get Started for free</Link>
            </div>
            <div className='flex items-center justify-center mt-10 lg:mt-0'>
                <img src={hero} alt='hero img' />
            </div>
        </div>
        <div className='py-14 border-b-2 border-t-2 border-[#80CBC4]'>
            <h2 className="text-2xl font-bold text-center">Our Mission</h2>
            <div className='flex justify-center mt-6'>
                <p className='max-w-xl text-center lg:max-w-3xl'>Our mission is to simplify personal finance for everyone, helping you achieve financial freedom through informed investment strategies and disciplined savings plans.</p>
            </div>
        </div>
        <div className='py-6' id='about'>
            <h2 className='text-2xl font-bold text-center'>About Insight Invest</h2>
            <div className='flex justify-center mt-6'>
                <p className='text-center max-w-80 lg:max-w-3xl'>Insight Invest is your trusted companion for smarter financial decisions. We aim to empower individuals to take control of their finances by providing personalized insights, actionable recommendations, and goal-oriented tracking</p>
            </div>
            <div className='flex justify-center my-10'>
                <img src={freedom} alt='about img' className='w-80 lg:w-auto lg:h-auto' />
            </div>
        </div>
        <div className='py-6' id='features'>
            <h2 className='text-2xl font-bold text-center'>Features</h2>
            <div className='flex justify-center my-10'>
                <div className='justify-between block text-white lg:flex gap-28'>
                    <div className='w-64 my-6 lg:my-0 px-3 py-6 bg-[#004D40] rounded-2xl'>
                        <img src={analysis} alt='analtsis image' className='w-full h-1/2' />
                        <div className='w-full mt-6 text-center h-1/2'>
                            <h3 className='mb-3 text-xl font-semibold'>Financial Analysis</h3>
                            <p className=''>We do personalized analysis on your financial situation by getting details like investments, savings, debt</p>
                        </div>
                    </div>
                    <div className='w-64 my-6 lg:my-0 px-4 py-6 bg-[#004D40] rounded-2xl'>
                        <img src={insights} alt='insights image' className='w-full h-1/2' />
                        <div className='w-full mt-6 text-center h-1/2'>
                            <h3 className='mb-3 text-xl font-semibold'>Personalized Insights</h3>
                            <p className=''>After analysing your financial situation we will give tips to improve your financial health by considering various metrics.</p>
                        </div>
                    </div>
                    <div className='w-64 my-6 lg:my-0 px-4 py-6 bg-[#004D40] rounded-2xl'>
                        <img src={progress} alt='progress image' className='w-full h-1/2' />
                        <div className='w-full mt-6 text-center h-1/2'>
                            <h3 className='mb-3 text-xl font-semibold'>Progress Tracking</h3>
                            <p className=''>We track your progress towards your goal and help you achieve it by reminding you frequently, so you will be on track.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Home;