import { useEffect, useState } from "react";

export default function GoalOverlay() {
  const [goal, setGoal] = useState({
    name: "Monthly Goal",
    target: 10000,
    total: 0,
  });

  const [messageIndex, setMessageIndex] = useState(0);
  const [messageVisible, setMessageVisible] = useState(true);

  // Rotating messages
  const messages = [
    goal.name,
    "!tip in chat to donate ❤️",
  ];

// Rotate messages with different durations
useEffect(() => {
  const duration = messageIndex === 0 ? 30000 : 10000;

  const timeout = setTimeout(() => {
    setMessageVisible(false);

    // Change message after fade-out
    setTimeout(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
      setMessageVisible(true);
    }, 400);
  }, duration);

  return () => clearTimeout(timeout);
}, [messageIndex, goal.name]);


  // Format amounts
  const formatTotal = (amount) => { return `₹${amount.toLocaleString("en-IN")}`; };

  const formatTarget = (amount) => { if (amount >= 1000000) { const value = amount / 1000000; return `₹${Number.isInteger(value) ? value : value.toFixed(1)}M`; } if (amount >= 100000) { const value = amount / 1000; return `₹${Number.isInteger(value) ? value : value.toFixed(1)}K`; } return `₹${amount.toLocaleString("en-IN")}`; };

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
          alignItems: "center",
          fontSize: 18,
          marginBottom: 6,
        }}
      >
        {/* Rotating message */}
        <div
          style={{
            position: "relative",
            height: 32,
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            maxWidth: 330,
          }}
        >
          <span
            style={{
              opacity: messageVisible ? 0.9 : 0,
              transform: messageVisible
                ? "translateY(0)"
                : "translateY(-8px)",
              transition:
                "opacity 0.4s ease, transform 0.4s ease",
              fontSize: 25,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            {messages[messageIndex]}
          </span>
        </div>

        {/* Dynamic goal amount */}
        <span
          style={{
            opacity: 0.85,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontSize: 28 }}>
            {formatTotal(goal.total)}
          </span>{" "}
          / {formatTarget(goal.target)}
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
            transition:
              "width 0.8s cubic-bezier(.22,1,.36,1)",
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