import React, { useRef, useState } from "react";
import axios from 'axios'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import Vehiclepanel from "../Components/Vehiclepanel";
import ConfirmRide from "../Components/ConfirmRide";
import WaitFordriver from "../Components/WaitFordriver";
import debounce from "lodash.debounce";

// import LookingFordriver from "../Components/LookingFordriver";

export default function Home() {
  const [pickup, setPickup] = useState("");
  const [locations, setLocations] = useState([]);
  const [destination, setDestination] = useState("");
  const [vehicleType, setVehicleType] = useState("")
  const [panelOpen, setpanelOpen] = useState(false);
  const [activeField, setActiveField] = useState(""); // Could be "pickup" or "destination"

  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [fare, setFare] = useState({})
  const [pickUpSuggestions, setPickUpSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const vehiclePanelRef = useRef(null);
  const panelRef = useRef();
  const panelCloseRef = useRef();
  const confirmRidePanelRef = useRef();
  const vehicleFoundRef = useRef();
  const waitingForDriverRef = useRef();

 

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: query },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      return [];
    }
  };

  const debouncedFetchPickupSuggestions = debounce(async (value) => {
    if (value.trim().length < 3) {
      // Don't make the request if the input is less than 3 characters
      setLocations([]);
      return;
    }
    const suggestions = await fetchSuggestions(value);
    console.log("sugg", suggestions);
    setLocations([]);
    setLocations(suggestions);
  }, 100);

  const debouncedFetchDestinationSuggestions = debounce(async (value) => {
    if (value.trim().length < 3) {
      // Don't make the request if the input is less than 3 characters
      setLocations([]);
      return;
    }
    const suggestions = await fetchSuggestions(value);
    console.log("sugg", suggestions);
    setLocations([]);
    setLocations(suggestions);
  }, 100);

  const setCurrentLocation = () => {};
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

   const submitHandler = async () => {
   

     try {
       const response = await axios.post(
         `${import.meta.env.VITE_BASE_URL}/ride/getfare`,
         
            { pickup, destination }, 
            {
             headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`,
           },
          }
         
       );
       console.log("fare", response);
       setFare(response)

       return response;
     } catch (error) {
       console.error("Error fetching suggestions:", error);
     }
   };
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
          <div className="h-[33%] bg-white p-5 relative ">
            <h5
              onClick={() => {
                setpanelOpen(false);
              }}
              ref={panelCloseRef}
              className="absolute right-6 opacity-0 cursor-pointer top-[6vw] lg:top-[1.5vw] text-3xl"
            >
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h4 className="text-2xl font-semibold">Find a trip</h4>
            <form
            
              className="relative py-3"
            >
              <div className="line absolute h-16 w-1 top-[35%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
                type="text"
                onClick={() => {
                  setActiveField("pickup");
                  setCurrentLocation();
                  setpanelOpen(true);
                }}
                value={pickup}
                onChange={(e) => {
                  setPickup(e.target.value);
                  debouncedFetchPickupSuggestions(e.target.value);
                }}
                placeholder="Add a pick-up location"
              />
              <input
                onClick={() => {
               setActiveField("destination");
                  setpanelOpen(true);
                }}
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  debouncedFetchDestinationSuggestions(e.target.value);
                }}
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
                type="text"
                placeholder="Enter your destination"
              />
              <button
              onClick={(e)=>{
                e.preventDefault()
                  setVehiclePanel(true);
                  setpanelOpen(false);
                submitHandler()
                
              }}
           
                className="mt-[2vw]  lg:mt-[0.5vw] w-full  rounded-md bg-black text-white py-[2vw] lg:py-[0.6vw] px-[0.6vw]"
              >
              
                Find a Trip
              </button>
            </form>
          </div>
          <div ref={panelRef} className="h-[0%] bg-white  ">
            <LocationSearchPanel
            setPickup={setPickup}
            setDestination={setDestination}
             activeField={activeField}
              locations={locations}
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
          setVehicleType={setVehicleType}
           fare={fare}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
        <div
          ref={confirmRidePanelRef}
          className="fixed lg:w-[30vw] h-[120vw] lg:h-[31vw]  w-full  translate-y-full  z-10 bottom-0 bg-white px-3 py-5"
        >
          <ConfirmRide
          fare={fare}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
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
