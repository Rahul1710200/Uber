import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import CaptainDetails from '../Components/CaptainDetails';
import RidePopUp from '../Components/RidePopUp';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp';
import {SocketContext} from "../Context/SocketContext"
import { CaptainDataContext } from '../Context/CaptainContext';

function CaptainHome() {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [passenger, setPassenger] = useState("")
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopupPanelRef = useRef();
  const confirmRidePopupPanelRef = useRef();

  const {socket}=useContext(SocketContext)
  const {captain}=useContext(CaptainDataContext)

    async function confirmRide() {
      console.log("ride",ride);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/confirm`,
        {
          rideId: ride._id,
          captainId: captain._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("response confrim ride",response.data);
      setPassenger(response.data);

      setRidePopupPanel(false);
      setConfirmRidePopupPanel(true);
    }

    useEffect(()=>{
      console.log("capatin",captain);
      socket.emit("join", {  userId: captain?._id,userType: "captain" });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("pppptt",{userId: captain?._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }});
          socket.emit("update-location-captain", {
            userId: captain?._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };
     const locationInterval = setInterval(updateLocation, 10000);
     updateLocation();
  },[captain,socket])

  socket.on('new-ride',(data)=>{
    console.log("ddddd",data);
    setRide(data)
    setRidePopupPanel(true)
  })

      useGSAP(
        function () {
          if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
              transform: "translateY(0)",
            });
          } else {
            gsap.to(confirmRidePopupPanelRef.current, {
              transform: "translateY(100%)",
            });
          }
        },
        [confirmRidePopupPanel]
      );
      useGSAP(
        function () {
          if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
              transform: "translateY(0)",
            });
          } else {
            gsap.to(ridePopupPanelRef.current, {
              transform: "translateY(100%)",
            });
          }
        },
        [ridePopupPanel]
      );

  return (
    <div className="h-screen w-full flex justify-center">
      <div className="lg:w-[30vw]  ">
        <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
          <img
            className="w-16"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt=""
          />
          <Link
            to="/captain-home"
            className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
          >
            <i className="text-lg font-medium ri-logout-box-r-line"></i>
          </Link>
        </div>
        <div className="h-3/5">
          <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt=""
          />
        </div>
        <div className="h-2/5 p-6 ">
          <CaptainDetails />
        </div>
        <div
          ref={ridePopupPanelRef}
          className="fixed md:w-[50vw] w-[100vw]   lg:w-[30vw]  z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
        >
          <RidePopUp
            ride={ride}
            setRidePopupPanel={setRidePopupPanel}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            confirmRide={confirmRide} 
          />
        </div>
        <div
          ref={confirmRidePopupPanelRef}
          className="fixed md:w-[50vw]  lg:w-[30vw] w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
        >
          <ConfirmRidePopUp
          passenger={passenger}
            ride={ride}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            setRidePopupPanel={setRidePopupPanel}
          />
        </div>
      </div>
    </div>
  );
}

export default CaptainHome
