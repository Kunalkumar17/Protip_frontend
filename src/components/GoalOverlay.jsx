import { useEffect, useState } from "react";

export default function GoalOverlay() {

  const GOAL = 10000;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const ws = new WebSocket(
      import.meta.env.VITE_BACKEND_URL.replace("http", "ws")
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "goalInit") setTotal(data.total);
      if (data.type === "goalUpdate") setTotal(data.total);
    };

    return () => ws.close();
  }, []);

  const progress = Math.min((total / GOAL) * 100, 100);

  return (
    <div
      style={{
        width: 520,
        fontFamily: "Inter, system-ui, sans-serif",
        color: "white",

        /* transparent background */
        background: "rgba(0,0,0,0.45)",
        padding: "14px 18px",
        borderRadius: 12,

        backdropFilter: "blur(6px)"
      }}
    >

      {/* header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 18,
          marginBottom: 6
        }}
      >
        <span style={{ opacity: 0.9 }}>Monthly Goal</span>
        <span style={{ opacity: 0.85 }}>
          ₹{total} / ₹{GOAL}
        </span>
      </div>

      {/* progress bar */}
      <div
        style={{
          width: "100%",
          height: 8,
          background: "rgba(255,255,255,0.18)",
          borderRadius: 20,
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background:
              "linear-gradient(90deg,#ff4d6d,#c77dff,#ff4d6d)",
            backgroundSize: "200% 100%",
            animation: "gradientMove 3s linear infinite",
            transition: "width 0.8s cubic-bezier(.22,1,.36,1)"
          }}
        />
      </div>

      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% }
          100% { background-position: 200% }
        }
      `}</style>

    </div>
  );
}