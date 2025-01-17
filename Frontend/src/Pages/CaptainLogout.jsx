import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CaptainLogout() {
    const navigate=useNavigate()
    useEffect(()=>{
        localStorage.removeItem('token')
        navigate("/captain-login");

    },[navigate]
)
  return (
    <div>
      
    </div>
  )
}
