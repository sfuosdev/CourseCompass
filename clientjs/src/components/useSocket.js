import { useEffect, useState } from "react";
import io from "socket.io-client";

// Assuming your server is running on localhost:4000
const SOCKET_SERVER_URL = "//cc-chatbot-5cb2aee8433b.herokuapp.com/";

const useSocket = (eventName) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to Socket.IO server
    const socketIo = io(SOCKET_SERVER_URL);

    // Set socket connection
    setSocket(socketIo);

    // Clean up on unmount or when eventName changes
    return () => {
      socketIo.disconnect();
    };
  }, [eventName]);

  return socket;
};

export default useSocket;