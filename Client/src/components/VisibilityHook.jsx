import { useEffect } from 'react';

const useSocketVisibility = (socket) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !socket.connected) {
        socket.connect();
      } else if (document.visibilityState !== 'visible' && socket.connected) {
        // Optionally, you could avoid disconnecting to maintain socket id:
        // socket.disconnect();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [socket]);
};

export default useSocketVisibility;
