import { useEffect, useState } from "react";

export default function GoalOverlay() {
  const [goal, setGoal] = useState({
    name: "Monthly Goal",
    target: 10000,
    total: 0,
  });

  useEffect(() => {
    const ws = new WebSocket(
      import.meta.env.VITE_BACKEND_URL.replace(/^http/, "ws")
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (
        data.type === "goalInit" ||
        data.type === "goalUpdate"
      ) {
        setGoal(data.goal);
      }
    };

    return () => ws.close();
  }, []);

  const progress =
    goal.target > 0
      ? Math.min((goal.total / goal.target) * 100, 100)
      : 0;

  return (
    <div
      style={{
        width: 520,
        fontFamily: "Inter, system-ui, sans-serif",
        color: "white",
        background: "black",
        padding: "14px 18px",
        borderRadius: 12,
        backdropFilter: "blur(6px)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 18,
          marginBottom: 6,
        }}
      >
        {/* Dynamic goal name */}
        <span style={{ opacity: 0.9 }}>
          {goal.name}
        </span>

        {/* Dynamic goal amount */}
        <span style={{ opacity: 0.85 }}>
          <span style={{ fontSize: 28 }}>₹{goal.total.toFixed(2)} </span>/ ₹{goal.target.toFixed(2)}
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "100%",
          height: 8,
          background: "rgba(255,255,255,0.18)",
          borderRadius: 20,
          overflow: "hidden",
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
            transition: "width 0.8s cubic-bezier(.22,1,.36,1)",
          }}
        />
      </div>

      <style>{`
        @keyframes gradientMove {
          0% {
            background-position: 0%;
          }

          100% {
            background-position: 200%;
          }
        }
      `}</style>
    </div>
  );
}