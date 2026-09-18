import { useEffect } from "react";

const useLiveTips = (onNewTip, channelName) => {
  useEffect(() => {
    const base = import.meta.env.VITE_WS_URL;
    const socketUrl = channelName
      ? `${base}${base.includes("?") ? "&" : "?"}channel=${encodeURIComponent(channelName)}`
      : base;

    const socket = new WebSocket(socketUrl);

    socket.onmessage = (event) => {
      const tip = JSON.parse(event.data);
      console.log(tip)
      if(tip.type === "tipAlert"){
      onNewTip(tip); // send single tip
      }
    };

    return () => socket.close();
  }, [channelName]);
};

export default useLiveTips;
