import React, { useState, useEffect, useRef } from "react";
import useLiveTips from "./useLiveTips";

const formatMoney = (amount, currency = "INR") => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
};

const groupTotalsByCurrency = (tips) => {
  return tips.reduce((acc, tip) => {
    const currency = tip.currency || "INR";
    acc[currency] = (acc[currency] || 0) + tip.amount;
    return acc;
  }, {});
};

const getTipStyle = (amount) => {
  if (amount >= 5000) {
    return {
      bg: "bg-red-500/20",
      border: "border-red-500",
      text: "text-red-400"
    };
  }

  if (amount >= 1000) {
    return {
      bg: "bg-pink-500/20",
      border: "border-pink-500",
      text: "text-pink-400"
    };
  }

  if (amount >= 500) {
    return {
      bg: "bg-green-500/20",
      border: "border-green-500",
      text: "text-green-400"
    };
  }

  if (amount >= 100) {
    return {
      bg: "bg-blue-500/20",
      border: "border-blue-500",
      text: "text-blue-400"
    };
  }

  if(amount.currency != "INR"){
    return {
      bg: "bg-green-500/20",
      border: "border-green-500",
      text: "text-green-400"
    };
  }

  return {
    bg: "bg-gray-800",
    border: "border-gray-700",
    text: "text-gray-300"
  };
};


/* ================================
   MAIN DASHBOARD
================================ */

const TipsDashboard = () => {

  const [oldTips, setOldTips] = useState([]);
  const [newTips, setNewTips] = useState([]);

  const [authenticated, setAuthenticated] = useState(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [goalMessage, setGoalMessage] = useState("");
  const [goalLoading, setGoalLoading] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const tipSound = useRef(new Audio("/sounds/tip.mp3"));


  // unlock sound on first click
  useEffect(() => {
    const unlock = () => {
      tipSound.current.play().catch(() => {});
      tipSound.current.pause();
      tipSound.current.currentTime = 0;
      window.removeEventListener("click", unlock);
    };
    window.addEventListener("click", unlock);
  }, []);

  // listen for live tips
  useLiveTips((tip) => {
    setNewTips(prev => [tip, ...prev]);
    tipSound.current.currentTime = 0;
    tipSound.current.play();
  });

  // fetch old tips
  const getTips = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/donations/gettips`
      );

      const data = await res.json();

      if (res.status === 200) {
        const last10 = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);

        setOldTips(last10);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  checkSession();
}, []);

useEffect(() => {
  if (authenticated === true) {
    getTips();
  }
}, [authenticated]);

  const checkSession = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/donations/checkSession`,
      {
        credentials: "include"
      }
    );

    setAuthenticated(res.ok);
  } catch {
    setAuthenticated(false);
  }
};

const login = async () => {
  if (!password) {
    setLoginError("Please enter the password");
    return;
  }

  try {
    setLoginLoading(true);
    setLoginError("");

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/donations/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          password
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    setAuthenticated(true);
    setPassword("");

  } catch (error) {
    setLoginError(error.message);
  } finally {
    setLoginLoading(false);
  }
};

  const createGoal = async () => {
  if (!goalName.trim()) {
    setGoalMessage("Please enter a goal name");
    return;
  }

  if (!goalTarget || Number(goalTarget) <= 0) {
    setGoalMessage("Please enter a valid goal amount");
    return;
  }

  try {
    setGoalLoading(true);
    setGoalMessage("");

    const res = await fetch(
  `${import.meta.env.VITE_BACKEND_URL}/donations/setGoal`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name: goalName,
      target: Number(goalTarget),
    }),
  }
);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || "Failed to create goal"
      );
    }

    setGoalMessage("Goal created successfully!");

    setGoalName("");
    setGoalTarget("");

  } catch (error) {
    console.error(error);
    setGoalMessage(error.message);
  } finally {
    setGoalLoading(false);
  }
};


