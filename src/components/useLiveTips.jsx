import { useEffect } from "react";

const useLiveTips = (onNewTip, username) => {
  useEffect(() => {
    if (!username) {
      console.log("⏳ Waiting for streamer username...");
      return;
    }

    const base = import.meta.env.VITE_WS_URL;

    if (!base) {
      console.error("❌ VITE_WS_URL is not defined");
      return;
    }

    const socketUrl =
      `${base}${base.includes("?") ? "&" : "?"}` +
      `streamer=${encodeURIComponent(username)}`;

    console.log("🔌 Connecting:", socketUrl);

    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log("✅ Live tips WebSocket connected");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        console.log("📩 WebSocket message:", data);

        if (data.type === "tipAlert") {
          onNewTip(data);
        }
      } catch (error) {
        console.error("❌ WebSocket message error:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log(
        "🔌 WebSocket disconnected:",
        event.code,
        event.reason
      );
    };

    return () => {
      socket.close();
    };
  }, [username]);
};

export default useLiveTips;