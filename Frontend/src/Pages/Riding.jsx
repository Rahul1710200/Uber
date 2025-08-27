import React from "react";
import { Link, useLocation } from "react-router-dom"; // Added useLocation
import {  useContext } from "react";
import { useNavigate } from "react-router-dom";

import { SocketContext } from "../Context/SocketContext";
import axios from "axios";
// import LiveTracking from "../components/LiveTracking";




const Riding = (props) => {

  const loadRazorpayscript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };



  
const handlePayment = async () => {
  const script = await loadRazorpayscript();
  if (!script) {
    alert("Razorpay SDK failed to load. Check your internet");
    return;
  }

  try{
     const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/payment/create-payment`,
    {
      amount: ride?.fare,
      currency: "INR",
    }
  );

  const options = {
    key: import.meta.env.VITE_RAZORPAY_ID,
    amount: ride?.fare,
    currency: "INR",
    name: "Uber Clone",
    description: "Ride  Payment",
    order_id: data.orderId,
    handler: async (response) => {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/payment/verify-payment`,
        {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }
      );

      alert("Payment successful"),
       navigate("/home");
    },

    theme:{color:"#3399cc"}
  };

  const razorpay=new window.Razorpay(options)
  razorpay.open()

  }catch(err){
    console.error("Error processing payment",err)
  }
};




  console.log("riding props",props);
  const location = useLocation();
  const { ride } = location.state || {};
  console.log("ride data",ride  );
   // Retrieve ride data
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on("ride-ended", () => {
    navigate("/home");
  });

  return (
    <div className="h-screen lg:w-[100vw] flex  flex-col items-center bg-gray-100 ">
      <div className="bg-white ">
        <Link
          to="/home"
          className="fixed right-2 top-2 h-10 w-10  flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-home-5-line"></i>
        </Link>
        <div className="h-[85vw] lg:h-[26vw]  bg-white lg:w-[31.5vw] ">
          <img
            className="w-full h-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPsQfKVcmFKoAydx-uqkFICDgldRDQcCe1dA&s"
            alt="Uber logo"
          />
        </div>

        <div className="h-[20vw] p-4  bg-white">
          <div className="flex items-center justify-between">
            <img
              className="h-12"
              src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
              alt=""
            />
            <div className="text-right">
              <h2 className="text-lg font-medium capitalize">
                {ride?.captain?.fullName?.firstName +
                  " " +
                  ride?.captain?.fullName.lastName}
              </h2>
              <h4 className="text-[4.5vw] lg:text-[1.5vw] font-normal -mt-1 -mb-1">
                <span className="text-[5vw] lg:text-[1.5vw] font-semibold">
                  {" "}
                  Plate no-{" "}
                </span>{" "}
                {ride?.captain?.vehicle?.plate}
              </h4>
              {/* <p className="text-sm text-gray-600">Maruti Suzuki Alto</p> */}
            </div>
          </div>

          <div className="flex gap-2 justify-between flex-col items-center">
            <div className="w-full mt-5">
              <div className="flex items-center gap-5 p-3 border-b-2">
                <i className="text-lg ri-map-pin-2-fill"></i>
                <div>
                  <h3 className="text-lg font-medium">{ride?.destination}</h3>
                  {/* <p className="text-sm -mt-1 text-gray-600">ahmedabad </p> */}
                </div>
              </div>
              <div className="flex items-center gap-5 p-3">
                <i className="ri-currency-line"></i>
                <div>
                  <h3 className="text-lg font-medium">{ride?.fare}</h3>
                  <p className="text-sm -mt-1 text-gray-600">Cash</p>
                </div>
              </div>
            </div>
          </div>
          <button onClick={handlePayment} className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
