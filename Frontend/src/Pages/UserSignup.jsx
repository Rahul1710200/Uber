import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../Context/UserContext';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    };
    console.log('User data:', newUser);

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/register`,
      newUser
    );

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
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center">
          <img
            className="w-16 mb-6"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
            alt="User Signup"
          />

          <form onSubmit={(e) => submitHandler(e)} className="w-full">
            <h3 className="text-lg font-medium mb-2">What's your name?</h3>
            <div className="flex flex-col lg:flex-row gap-4 mb-7">
              <input
                required
                className="bg-[#eeeeee] w-full lg:w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                required
                className="bg-[#eeeeee] w-full lg:w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <h3 className="text-lg font-medium mb-2">What's your email?</h3>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
            />

            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              type="password"
              placeholder="password"
            />

            <button className="bg-[#111] text-white font-semibold rounded-lg px-4 py-2 w-full text-lg">
              Create account
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>
        <div className="text-center text-sm text-gray-500 mt-6">
          <p>
            This site is protected by reCAPTCHA and the{' '}
            <span className="underline">Google Privacy Policy</span> and{' '}
            <span className="underline">Terms of Service</span> apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
