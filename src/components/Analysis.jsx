import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Footer from './Footer';
import {Chart as ChartJS} from "chart.js/auto";
import {Doughnut, Bar} from "react-chartjs-2";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
import Credits from './Credits';

function Analysis() {
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();
    const id = data._id;
    const [advice, setAdvice] = useState([]);
    const [download, setDownload] = useState(false);

    const goToHome = () =>{
        console.log("going to home");
        navigate('/homepage', {state: id});
      }
    
      const goToDashboard = () =>{
        navigate('/dashboard', {state: data});
      }
    
      const goToProfile = () =>{
        navigate('/profile', {state: data});
      }

      const handleLogOut = () =>{
        localStorage.removeItem('token');
        navigate('/');
      }

      const handleSubmit = () =>{
        setDownload(true);
        const input = document.getElementById("pdf");
        html2canvas(input, {logging: true, letterRendering: 1, useCORS: true, backgroundColor: null, scale: 1}).then(canvas =>{
            const imgWidth = 210;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const pageHeight = 295;
            const imgData = canvas.toDataURL('img/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            let heightLeft = imgHeight;
            let position = 0;
            pdf.setFillColor(120, 215, 170);
            pdf.rect(0, 0, 210, 297, "F");
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            while(heightLeft > 0){
                position -= pageHeight;
                pdf.addPage();
                pdf.setFillColor(120, 215, 170);
                pdf.rect(0, 0, 210, 297, "F");
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            pdf.save("Analysis.pdf");
            setDownload(false);
        })
      }

      useState(()=>{
        advice.push("Always have health insurance and term insurance to safeguard your future and your dependents future");
        advice.push("Diversify your portfolio with stocks, bonds, mutual funds, gold, and real estate to minimize risk");
        advice.push("Start saving for retirement life and increase it whenever your income grows");
        advice.push("Always have budget and live below your means");
        advice.push("Grow your excess money atleast to beat inflation");
        if(data.debt_to_income > 0.4){
            advice.push("Your debt-to-income ratio is on the higher side. Consider prioritizing debt repayment");
        }
        if(data.emergency_fund < (6*data.monthly_expense)){
            advice.push("Your emergency fund is insufficient to cover six months of expenses. Aim to save more to build a stronger financial safety net");
        }
        if(data.debt_to_asset > 0.5){
            advice.push("Your debts are significantly high compared to your total assets. Try to reduce debt or increase investments to maintain a healthy financial balance");
        }
        if(data.investment_to_income < 0.15){
            advice.push("Your investment ratio is lower than recommended. Try to allocate at least 20% of your income towards investments for long-term wealth creation");
        }
        if(data.investment_to_income > 0.4){
            advice.push("You're investing aggressively. Ensure you have enough liquidity for short-term needs while balancing risk");
        }
        if(data.monthly_expense > (0.7*data.monthly_income)){
            advice.push("our expenses are high compared to your income. Consider budgeting and cutting unnecessary costs");
        }
        if(data.credit_score < 650){
            advice.push("Your credit score is low. Pay bills on time, reduce outstanding debts, and avoid unnecessary credit applications");
        }
      },[]) 

  return (
    <div className='w-full min-h-screen bg-[url(src/assets/bg.jpeg)] bg-cover'>
        <div className='flex justify-between w-full px-4 py-6 bg-[#004D40] text-[#ffffff] border-b border-black'>
            <div className='ml-2 lg:ml-6'>
                <h1 className='text-xl font-bold lg:text-3xl'>Insight Invest</h1>
            </div>
            <div className='flex gap-6 mr-2 lg:mr-6 lg:gap-10'>
                <div onClick={goToDashboard} className="relative hidden cursor-pointer lg:block top-2">Dashboard</div>
                <div onClick={goToProfile} className='relative hidden cursor-pointer lg:block top-2'>Update Profile</div>
                <div onClick={goToHome} className='relative hidden cursor-pointer lg:block top-2'>Home</div>
                <div onClick={handleLogOut} className='px-4 lg:px-10 py-2 bg-[#FFC107] hover:bg-[#FFB300]  text-[#333333] rounded-xl'>Log out</div>
            </div>
        </div>
        <div id='pdf' className=''>
            <div className='flex justify-center px-4 pt-8 pb-4'>
                <div className='my-2'>
                    <h2 className='text-xl font-bold text-center lg:text-2xl'>ANALYSIS</h2>
                    <p className='max-w-2xl mt-4 text-center'>Welcome to your personalized analysis, <span className='font-bold'>{data.name}</span>. After our deep analysis we found that your financial score is <span className='font-bold'>{data.score}</span> out of 100. Let us breakdown the score and see how you can improve it.</p>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className=''>
                    <h2 className='mb-4 text-xl font-bold text-center'>Income and Savings breakdown</h2>
                    <Doughnut 
                        data={{
                            labels: ["Monthly Income", "Monthly Expense", "Monthly Savings"],
                            datasets: [
                                {
                                    label: "Monthly Revenue Breakdown",
                                    data: [
                                        data.monthly_income,
                                        data.monthly_expense,
                                        data.monthly_income - data.monthly_expense
                                    ],
                                    backgroundColor: ["#4CAF50", "#FF5733", "#FFC107"]
                                }
                            ]
                        }}
                    />
                </div>
            </div>
            <div className='justify-center block lg:flex'>
                <div className='w-full ml-0 lg:ml-5 lg:w-1/2'>
                    <h3 className='mb-4 text-xl font-bold text-center'>Debt vs Income Breakdown</h3>
                    <Bar 
                        data={{
                            labels: ["Debt to Income"],
                            datasets:[
                                {
                                    label: "Total Debt",
                                    data: [`${data.total_debts}`],
                                    backgroundColor:[
                                        "rgba(200, 0, 0, 0.5)"
                                    ],
                                    borderRadius: 25,
                                },
                                {
                                    label: "Yearly Income",
                                    data: [`${data.monthly_income * 12}`],
                                    backgroundColor:[
                                        "rgba(0, 200, 0, 0.5)"
                                    ],
                                    borderRadius: 25,
                                },
                            ]
                        }}
                    />
                </div>
                <div className='w-full lg:w-1/2'>
                    <h3 className='mb-4 text-xl font-bold text-center'>Emergency Fund Readiness</h3>
                    <div className="flex justify-center">
                        <div className=''>
                            <Doughnut 
                                data={{
                                    labels: ["Emergency Fund Covered", "To be covered"],
                                    datasets: [
                                        {
                                            label: "Emergency Fund Coverage",
                                            data: [
                                                data.total_savings,
                                                data.total_savings - (data.monthly_expense * 6),
                                            ],
                                            backgroundColor: ["#4CAF50", "#FF5733"]
                                        }
                                    ]
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center my-5 '>
                <div className='p-8 border border-green-900 rounded-xl'>
                    <h3 className='mb-4 text-xl font-bold text-center'>Advices to keep your finances well</h3>
                    <div className='flex justify-center'>
                        <ul className='ml-0 list-disc lg:ml-10'>
                            {advice.map(ad =>(
                                <li className='my-2'>{ad}</li>
                            )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='flex justify-center my-4'>
                <div className='mt-1'>
                    <p className='max-w-2xl my-4 text-center'>As per our analysis, Here are key contribution to your financial score:</p>
                    <div className='flex justify-center'>
                        <table className='border border-black'>
                            <tr className='my-2 border border-black'><td className='p-3 border border-black'>Your Monthly Income</td><td className='p-3 font-bold'>{data.monthly_income}</td></tr>
                            <tr className='my-2 border border-black'><td className='p-3 border border-black'>Your Monthly Expense</td><td className='p-3 font-bold'>{data.monthly_expense}</td></tr>
                            <tr className='my-2 border border-black'><td className='p-3 border border-black'>Your Monthly Savings</td><td className='p-3 font-bold'>{data.monthly_income - data.monthly_expense}</td></tr>
                            <tr className='my-2 border border-black'><td className='p-3 border border-black'>Your Total Savings</td><td className='p-3 font-bold'>{data.total_savings}</td></tr>
                            <tr className='my-2 border border-black'><td className='p-3 border border-black'>Your Total Debts</td><td className='p-3 font-bold'>{data.total_debts}</td></tr>
                            <tr className='my-2 border border-black'><td className='p-3 border border-black'>Your Total Investments</td><td className='p-3 font-bold'>{data.invested_value}</td></tr>
                            <tr className='my-2 border border-black'><td className='p-3 border border-black'>Your Total Assets</td><td className='p-3 font-bold'>{data.total_assets}</td></tr>
                            <tr className='my-2 border border-black'><td className='p-3 border border-black'>Your Credit Score</td><td className='p-3 font-bold'>{data.credit_score}</td></tr>
                            <tr className='my-2 border border-black'><td className='p-3 border border-black'>Your Debt to Asset Ratio:</td><td className='p-3 font-bold'>{data.debt_to_asset}</td></tr>
                            <tr className='my-2 border border-black'><td className='p-3 border border-black'>Your Emergency Fund Coverage:</td><td className='p-3 font-bold'>{data.emergency_fund}</td></tr>
                            <tr className='my-2 border border-black'><td className='p-3 border border-black'>Your Invetment to Income Ratio:</td><td className='p-3 font-bold'>{data.investment_to_income}</td></tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div className='relative flex justify-center my-6'>
            <button onClick={handleSubmit} className='px-8 py-2 text-white rounded-xl bg-[#004D40] hover:bg-[#205f2f]'>Download Analysis</button>
        </div>
        <Footer />
    </div>
  )
}

export default Analysis;