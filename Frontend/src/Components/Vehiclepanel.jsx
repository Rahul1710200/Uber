import React from 'react'

function Vehiclepanel(props) {
  return (
    <div>
      <h5
        className="p-1 w-[93%] h-[10vw] text-center  "
        onClick={() => {
          props.setVehiclePanel(false);
        }}
      >
        <i className=" text-2xl text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-xl font-semibold ">Choose a vehicle</h3>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true)
          props.setVehiclePanel(false)
        }}
        className="flex border-2 py-2 px-1 active:border-black rounded-xl w-full items-center justify-between"
      >
        <img
          className="h-[15vw] w-[20vw]"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
        />
        <div className="">
          <h4 className="font-medium text-lg flex items-center">
            Uber Go{" "}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[5vw] h-[5vw]"
              >
                <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z"></path>
              </svg>
            </span>
            4
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-gray-600 text-xs">
            Affordable compact rides
          </p>
        </div>
        <h2 className="text-[6vw] font-semibold">193.20</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className=" mt-[5vw] py-2 flex border-2 px-1 active:border-black rounded-xl w-full items-center justify-between"
      >
        <img
          className="h-[10vw] w-[15vw]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJw6dzEo1MYXOAbONCG1oL82rxU_Bitb-g&s"
        />
        <div className="">
          <h4 className="font-medium text-lg flex items-center">
            Uber Go{" "}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[5vw] h-[5vw]"
              >
                <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z"></path>
              </svg>
            </span>
            4
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-gray-600 text-xs">
            Affordable compact rides
          </p>
        </div>
        <h2 className="text-[6vw] font-semibold">193.20</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className=" mt-[5vw] py-2 flex border-2 px-1 active:border-black rounded-xl w-full items-center justify-between"
      >
        <img
          className="h-[10vw] w-[15vw]"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
        />
        <div className="">
          <h4 className="font-medium text-lg flex items-center">
            Uber Go{" "}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[5vw] h-[5vw]"
              >
                <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z"></path>
              </svg>
            </span>
            4
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-gray-600 text-xs">
            Affordable compact rides
          </p>
        </div>
        <h2 className="text-[6vw] font-semibold">193.20</h2>
      </div>
    </div>
  );
}

export default Vehiclepanel
