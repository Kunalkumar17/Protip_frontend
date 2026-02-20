import React, { useState, useEffect, useRef } from "react";
import useLiveTips from "./useLiveTips";


/* ================================
   HELPERS
================================ */

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
    getTips();
  }, []);

  /* ================================
     STATS
  ================================= */

  const allTips = [...newTips, ...oldTips];
  const totalsByCurrency = groupTotalsByCurrency(allTips);
  const supporters = allTips.length;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold text-white">💸 Tips Dashboard</h1>

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
                <TipItem key={tip._id || tip.id} tip={tip} highlight />
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
                <TipItem key={tip._id || tip.id} tip={tip} />
              ))}
            </ul>
          )}

        </div>
      </div>
    </div>
  );
};


/* ================================
   TIP ITEM
================================ */

const TipItem = ({ tip, highlight }) => {
  const [isActive, setIsActive] = useState(highlight);
  const style = getTipStyle(tip.amount);

  useEffect(() => {
    if (!highlight) return;
    const timer = setTimeout(() => setIsActive(false), 20000);
    return () => clearTimeout(timer);
  }, [highlight]);

  return (
    <li
      className={`p-6 flex justify-between items-center border-l-4
      ${style.bg} ${style.border}
      ${isActive ? "animate-pulse" : ""}`}
    >
      <div>
        <p className="font-semibold text-white">{tip.name}</p>
      </div>

      <div>
        <p className="text-gray-400 text-sm">{tip.message}</p>
      </div>
      <p className={`font-bold text-xl ${style.text}`}>
        {formatMoney(tip.amount, tip.currency)}
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