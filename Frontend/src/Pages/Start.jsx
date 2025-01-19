import React from 'react'
import uberimg from "../assets/Uber_logo.png"
import { Link } from 'react-router-dom'

function Start() {
  return (
    <div>
      <div className= '  bg-no-repeat lg:bg-[length:100%_105%] md:bg-[length:100%_90%] bg-[length:130%_90%]    h-screen w-full flex-col justify-between  flex bg-red-400 bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)]'>
    <img src={uberimg}  className='m-[5vw] lg:m-[3vw] w-[20vw] h-[9vw] lg:w-[15vw] lg:h-[6vw]  '></img>
        <div className='  bg-white pb-[10vw] pt-[2vw] flex flex-col items-center justify-center   px-[5vw] lg:pb-[1vw] '>
            <h2 className='lg:text-5xl lg:ml-[3vw] font-bold text-2xl'>Get Started with Uber</h2>
            <Link to='/login' className= ' lg:text-xl cursor-pointer flex items-center justify-center lg:w-[10vw] lg:py-[1vw]  w-full bg-black text-white py-[2vw]  px-[2vw] rounded lg:mt-[1vw] mt-[3vw]'>Continue</Link>
        </div>
    </div>
      
    </div>
  )
}

export default Start
