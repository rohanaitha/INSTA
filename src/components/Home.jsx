import React from 'react'
import Stories from './Stories'
import Navbar from './Navbar'
import Posts from './Posts'
import Profile from './Profile'
const Home = () => {
    


  return (
    <div className="flex flex-col justify-center items-center ">
        <Navbar/>
       <Stories/> 
      <Posts/>
    </div>
  )
}

export default Home
