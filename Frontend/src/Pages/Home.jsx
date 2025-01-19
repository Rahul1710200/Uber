import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import Vehiclepanel from "../Components/Vehiclepanel";
import ConfirmRide from "../Components/ConfirmRide";
import WaitFordriver from "../Components/WaitFordriver";
// import LookingFordriver from "../Components/LookingFordriver";

export default function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const vehiclePanelRef = useRef(null);
  const panelRef = useRef();
  const panelCloseRef = useRef();
  const confirmRidePanelRef=useRef()
  const vehicleFoundRef=useRef()
  const waitingForDriverRef=useRef()

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const setCurrentLocation=()=>{
    setPickup("Current location")

  }
  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]);
  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);
  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanel]);
  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
      });
      gsap.to(panelCloseRef.current, {
        opacity: "1",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
      });
      gsap.to(panelCloseRef.current, {
        opacity: "0",
      });
    }
  }, [panelOpen]);
  return (
    <div className="h-screen w-full    flex    justify-center bg-gray-100  overflow-hidden">
      <div className="lg:h-[80vw] relative lg:w-[30vw] ">
        <img
          className="w-16 lg:w-[4vw] lg:h-[2vw] absolute left-5 top-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className="lg:h-[36vw] lg:w-[30vw]  h-screen w-screen">
          <img
            className="w-full h-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt="Uber logo"
          />
        </div>
        <div className="flex flex-col justify-end  absolute  h-screen top-0 lg:w-[30vw]  w-full">
          <div className="h-[30%] bg-white p-5 relative ">
            <h5
              onClick={() => {
                setpanelOpen(false);
              }}
              ref={panelCloseRef}
              className="absolute right-6 opacity-0 cursor-pointer top-[6vw] text-2xl"
            >
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h4 className="text-2xl font-semibold">Find a trip</h4>
            <form
              onSubmit={(e) => {
                submitHandler(e);
              }}
              className="relative py-3"
            >
              <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
                type="text"
                onClick={() => {
                  setCurrentLocation();
                  setpanelOpen(true);
                }}
                value={pickup}
                onChange={(e) => {
                  setPickup(e.target.value);
                }}
                placeholder="Add a pick-up location"
              />
              <input
                onClick={() => {
                  setpanelOpen(true);
                }}
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                }}
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
                type="text"
                placeholder="Enter your destination"
              />
            </form>
          </div>
          <div ref={panelRef} className="h-[0%] bg-white  ">
            <LocationSearchPanel
              setPanelOpen={setpanelOpen}
              vehiclePanel={vehiclePanel}
              setVehiclePanel={setVehiclePanel}
            />
          </div>
        </div>
        <div
          ref={vehiclePanelRef}
          className="fixed  w-full lg:w-[30vw] lg:h-[30vw] translate-y-full  z-10 bottom-0 bg-white px-3 py-5"
        >
          <Vehiclepanel
            setConfirmRidePanel={setConfirmRidePanel}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
        <div
          ref={confirmRidePanelRef}
          className="fixed lg:w-[30vw]  w-full  translate-y-full  z-10 bottom-0 bg-white px-3 py-5"
        >
          <ConfirmRide
            setVehiclePanel={setVehiclePanel}
            setConfirmRidePanel={setConfirmRidePanel}
            setWaitingForDriver={setWaitingForDriver}
          />
        </div>

        {/* <div
        ref={vehicleFoundRef}
        className="fixed  w-full  translate-y-full  z-10 bottom-0 bg-white px-3 py-5"
      >
        <LookingFordriver setVehicleFound={setVehicleFound} />
      </div> */}
        <div
          ref={waitingForDriverRef}
          className="fixed  w-full lg:w-[30vw]  translate-y-full  z-10 bottom-0 bg-white px-3 py-5"
        >
          <WaitFordriver setWaitingForDriver={setWaitingForDriver} />
        </div>
      </div>
    </div>
  );
}
