import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCaptain } from "../Context/CaptainContext";
import axios from "axios";

function CaptainProtectedWrapper({ children }) {
  const { captain, setCaptain } = useCaptain();
  // const { isLoading, setIsLoading } = useCaptain();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();


  
  useEffect(() => {
    // Redirect to login if no token
    if (!token) {
      navigate("/captain-login");
      return;
    }

    // Fetch captain profile
    const fetchCaptainProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captain/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log("resss",response);
          setCaptain(response.data.captain);
        }
      } catch (error) {
        console.error("Error fetching captain profile:", error);
        // localStorage.removeItem("token");
        navigate("/captain-login");
      }
    };

    fetchCaptainProfile();
  }, [token, navigate, setCaptain]);


  return <div>{children}</div>;
}

export default CaptainProtectedWrapper;
