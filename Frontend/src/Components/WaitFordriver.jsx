import React from 'react'

function WaitFordriver(props) {
  // console.log("prps",props?.captain);
  console.log("prps", props?.captain?.captain?.fullName.firsName);

  const otp = props?.captain?.otp;
  const mappedotp=otp?.split("")
  console.log("type",typeof otp);
  console.log("mappedotp", mappedotp);
  return (
    <div>

    <p className='font-semibold mb-[1vw] text-2xl'>Waiting for Driver</p>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setWaitingForDriver(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <div className="flex items-center justify-between">
        <img
          className="h-12"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-lg font-medium capitalize">
            {props?.captain?.captain?.fullName.firstName +props?.captain?.captain?.fullName.lastName}{" "}
          </h2>

          

          
          <h4 className="text-xl flex gap-1 pt-2 pb-2   font-semibold -mt-1 -mb-1">

          {mappedotp?.map((item,index)=>{
return <p className='w-6 h-6 border flex justify-center items-center border-gray-400' key={index}>{item}</p>
          })}
            {/* {props?.captain?.otp} */}
          </h4>
          <p className="text-sm text-gray-600"></p>
          <h1 className="text-lg font-semibold">
            {" "}
            {props?.captain?.captain?.vehicle?.plate}{" "}
          </h1>
        </div>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {props?.captain?.pickup}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">pickup</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {props?.captain?.destination}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">destination </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">
                {" "}
                {props?.captain?.fare}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitFordriver
