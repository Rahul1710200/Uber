import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../Context/UserContext';
import axios from 'axios';

function UserLogin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("")
     setLoading(true);

    const userdata = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userdata);
      if (response.status === 201) {
        console.log(response);
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token",data.token);
        navigate('/home');
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally{
      setLoading(false)

    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between items-center bg-gray-100">
      <div className="w-full max-w-md lg:max-w-lg flex flex-col items-center bg-white rounded-lg shadow-md p-6">
        <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt=""
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
            placeholder="email@example.com"
          />
          {error && (
            <p className="text-red-500 lg:text-[1.2vw] text-[3.5vw]  font-semibold  mb-4">
              {error}
            </p>
          )}
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            value={password}
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
            required
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base transform transition-transform duration-150 active:scale-95">
            Login
          </button>
        </form>

        <p className="text-center">
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center gap-2 lg:mb-[1vw] mb-[7vw] items-center ">
          <span className=" text-green-400 text-2xl">Logging In</span>
          <div className="w-4 h-4 bg-green-400 rounded-full animate-bounceDots"></div>
          <div className="w-4 h-4 bg-green-400 rounded-full animate-bounceDots delay-[200ms]"></div>
          <div className="w-4 h-4 bg-green-400 rounded-full animate-bounceDots delay-[400ms]"></div>
        </div>
      ) : (
        " "
      )}
      <div className="w-full  max-w-md lg:max-w-lg mt-4">
        <Link
          to="/captain-login"
          className=" transform transition-transform duration-150 active:scale-95 bg-[#10b461] lg:mb-[0.2vw]  mb-[8vw] flex items-center justify-center text-white font-semibold rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
}

export default UserLogin;
