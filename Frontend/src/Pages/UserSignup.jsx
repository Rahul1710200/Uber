import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from "lucide-react";
import { UserDataContext } from '../Context/UserContext';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
     const [showPassword, setShowPassword] = useState(false);
  
  const [error2, setError2] = useState("")
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
   
    setError("");
    setError2("")
    if(password.length<6){
      setError("Password must be at least 6 characters long")
      return;
    } 
     setLoading(true);
    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    };
    console.log('User data:', newUser);
try{
   const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/register`,
      newUser
    );
    console.log("res",response);

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
       localStorage.setItem("token",data.token);
      navigate('/home');
    }

    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');

}catch(error){
  if (error.response && error.response.status === 400) {
    // Handle the user already exists error
    setError2(error.response.data.message || "Registration failed");
  } else {
    setError2("An error occurred during registration");
  }
}
  finally{
      setLoading(false)

    }

   
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col  items-center">
          <img
            className="w-16 mb-6"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
            alt="User Signup"
          />

          <form onSubmit={(e) => submitHandler(e)} className="w-full">
            {error2 ? (
              <div className="text-red-500 lg:text-[1.8vw] lg:w-full text-[5vw] font-semibold lg:ml-[3.5vw] ml-[18vw]">
                {error2}
              </div>
            ) : (
              ""
            )}
            <h3 className="text-lg font-medium mb-2">What's your name?</h3>
            <div className="flex flex-col lg:flex-row gap-4 mb-7">
              <input
                required
                className="bg-[#eeeeee] w-full lg:w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => {
                  setError2("");

                  setFirstName(e.target.value);
                }}
              />
              <input
                required
                className="bg-[#eeeeee] w-full lg:w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => {
                  setError2("");

                  setLastName(e.target.value);
                }}
              />
            </div>

            <h3 className="text-lg font-medium mb-2">What's your email?</h3>
            <input
              required
              value={email}
              onChange={(e) => {
                setError2("");
                setEmail(e.target.value);
              }}
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
            />

            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <div className="relative">
              <input
                required
                value={password}
                onChange={(e) => {
                  setError2("");
                  setError("");
                  setPassword(e.target.value);
                }}
                className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                type={showPassword ? "text" : "password"}
                placeholder="password"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer  top-[14px] right-[20px]  z-10"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            {error ? (
              <div className="text-red-500 text-[4.5vw] lg:text-[1.2vw] mb-[1vw] font-semibold">
                {error}
              </div>
            ) : (
              ""
            )}

            <button className="transform transition-transform duration-150 active:scale-95 bg-[#111] text-white font-semibold rounded-lg px-4 py-2 w-full text-lg">
              Create account
            </button>
          </form>
          {loading ? (
            <div className="flex justify-center gap-2 lg:mb-[1vw] mb-[7vw] items-center ">
              <span className=" text-green-400 text-2xl">Signing in</span>
              <div className="w-4 h-4 bg-green-400 rounded-full animate-bounceDots"></div>
              <div className="w-4 h-4 bg-green-400 rounded-full animate-bounceDots delay-[200ms]"></div>
              <div className="w-4 h-4 bg-green-400 rounded-full animate-bounceDots delay-[400ms]"></div>
            </div>
          ) : (
            " "
          )}

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>
        <div className="text-center text-sm text-gray-500 mt-6">
          <p>
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service</span> apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
