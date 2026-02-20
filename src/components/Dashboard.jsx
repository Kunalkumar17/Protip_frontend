import React, { useState, useEffect } from "react";
import useLiveTips from "./useLiveTips";
import { useRef } from "react"; 

const TipsDashboard = () => {

  // OLD tips (from DB)
  const [oldTips, setOldTips] = useState([]);

  // NEW live tips (from websocket)
  const [newTips, setNewTips] = useState([]);

  const tipSound = useRef(new Audio("/sounds/tip.mp3"));

  // listen for live tips
  useLiveTips((tip) => {
    setNewTips(prev => [tip, ...prev]);

    tipSound.current.play();
  });

  // fetch last 10 tips from backend
  const getTips = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/donations/gettips`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        const last10 = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);

        setOldTips(last10);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTips();
  }, []);

  const allTips = [...newTips, ...oldTips];

  const totalTips = allTips.reduce((sum, tip) => sum + tip.amount, 0);
  const supporters = allTips.length;
  const highestTip = Math.max(0, ...allTips.map(t => t.amount));

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold text-white">💸 Tips Dashboard</h1>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Stat title="Total Tips" value={`₹${totalTips}`} />
          <Stat title="Supporters" value={supporters} />
          <Stat title="Highest Tip" value={`₹${highestTip}`} />
        </div>

        {/* TIPS LIST */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg overflow-hidden">

          {/* NEW TIPS */}
          <div className="p-6 border-b border-gray-800 font-semibold text-green-400">
            🔥 New Tips
          </div>

          {newTips.length === 0 ? (
            <p className="p-6 text-gray-500">No new tips yet</p>
          ) : (
            <ul className="divide-y divide-gray-800">
              {newTips.map(tip => (
                <TipItem key={tip._id || tip.id} tip={tip} highlight />
              ))}
            </ul>
          )}

          {/* OLD TIPS */}
          <div className="p-6 border-y border-gray-800 font-semibold bg-gray-800/40 text-gray-300">
            📜 Recent Tips (Last 10)
          </div>

          {oldTips.length === 0 ? (
            <p className="p-6 text-gray-500">No past tips</p>
          ) : (
            <ul className="divide-y divide-gray-800">
              {oldTips.map(tip => (
                <TipItem key={tip._id || tip.id} tip={tip} />
              ))}
            </ul>
          )}

        </div>

      </div>
    </div>
  );
};

const getTipStyle = (amount) => {

  if (amount >= 5000) {
    return {
      bg: "bg-red-500/20",
      border: "border-red-500",
      text: "text-orange-400"
    };
  }

  if (amount >= 1000) {
    return {
      bg: "bg-pink-500",
      border: "border-pink-500",
      text: "text-yellow-400"
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

  return {
    bg: "bg-gray-800",
    border: "border-gray-700",
    text: "text-gray-300"
  };
};

const TipItem = ({ tip, highlight }) => {
  const [isActive, setIsActive] = useState(highlight);

  useEffect(() => {
    if (!highlight) return;

    const timer = setTimeout(() => {
      setIsActive(false); // stop animation after 20 sec
    }, 20000);

    return () => clearTimeout(timer);
  }, [highlight]);

  const style = getTipStyle(tip.amount);

  return (
    <li
      className={`p-6 flex justify-between items-center border-l-4
      ${style.bg} ${style.border}
      ${isActive ? "animate-pulse" : ""}`}
    >
      <div>
        <p className="font-semibold text-white">{tip.name}</p>
        <p className="text-gray-400 text-sm">{tip.message}</p>
      </div>

      <p className={`font-bold text-xl ${style.text}`}>
        ₹{tip.amount}
      </p>
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
