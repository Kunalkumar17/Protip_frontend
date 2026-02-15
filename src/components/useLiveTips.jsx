import { useEffect } from "react";

const WS_URL = "ws://localhost:8080";

const useLiveTips = (setTips) => {
  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log("Connected to live tips");
    };

    socket.onmessage = (event) => {
      const newTip = JSON.parse(event.data);

      setTips((prev) => [newTip, ...prev]);
    };

    socket.onclose = () => {
      console.log("Live tips disconnected");
    };

    return () => socket.close();
  }, [setTips]);
};

export default useLiveTips;
