import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Details() {
    const location = useLocation();
    const navigate = useNavigate();
    const data = {...location.state};
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [savings, setSavings] = useState(0);
    const [debts, setDebts] = useState(0);
    const [dependents, setDependents] = useState(0);
    const [invest_value, setInvest_value] = useState(0);
    const [asset, setAsset] = useState(0);
    const [credit_score, setCredit_score] = useState(0);
    const handleSubmit = (e) =>{
        e.preventDefault();
        const debt_to_income = parseFloat((debts / (income * 12)).toFixed(2));
        const debt_to_asset =  parseFloat((debts / asset).toFixed(2));
        const emergency_fund = parseFloat((savings / (income * 6)).toFixed(2));
        const investment_to_income = parseFloat((invest_value / (income * 12)).toFixed(2));
        const updated_data = {
            ...data,
            monthly_income: income,
            monthly_expense: expense,
            total_savings: savings,
            total_debts: debts,
            dependents: dependents,
            invested_value: invest_value,
            total_assets: asset,
            credit_score: credit_score,
            debt_to_income,
            debt_to_asset,
            emergency_fund,
            investment_to_income,
            score: calculate_score(debt_to_income, credit_score, savings, expense, invest_value, dependents, debt_to_asset, emergency_fund, investment_to_income, income),
        }
        axios.post('http://localhost:3001/signup', updated_data)
        .then(res =>{
            console.log(res);
            if(res.data.message === "success"){
                navigate('/homepage', {state: res.data.userId});
            }
            else{
                console.log(res.data);
            }
        })
        .catch(err => console.log(err));
    }

    const calculate_score = (dti, cs, savings, expense, invest_value, dependents, dtoa, emergency_fund, itoi, income) =>{
        let ss = 40, is = 40, dp = 0;
        if(savings >= (expense*6)){
            ss = 100;
        }
        else if(savings >= (expense*3)){
            ss = 80;
        }
        else if(savings >= (expense*2)){
            ss = 60;
        }
        else{
            ss = 40;
        }
        if(invest_value >= (income * 5)){
            is = 100;
        }
        else if(invest_value >= (income * 3)){
            is = 80;
        }
        else if(invest_value >= (income * 2)){
            is = 60;
        }
        else{
            is = 40;
        }
        if(dependents >= 3){
            dp = 10;
        }
        const total = ((dti*0.15) + (cs*0.15) + (ss*0.15) + (is*0.15) + (dtoa*0.15) + (emergency_fund*0.1) + (itoi * 0.1)) - (dp*0.05);
        return Math.min(99, total.toFixed(2));
    }
  return (
    <div className='justify-center block min-h-screen lg:flex bg-[url(src/assets/bg.jpeg)] bg-cover py-6 lg:py-10'>
        <form onSubmit={handleSubmit} className='w-4/5 ml-10 lg:ml-0 px-10 rounded-t-xl lg:rounded-e-xl lg:rounded-r-none rounded-s-none lg:rounded-s-xl py-6 lg:py-4 bg-[#DFF5F2] lg:w-1/3'>
            <h2 className='mt-3 mb-5 text-xl font-bold text-center text-[#004D40]'>ENTER DETAILS TO CONTINUE</h2>
            <div className='my-5'>
                <label className='text-lg text-[#004D40] mb-4'>Monthly Income:</label>
                <input type='text' placeholder='Enter your average monthly income:' className='w-full border border-[#80CBC4] h-10 px-2 bg-white rounded-lg placeholder:text-gray mt-2' onChange={(e)=>{setIncome(e.target.value)}} />
            </div>
            <div className='my-5'>
                <label className='text-lg text-[#004D40] mb-4'>Monthly Expense:</label>
                <input type='text' placeholder='Enter your average monthly expense:' className='w-full border border-[#80CBC4] h-10 px-2 bg-white rounded-lg placeholder:text-gray mt-2' onChange={(e)=>{setExpense(e.target.value)}} />
            </div>
            <div className='my-5'>
                <label className='text-lg text-[#004D40] mb-4'>Savings:</label>
                <input type='text' placeholder='Enter your savings:' className='w-full border border-[#80CBC4] h-10 px-2 bg-white rounded-lg placeholder:text-gray mt-2' onChange={(e)=>{setSavings(e.target.value)}} />
            </div>
            <div className='my-5'>
                <label className='text-lg text-[#004D40] mb-4'>Debts:</label>
                <input type='text' placeholder='Enter your total debts:' className='w-full border border-[#80CBC4] h-10 px-2 bg-white rounded-lg placeholder:text-gray mt-2' onChange={(e)=>{setDebts(e.target.value)}} />
            </div>
            <div className='my-5'>
                <label className='text-lg text-[#004D40] mb-4'>Depandents:</label>
                <input type='text' placeholder='Enter number of people depend on you:' className='w-full border border-[#80CBC4] h-10 px-2 bg-white rounded-lg placeholder:text-gray mt-2' onChange={(e)=>{setDependents(e.target.value)}} />
            </div>
            <div className='my-5'>
                <label className='text-lg text-[#004D40] mb-4'>Amount in investment:</label>
                <input type='text' placeholder='Enter total amount invested:' className='w-full border border-[#80CBC4] h-10 px-2 bg-white rounded-lg placeholder:text-gray mt-2' onChange={(e)=>{setInvest_value(e.target.value)}} />
            </div>
            <div className='my-5'>
                <label className='text-lg text-[#004D40] mb-4'>Asset value:</label>
                <input type='text' placeholder='If any:' className='w-full border border-[#80CBC4] h-10 px-2 bg-white rounded-lg placeholder:text-gray mt-2' onChange={(e)=>{setAsset(e.target.value)}} />
            </div>
            <div className='my-5'>
                <label className='text-lg text-[#004D40] mb-4'>Credit Score:</label>
                <input type='text' placeholder='Enter your credit score:' className='w-full border border-[#80CBC4] h-10 px-2 bg-white rounded-lg placeholder:text-gray mt-2' onChange={(e)=>{setCredit_score(e.target.value)}} />
                <p className='text-sm text-[#004D40] mb-2'>To find you credit score: <Link to="https://www.paisabazaar.com/cibil-credit-report/">Click here</Link></p>
            </div>
            <div className='flex justify-center mt-8'>
                <button className='px-14 py-2 text-white rounded-xl bg-[#00C853] hover:bg-[#009624]'>SUBMIT</button>
            </div>  
        </form>
    </div>
  )
}

export default Details;