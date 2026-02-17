import { useEffect } from "react";

const useLiveTips = (onNewTip) => {
  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_WS_URL);

    socket.onmessage = (event) => {
      const tip = JSON.parse(event.data);
      onNewTip(tip); // send single tip
    };

    return () => socket.close();
  }, []);
};

export default useLiveTips;