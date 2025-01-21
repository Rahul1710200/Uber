import React, { useContext, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {CaptainDataContext} from "../Context/CaptainContext"
import axios from 'axios';


const Captainlogin =  () => {
  const [email, setEmail] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("")
  
  const [password, setPassword] = useState('');

  const navigate=useNavigate()
  const {captain,setCaptain}=useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    
    e.preventDefault();
    setLoading(true)
    const captain = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/login`,
        captain
      );
      console.log("ress", response);

      if (response.status === 201) {
        setCaptain(response.data.captain);
        localStorage.setItem("token", response.data.token);
        navigate("/captain-home");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }

          

    setEmail('');
    setPassword('');
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between items-center bg-gray-100">
      <div className="w-full max-w-md lg:max-w-lg flex flex-col items-center bg-white rounded-lg shadow-md p-6">
        <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber Driver Logo"
        />

        <form onSubmit={(e) => submitHandler(e)} className="w-full">
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          {error && (
            <p className="text-red-500 lg:text-[1.2vw] text-[3.5vw]  font-semibold  mb-4">
              {error}
            </p>
          )}

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />

          <button className="transform transition-transform duration-150 active:scale-95 bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>

        <p className="text-center">
          Join a fleet?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Register as a Captain
          </Link>
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center gap-2 lg:mb-[7vw] mb-[9vw] items-center ">
          <span className=" text-green-400 text-2xl">Logging In</span>
          <div className="w-4 h-4 bg-green-400 rounded-full animate-bounceDots"></div>
          <div className="w-4 h-4 bg-green-400 rounded-full animate-bounceDots delay-[200ms]"></div>
          <div className="w-4 h-4 bg-green-400 rounded-full animate-bounceDots delay-[400ms]"></div>
        </div>
      ) : (
        ""
      )}

      <div className="  w-full max-w-md lg:max-w-lg mt-4">
        <Link
          to="/login"
          className="transform transition-transform duration-150 active:scale-95 bg-[#d5622d] flex items-center justify-center text-white font-semibold rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default Captainlogin;
