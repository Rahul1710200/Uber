import React, { useContext,useEffect } from 'react'
import { UserDataContext } from '../Context/UserContext'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios';


export default function UserProtectedWrapper({children}) {

    const {user,setUser}=useContext(UserDataContext)
    
  //   const navigate=useNavigate();
  //  useEffect(() => {
  //   if (!user.email) {
  //     navigate('/login'); // Redirect as a side effect when the component mounts
  //   }
  // }, [user, navigate]);

  // Prevent rendering protected content if the user is not authenticated
  // if (!user) {
  //   return null; // Optionally display a loading spinner or placeholder here
  // }

  const token=localStorage.getItem('token');
  const navigate=useNavigate();
  console.log();
 
useEffect(() => {
  // Redirect to login if no token
  if (!token) {
    navigate("/login");
    return;
  }

  // Fetch captain profile
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/User/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("resss", response);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching captain profile:", error);
      // localStorage.removeItem("token");
      navigate("/login");
    }
  };

  fetchUserProfile();
}, [token, navigate, setUser]);

 

  return (
    <>
      {children}
    </>
  )
}
