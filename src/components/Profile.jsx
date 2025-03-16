import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';

function Profile() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const id = data._id;

  const goToHome = () =>{
    console.log("going to home");
    navigate('/homepage', {state: id});
  }

  const goToDashboard = () =>{
    navigate('/dashboard', {state: data});
  }

  const goToAnalysis = () =>{
    navigate('/analysis', {state: data});
  }

  const handleLogOut = () =>{
    localStorage.removeItem('token');
    navigate('/');
  }

  const [formdata, setFormdata] = useState({
    name: data.name,
    email: data.email,
    password: data.password,
    monthly_income: data.monthly_income,
    monthly_expense: data.monthly_expense,
    total_savings: data.total_savings,
    total_debts: data.total_debts,
    dependents: data.dependents,
    invested_value: data.invested_value,
    total_assets: data.total_assets,
    credit_score: data.credit_score,
    debt_to_income: data.debt_to_income,
    debt_to_asset: data.debt_to_asset,
    emergency_fund: data.emergency_fund,
    investment_to_income: data.investment_to_income,
    score: data.score,
  });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formdata);
    formdata.score = calculate_score(formdata.debt_to_income, formdata.credit_score, formdata.total_savings, formdata.monthly_expense, formdata.invested_value, formdata.dependents, formdata.debt_to_asset, formdata.emergency_fund, formdata.investment_to_income, formdata.monthly_income);
    axios.post('http://localhost:3001/update', {id, ...formdata})
    .then(res =>{
      if(res){
        navigate('/homepage', {state: id});
      }
    })
    .catch(err =>{
        console.log(err);
    })
  };

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
    <div className='w-full min-h-screen bg-[url(src/assets/bg.jpeg)] bg-cover'>
      <div className='flex justify-between w-full px-4 py-6 bg-[#004D40] text-[#ffffff] border-b border-black'>
            <div className='ml-2 lg:ml-6'>
                <h1 className='text-xl font-bold lg:text-3xl'>Insight Invest</h1>
            </div>
            <div className='flex gap-6 mr-2 lg:mr-6 lg:gap-10'>
                <div onClick={goToDashboard} className="relative hidden cursor-pointer lg:block top-2">Dashboard</div>
                <div onClick={goToAnalysis} className='relative hidden cursor-pointer lg:block top-2'>Analysis</div>
                <div onClick={goToHome} className='relative hidden cursor-pointer lg:block top-2'>Home</div>
                <div onClick={handleLogOut} className='px-4 lg:px-10 py-2 bg-[#FFC107] hover:bg-[#FFB300]  text-[#333333] rounded-xl'>Log out</div>
            </div>
        </div>
      
      <div className='flex justify-center py-5'>
        <div> 
          <form onSubmit={handleSubmit} className='w-4/5 ml-10 lg:ml-0 px-10 rounded-xl py-6 lg:py-4 bg-[#DFF5F2] lg:w-full'>
            <h2 className='mt-3 mb-5 text-xl font-bold text-center text-[#004D40]'>UPDATE CHANGED DATA</h2>
            {[
              { label: "Monthly Income", name: "monthly_income" },
              { label: "Monthly Expense", name: "monthly_expense" },
              { label: "Savings", name: "total_savings" },
              { label: "Debts", name: "total_debts" },
              { label: "Dependents", name: "dependents" },
              { label: "Amount in Investment", name: "invested_value" },
              { label: "Asset Value", name: "total_assets" },
              { label: "Credit Score", name: "credit_score" }
            ].map(({ label, name }) => (
              <div className='my-5' key={name}>
                <label className='text-lg text-[#004D40] mb-4'>{label}:</label>
                <input 
                  type='text' 
                  name={name} 
                  placeholder={`Enter ${label.toLowerCase()}`}
                  value={formdata[name]}  
                  className='w-full border border-[#80CBC4] h-10 px-2 bg-white rounded-lg placeholder:text-gray mt-2' 
                  onChange={handleChange} 
                />
              </div>
            ))}

            <div className='text-sm text-[#004D40] mb-2'>
              To find your credit score: <Link to="https://www.paisabazaar.com/cibil-credit-report/">Click here</Link>
            </div>

            <div className='flex justify-center mt-8'>
              <button type="submit" className='px-14 py-2 text-white rounded-xl bg-[#00C853] hover:bg-[#009624]'>SUBMIT</button>
            </div>  
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
