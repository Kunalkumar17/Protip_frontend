import { useEffect } from "react";

const useLiveTips = (onNewTip) => {
  useEffect(() => {
    const base = import.meta.env.VITE_WS_URL;

    if (!base) {
      console.error("❌ VITE_WS_URL is not configured");
      return;
    }

    console.log("🔌 Connecting to tips WebSocket...");

    const socket = new WebSocket(base);

    socket.onopen = () => {
      console.log("✅ Tips WebSocket connected");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        console.log("📩 WebSocket message:", data);

        if (data.type === "tipAlert") {
          onNewTip(data);
        }
      } catch (error) {
        console.error(
          "❌ WebSocket message error:",
          error
        );
      }
    };

    socket.onerror = (error) => {
      console.error(
        "❌ Tips WebSocket error:",
        error
      );
    };

    socket.onclose = (event) => {
      console.log(
        "🔌 Tips WebSocket disconnected:",
        event.code,
        event.reason
      );
    };

    return () => {
      socket.close();
    };
  }, [onNewTip]);
};

export default useLiveTips;