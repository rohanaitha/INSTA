import React from 'react'
import Cookies  from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Login() {
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate()
    function handleInput(e){
        setUserName(e.target.value);
    }

    function handlePass(e){
      setPassword(e.target.value);
    }

    const handleLogin = async (e) => {
    e.preventDefault()
    console.log("Logging in with:", userName, password)
    const userDetails = {
      username: userName,
      password: password
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch("https://apis.ccbp.in/login", options)

    const data = await response.json()
    console.log(data);

    if (response.ok) {
      const jwtToken = data.jwt_token
      localStorage.setItem("jwt_token", jwtToken)
      navigate('/home')
    } else {
      setErrorMsg(data.error_msg)
    }
  }

  return (
    
    <div className=' h-182 flex justify-center items-center '>
      <div className='mr-25'>
        <img src='https://res.cloudinary.com/dak7gtph6/image/upload/v1752294671/Illustration_vud2ja.jpg'/>
      </div>
      <form onSubmit={handleLogin}>
      <div className='flex flex-col justify-center items-center ml-25 shadow-xl p-10 '>
        <div className='flex flex-col justify-center items-center mb-10'>
            <img src='https://res.cloudinary.com/dak7gtph6/image/upload/v1752295100/logo_n05zia.jpg'/>
            <h1 className='font-Roboto text-2xl'>Insta Share</h1>
        </div>
        
        <div className='flex flex-col justify-start items-start mb-4 '>
        <label className='pb-3'>UserName</label>
        <input value={userName} type='text' onChange={handleInput}  placeholder='Enter UserName' className='w-[360px] h-[40px] rounded-l bg-gray-200 p-3'/>
        </div>
        <div className='flex flex-col justify-start items-start mb-10'>
        <label className='pb-3'>Password</label>
        <input value={password} type='password' onChange={handlePass}  placeholder='Enter Password' className='w-[360px] h-[40px] rounded-l bg-gray-200 p-3'/>
        </div>
        <div><button type='submit' className='bg-[#4094EF] text-white w-[360px] h-[40px] rounded-xl'>Login</button></div>
        {errorMsg && <p className="text-red-500 mt-3">{errorMsg}</p>}
      </div>
      </form>
    </div>
  )
}

export default Login