const resetGoal = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to reset the current goal to ₹0?"
  );

  if (!confirmed) return;

  try {
    setGoalLoading(true);
    setGoalMessage("");

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/donations/resetGoal`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || "Failed to reset goal"
      );
    }

    setGoalMessage("Goal reset successfully!");

  } catch (error) {
    console.error(error);
    setGoalMessage(error.message);
  } finally {
    setGoalLoading(false);
  }
};


const replayTip = async (tipId) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/donations/replayTip`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ tipId }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to replay tip");
    }

    console.log("Tip replayed successfully");

  } catch (error) {
    console.error("Replay error:", error.message);
  }
};
  /* ================================
     STATS
  ================================= */

  const allTips = [...newTips, ...oldTips];
  const totalsByCurrency = groupTotalsByCurrency(allTips);
  const supporters = allTips.length;

  if (authenticated === null) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
      Checking session...
    </div>
  );
}

if (authenticated === false) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">

        <h1 className="text-2xl font-bold text-white">
          🔒 Tips Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Enter your password to access the dashboard.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setLoginError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") login();
          }}
          placeholder="Enter password"
          className="
            w-full mt-6 px-4 py-3
            bg-gray-950 border border-gray-700
            rounded-lg text-white
            outline-none focus:border-pink-500
          "
        />

        {loginError && (
          <p className="mt-3 text-sm text-red-400">
            {loginError}
          </p>
        )}

        <button
          onClick={login}
          disabled={loginLoading}
          className="
            w-full mt-5 py-3 rounded-lg
            bg-pink-500 hover:bg-pink-600
            text-white font-semibold
            disabled:opacity-50
          "
        >
          {loginLoading ? "Logging in..." : "Login"}
        </button>

      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        <div className="flex items-center justify-between">
  <h1 className="text-3xl font-bold text-white">
    💸 Tips Dashboard
  </h1>

  <div className="relative">
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="
        w-10 h-10
        flex items-center justify-center
        rounded-lg
        text-gray-400
        hover:text-white
        hover:bg-gray-800
        transition
      "
      title="More options"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="5" r="1.5" fill="currentColor" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        <circle cx="12" cy="19" r="1.5" fill="currentColor" />
      </svg>
    </button>

    {menuOpen && (
      <div
        className="
          absolute right-0 top-12
          w-48
          bg-gray-900
          border border-gray-700
          rounded-xl
          shadow-xl
          overflow-hidden
          z-40
        "
      >
        <button
          onClick={() => {
            setGoalModalOpen(true);
            setMenuOpen(false);
            setGoalMessage("");
          }}
          className="
            w-full
            px-4 py-3
            text-left
            text-sm text-gray-200
            hover:bg-gray-800
            transition
          "
        >
          🎯 Goal Overlay
        </button>
      </div>
    )}
  </div>
