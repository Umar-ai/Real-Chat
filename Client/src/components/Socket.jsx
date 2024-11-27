import { io } from 'socket.io-client';

let socket = null

const initializesocket = (userData) => {
  try {
    if (!socket) {
      socket = io('http://localhost:8000', {
        transports: ['websocket'],
        reconnection: false
      });

      // Add event listeners only once
      socket.on('connect', () => {
        console.log("Socket connected", socket.id);
        console.log(socket.connected);
        if (userData) {
          socket.emit('logindata', userData);
        }
      });

      socket.on('disconnect', () => {
        
        console.log('Socket disconnected');
      });
    } else if (socket && userData) {
      // Emit userData if socket is already initialized
      socket.emit('logindata', userData);
    }

    return socket;
  } catch (error) {
  console.log("something went wrong while connecting socket in Socket.jsx")
  }
};
// const disconnectSocket = () => {
//    if (socket) {
//      socket.disconnect();
//       socket = null;
//       socket.off()
//        console.log('Socket manually disconnected')
//       }
//   }

export  {initializesocket};
