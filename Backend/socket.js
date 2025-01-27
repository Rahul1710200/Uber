const socketIo = require("socket.io");
const userModel=require('./model/User')
const captainModel=require('./model/captain.model')

let io;
module.exports.initializeSocket=(server)=> {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log("dddd",data);

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

 

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      console.log("aaa",data);

      if (!location || !location.lat || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      try {
    const updatedCaptain = await captainModel.findByIdAndUpdate(
      userId,
      {
        location: {
          ltd: location.lat,
          lng: location.lng,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedCaptain) {
      console.log("Captain not found");
      return socket.emit("error", { message: "Captain not found" });
    }

    console.log("Updated captain:", updatedCaptain);
  } catch (error) {
    console.error("Error updating location:", error);
    return socket.emit("error", { message: "An error occurred" });
  }

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });

  });
})
}

   module.exports.sendMessageToSocketId = (socketId, messageObject) => {
     console.log("receve",messageObject);

     if (io) {
       io.to(socketId).emit(messageObject.event, messageObject.data);
     } else {
       console.log("Socket.io not initialized.");
     }
   };