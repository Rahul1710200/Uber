const axios = require("axios");
const captainModel = require("../model/captain.model");

module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.OPENCAGE_LOCATION_API_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

   try {
     const response = await axios.get(url);
     console.log("Response:", response.data);

     if (response.data.results && response.data.results.length > 0) {
       const location = response.data.results[0].geometry;
       return {
         lat: location.lat,
         lng: location.lng,
       };
     } else {
       throw new Error("Unable to fetch coordinates");
     }
   } catch (error) {
     console.error("Error fetching coordinates:", error.message);
     throw error;
   }
};
module.exports.getDistanceTimee = async (origin,destination) => {

    const { getAddressCoordinate } = module.exports; 


    if(!origin || !destination){
        throw new Error("origin and destination are required");
    }
    const apiKey = process.env.OPENROUTES_DISTANCE_API_KEY;
    const url = `https://api.openrouteservice.org/v2/directions/driving-car`;

    try {
      const origin1 = await getAddressCoordinate(origin);
      console.log("origin1",origin1); // Function to fetch coordinates
      // Function to fetch coordinates
      const destination1 = await getAddressCoordinate(destination);
       console.log("destination1", destination1);
      console.log("origin",origin);

      const requestData = {
        coordinates: [
          [origin1.lng, origin1.lat], // Origin (Longitude, Latitude)
          [destination1.lng, destination1.lat], // Destination (Longitude, Latitude)
        ],
      };

      console.log("cccc",requestData);

      const response = await axios.post(url, requestData, {
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
      });

      console.log("res",response.data.routes);

      // Extract distance and duration from the API response
      if (
        response.data &&
        response.data.routes &&
        response.data.routes.length > 0
      ) {
        const route = response.data.routes[0];
        const distance = route.summary.distance; // Distance in meters
        const duration = route.summary.duration; // Duration in seconds
        console.log("disss",distance,duration);

        return {
          distance: (distance / 1000).toFixed(2) + " km", // Convert to kilometers
          duration: (duration / 60).toFixed(2) + " mins", // Convert to minutes
        };
      } else {
        throw new Error("No routes found!");
      }
    } catch (error) {
      console.error("Error fetching distance and time:", error.message);
      throw error;
    }


     
};
// module.exports.getDistanceTimee = async (origin, destination) => {
//   const { getAddressCoordinate } = module.exports;

//   if (!origin || !destination) {
//     throw new Error("origin and destination are required");
//   }

//   const apiKey = process.env.LOCATIONIQ_API_KEY; // Replace with your LocationIQ API key
//   const baseUrl = `https://api.locationiq.com/v1/matrix/driving`;

//   try {
//     // Fetch coordinates for origin and destination
//     const originCoords = await getAddressCoordinate(origin);
//     const destinationCoords = await getAddressCoordinate(destination);

//     console.log("Origin coordinates:", originCoords);
//     console.log("Destination coordinates:", destinationCoords);

//     const startCoords = `${originCoords.lat},${originCoords.lng}`;
//     const endCoords = `${destinationCoords.lat},${destinationCoords.lng}`;

//     console.log("Start coordinates:", startCoords);
// console.log("End coordinates:", endCoords);

//     // Call LocationIQ's Matrix API
//     const response = await axios.get(`${baseUrl}/${startCoords};${endCoords}`, {
//       params: {
//         key: apiKey,
//         annotations: "distance,duration",
//       },
//     });

//     console.log("API response:", response.data);

//     // Extract distance and duration
//     const distances = response.data.distances[0][1]; // Distance in meters
//     const durations = response.data.durations[0][1]; // Duration in seconds

//     return {
//       distance: (distances / 1000).toFixed(2) + " km", // Convert to kilometers
//       duration: (durations / 60).toFixed(2) + " mins", // Convert to minutes
//     };
//   } catch (error) {
//     console.error("Error fetching distance and time:", error.message);
//     throw new Error("Failed to calculate distance and time");
//   }
// };


module.exports.getSuggestions=async(input)=>{

  if(!input){
    throw new Error('query is required')
  }
  try {
    const apiKey = process.env.LOCATIONIQ_API_KEY; // Replace with your API key
    const url = `https://api.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${encodeURIComponent(
      input
    )}&limit=5`;
    const response = await axios.get(url);

    // Extract and return place names
    return response.data.map((place) => place.display_name);
  } catch (error) {
    console.error(
      "Error fetching suggestions:",
      error.response?.data || error.message
    );
    throw new Error(
      "Failed to fetch suggestions. Please check the API configuration."
    );
  }

}
module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  console.log("lat",ltd," ",lng," ",radius);

    // radius in km
try{
  const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });
    console.log("captainsss",captains);
      return captains;

}catch(err){

   console.error(
     "Error updating captain:",
     err.response?.data || err.message
   );
   throw new Error(
     "Failed to update captain."
   );

}
    

  

  }