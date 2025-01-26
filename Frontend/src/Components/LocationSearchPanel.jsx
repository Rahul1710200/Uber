import React from "react";

function LocationSearchPanel(props) {

    const handleSuggestionClick = (elem) => {
      if (props.activeField ==="pickup") {
        // If setPickup is passed, update the pickup field
        props.setPickup(elem);
      } else  {
        // If setDestination is passed, update the destination field
        props.setDestination(elem);
      }
    };
  return (
    <div className=" h-[100vh]">
      {/* Display fetched suggestions */}
      {props.locations.data?.map((elem, idx) => (
        <div
          key={idx}
          onClick={() => {
            handleSuggestionClick(elem)
            // props.setVehiclePanel(true);
            // props.setPanelOpen(false);
          }}
          className="flex gap-4 border-2 p-4 border-gray-300 rounded-xl items-center my-2 justify-start hover:border-black transition-all"
        >
          <div className="bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full">
            <i className="ri-map-pin-fill text-xl"></i>
          </div>
          <div className="flex-grow">
            <h4 className="font-medium text-lg text-gray-800 line-clamp-2">
              {elem}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LocationSearchPanel;