</div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Stat
            title="Total Tips"
            value={
              Object.entries(totalsByCurrency)
                .map(([cur, amt]) => formatMoney(amt, cur))
                .join(" • ")
            }
          />
          <Stat title="Supporters" value={supporters} />
        </div>

        {/* GOAL MANAGEMENT */}


        {/* TIPS LIST */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg overflow-hidden">

          <div className="p-6 border-b border-gray-800 font-semibold text-green-400">
            🔥 New Tips
          </div>

          {newTips.length === 0 ? (
            <p className="p-6 text-gray-500">No new tips yet</p>
          ) : (
            <ul className="divide-y divide-gray-800">
              {newTips.map(tip => (
              <TipItem
                key={tip._id || tip.id}
                tip={tip}
                highlight
                onReplay={replayTip}
              />
            ))}
            </ul>
          )}

          <div className="p-6 border-y border-gray-800 font-semibold bg-gray-800/40 text-gray-300">
            📜 Recent Tips (Last 10)
          </div>

          {oldTips.length === 0 ? (
            <p className="p-6 text-gray-500">No past tips</p>
          ) : (
            <ul className="divide-y divide-gray-800">
              {oldTips.map(tip => (
              <TipItem
                key={tip._id || tip.id}
                tip={tip}
                onReplay={replayTip}
              />
            ))}
            </ul>
          )}

        </div>
      </div>
            {goalModalOpen && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/70 backdrop-blur-sm p-4
          "
          onClick={() => setGoalModalOpen(false)}
        >
          <div
            className="
              w-full max-w-lg
              bg-gray-900
              border border-gray-700
              rounded-2xl
              shadow-2xl p-6
            "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-white">
                🎯 Manage Goal
              </h2>

              <button
                onClick={() => setGoalModalOpen(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <label className="block text-sm text-gray-400 mb-2">
              Goal Name
            </label>

            <input
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="Example: New PC Setup"
              className="
                w-full px-4 py-3 mb-4 rounded-lg
                bg-gray-950 border border-gray-700
                text-white outline-none focus:border-pink-500
              "
            />

            <label className="block text-sm text-gray-400 mb-2">
              Goal Amount
            </label>

            <input
              type="number"
              value={goalTarget}
              onChange={(e) => setGoalTarget(e.target.value)}
              placeholder="Example: 10000"
              className="
                w-full px-4 py-3 mb-4 rounded-lg
                bg-gray-950 border border-gray-700
                text-white outline-none focus:border-pink-500
              "
            />

            {goalMessage && (
              <p
                className={`mb-4 text-sm ${
                  goalMessage.toLowerCase().includes("success")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {goalMessage}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={resetGoal}
                disabled={goalLoading}
                className="
                  flex-1 py-3 rounded-lg
                  bg-red-500 hover:bg-red-600
                  text-white font-semibold
                  disabled:opacity-50
                "
              >
                {goalLoading ? "Please wait..." : "Reset Goal"}
              </button>

              <button
                onClick={createGoal}
                disabled={goalLoading}
                className="
                  flex-1 py-3 rounded-lg
                  bg-pink-500 hover:bg-pink-600
                  text-white font-semibold
                  disabled:opacity-50
                "
              >
                {goalLoading ? "Saving..." : "Save Goal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


/* ================================
   TIP ITEM
================================ */

const TipItem = ({ tip, highlight, onReplay }) => {
  const [isActive, setIsActive] = useState(highlight);
  const style = getTipStyle(tip.amount);

  useEffect(() => {
    if (!highlight) return;

    const timer = setTimeout(() => setIsActive(false), 20000);

    return () => clearTimeout(timer);
  }, [highlight]);

  return (
    <li
  className={`p-6 grid grid-cols-3 items-center rounded-xl m-4 border-2
  ${style.bg} ${style.border}
  ${isActive ? "animate-pulse" : ""}`}
>
  {/* Name - left */}
  <div className="text-left">
    <p className="font-semibold text-white">
      {tip.name}
    </p>
  </div>

  {/* Message / Sound - center */}
  <div className="text-center">
    {tip.memeSound ? (
      <p className="text-purple-400 text-lg">
        🔊 {tip.memeSound}
      </p>
    ) : (
      <p className="text-gray-400 text-lg">
        {tip.message || "No message"}
      </p>
    )}
  </div>

  {/* Amount / Replay - right */}
<div className="flex items-center justify-end gap-3">
  <button
    onClick={() => onReplay(tip._id || tip.id)}
    className="
      px-3 py-2
      bg-purple-500 hover:bg-purple-600
      rounded-lg text-white
      text-sm font-semibold
      transition
    "
    title="Replay this tip on stream"
  >
    ↻ Replay
  </button>

  <p className={`font-bold text-xl ${style.text}`}>
    {formatMoney(tip.amount, tip.currency)}
  </p>
</div>
</li>
  );
};


const Stat = ({ title, value }) => (
  <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow">
    <p className="text-gray-400 text-sm">{title}</p>
    <h2 className="text-2xl font-bold text-white">{value}</h2>
  </div>
);

export default TipsDashboard;