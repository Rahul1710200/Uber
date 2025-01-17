import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function UserLogout() {
    // const token=localStorage.getItem('token');
   const navigate= useNavigate()
useEffect(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);
  return (
    <div>
      logout
    </div>
  )
}

export default UserLogout
