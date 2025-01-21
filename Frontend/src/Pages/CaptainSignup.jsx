import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useCaptain} from '../Context/CaptainContext';
import {useNavigate} from 'react-router-dom';

const CaptainSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [error2, setError2] = useState("")
    const [error3, setError3] = useState("")
  const [lastName, setLastName] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const {captain,setCaptain}=useCaptain()
  
  const navigate=useNavigate()
  

  const submitHandler = async (e) => {

    e.preventDefault();
     setError("");
     setError2("");
     setError3("");
       if (password.length < 6) {
         setError("Password must be at least 6 characters long");
         return;
       } 
     if (vehicleCapacity>4){
       setError3("vehicle capacity must be at most 4");
       return;

     }
         setLoading(true);

     
    const captainData = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };
    console.log(captainData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/register`,
        captainData
      );
      console.log("ress", response);

      if (response.status === 201) {
        setCaptain(response.data.captain);
        localStorage.setItem("token", response.data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle the user already exists error
        setError2(error.response.data.message || "Registration failed");
      } else {
        setError2("An error occurred during registration");
      }
    }finally{
      setLoading(false)
    }
          
      


    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  };

  useEffect(()=>{
    console.log("captain",captain);

  
  },[captain])

  return (
    <div className=" px-5 h-screen flex flex-col items-center justify-between bg-gray-100">
      <div className="w-full max-w-md lg:max-w-lg bg-white rounded-lg shadow-md px-6">
        <img
          className="w-20 mb-3 mx-auto"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber Driver Logo"
        />

        <form onSubmit={(e) => submitHandler(e)} className="w-full">
          {error2 ? (
            <div className="text-red-500 lg:text-[1.8vw] lg:w-full text-[5vw] font-semibold lg:ml-[8vw]  ml-[18vw]">
              {error2}
            </div>
          ) : (
            ""
          )}
          <h3 className="text-lg font-medium mb-2">
            What's our Captain's name
          </h3>
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

          <h3 className="text-lg font-medium mb-2">
            What's our Captain's email
          </h3>
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
          <input
            required
            value={password}
            onChange={(e) => {
              setError2("");
              setError("");
              setPassword(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />

          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex flex-col lg:flex-row gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-full lg:w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
              required
              className="bg-[#eeeeee] w-full lg:w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-full lg:w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="number"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => {
                setError3("");
                setVehicleCapacity(e.target.value);
              }}
            />

            <select
              required
              className="bg-[#eeeeee] w-full lg:w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>
          {error ? (
            <div className="text-red-500 text-[4.5vw] lg:text-[1.2vw] mb-[1vw] font-semibold">
              {error}
            </div>
          ) : (
            ""
          )}
          {error3 ? (
            <div className="text-red-500 text-[4.5vw] lg:text-[1.2vw] mb-[1vw] font-semibold">
              {error3}
            </div>
          ) : (
            ""
          )}

          {loading ? (
            <div className="flex justify-center gap-2 lg:mb-[1vw] mb-[7vw] items-center ">
              <span className=" text-green-400 text-2xl">Logging In</span>
              <div className="w-4 h-4 bg-green-400 rounded-full animate-bounceDots"></div>
              <div className="w-4 h-4 bg-green-400 rounded-full animate-bounceDots delay-[200ms]"></div>
              <div className="w-4 h-4 bg-green-400 rounded-full animate-bounceDots delay-[400ms]"></div>
            </div>
          ) : (
            ""
          )}

          <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
            Create Captain Account
          </button>
        </form>

        <p className="text-center">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div className="text-center text-sm text-gray-500 mt-4">
        <p>
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service</span> apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
