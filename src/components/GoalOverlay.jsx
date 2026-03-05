import { useEffect, useState } from "react";

export default function GoalOverlay() {

  const GOAL = 10000; // change this to your goal
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_BACKEND_URL.replace("http", "ws"));

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "goalInit") {
        setTotal(data.total);
      }

      if (data.type === "goalUpdate") {
        setTotal(data.total);
      }
    };

    return () => ws.close();
  }, []);

  const progress = Math.min((total / GOAL) * 100, 100);

  return (
    <div
      style={{
        width: 600,
        fontFamily: "Inter, sans-serif",
        color: "white",
        textAlign: "center"
      }}
    >
      <h2 style={{ marginBottom: 10 }}>🍓 Berry Donation Goal</h2>

      <div
        style={{
          width: "100%",
          height: 30,
          background: "rgba(255,255,255,0.25)",
          borderRadius: 20,
          overflow: "hidden",
          backdropFilter: "blur(5px)"
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg,#ff4d6d,#c77dff)",
            transition: "width 0.4s ease"
          }}
        />
      </div>

      <p style={{ marginTop: 8 }}>
        ₹{total} / ₹{GOAL}
      </p>
    </div>
  );
}