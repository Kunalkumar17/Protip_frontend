import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
  if (amount >= 5000) return { bg: "bg-red-500/20",   border: "border-red-500",   text: "text-red-400",   dot: "bg-red-400"   };
  if (amount >= 1000) return { bg: "bg-pink-500/20",  border: "border-pink-500",  text: "text-pink-400",  dot: "bg-pink-400"  };
  if (amount >= 500)  return { bg: "bg-green-500/20", border: "border-green-500", text: "text-green-400", dot: "bg-green-400" };
  if (amount >= 100)  return { bg: "bg-blue-500/20",  border: "border-blue-500",  text: "text-blue-400",  dot: "bg-blue-400"  };
  if (amount.currency != "INR") return { bg: "bg-green-500/20", border: "border-green-500", text: "text-green-400", dot: "bg-green-400" };
  return { bg: "bg-white/[0.03]", border: "border-white/[0.07]", text: "text-gray-400", dot: "bg-gray-600" };
};

const NAV_ITEMS = [
  { id: "live",    label: "Live tips", icon: "ti-flame"     },
  { id: "monthly", label: "Monthly",   icon: "ti-chart-bar" },
  { id: "overlays", label: "Overlays",  icon: "ti-layout"    },
];

/* ================================
   MAIN DASHBOARD
================================ */

const TipsDashboard = () => {
  const navigate = useNavigate();

  const [activeView, setActiveView] = useState("live");

  const [oldTips, setOldTips] = useState([]);
  const [newTips, setNewTips] = useState([]);

  const [authenticated, setAuthenticated] = useState(null);
  const [streamer, setStreamer] = useState(null);

  const [goalName,    setGoalName]    = useState("");
  const [goalTarget,  setGoalTarget]  = useState("");
  const [goalMessage, setGoalMessage] = useState("");
  const [goalLoading, setGoalLoading] = useState(false);

  const [monthlyTips,    setMonthlyTips]    = useState([]);
  const [monthlyLoading, setMonthlyLoading] = useState(false);
  const [selectedMonth,  setSelectedMonth]  = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

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
    if (
      streamer?.username &&
      tip.channelName &&
      String(tip.channelName).toLowerCase() !== streamer.username
    ) {
      return;
    }

    setNewTips(prev => [tip, ...prev]);
    tipSound.current.currentTime = 0;
    tipSound.current.play();
  }, streamer?.username);

  // fetch old tips
  const getTips = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/donations/getTips`,
        { credentials: "include" }
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

  const getMonthlyTips = async (mv) => {
    try {
      setMonthlyLoading(true);
      const [year, month] = mv.split("-");
      const res  = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/donations/monthlyTips?year=${year}&month=${month}`,
        { credentials: "include" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch monthly tips");
      setMonthlyTips(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Monthly tips error:", e);
      setMonthlyTips([]);
    } finally {
      setMonthlyLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (authenticated === true) {
      getTips();
      getMonthlyTips(selectedMonth);
    }
  }, [authenticated]);

  useEffect(() => {
    if (authenticated === true) getMonthlyTips(selectedMonth);
  }, [selectedMonth]);

  useEffect(() => {
    if (authenticated === false) {
      navigate("/login");
    }
  }, [authenticated, navigate]);

  const checkSession = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/me`,
        { credentials: "include" }
      );

      if (!res.ok) {
        setAuthenticated(false);
        return;
      }

      const data = await res.json();
      setStreamer(data.streamer);
      setAuthenticated(true);
    } catch {
      setAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // still leave the dashboard
    } finally {
      setAuthenticated(false);
      setStreamer(null);
      navigate("/login");
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
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: goalName,
            target: Number(goalTarget),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create goal");
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
        { method: "POST", credentials: "include" }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to reset goal");
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
          headers: { "Content-Type": "application/json" },
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

  const allTips                 = [...newTips, ...oldTips];
  const totalsByCurrency        = groupTotalsByCurrency(allTips);
  const supporters              = allTips.length;
  const monthlyTotalsByCurrency = groupTotalsByCurrency(monthlyTips);

  const monthOptions = Array.from({ length: 24 }, (_, i) => {
    const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - i);
    return {
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
    };
  });

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center">
        <span className="text-sm text-gray-600">Checking session…</span>
      </div>
    );
  }

  if (authenticated === false) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center">
        <span className="text-sm text-gray-600">Redirecting to login…</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex text-white">

      {/* ── Sidebar ── */}
      <aside className="w-[220px] shrink-0 bg-[#111] border-r border-white/[0.07] flex flex-col sticky top-0 h-screen">
        <div className="px-5 py-6 border-b border-white/[0.07]">
          <p className="text-[13px] font-medium tracking-tight">Tips Dashboard</p>
          {streamer && (
            <p className="text-[11px] text-gray-600 mt-0.5 truncate">
              {streamer.displayName || streamer.username}
            </p>
          )}
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const active = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveView(item.id); if (item.id === "overlays") setGoalMessage(""); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] text-left transition-colors
                  ${active
                    ? "bg-white/[0.06] text-white font-medium"
                    : "text-gray-500 hover:text-white hover:bg-white/[0.04]"
                  }`}
              >
                <i className={`ti ${item.icon} text-base`} aria-hidden="true" />
                {item.label}
                {item.id === "live" && newTips.length > 0 && (
                  <span className="ml-auto text-[10px] font-semibold bg-red-500 text-white rounded-full px-1.5 py-px leading-[18px]">
                    {newTips.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-5 border-t border-white/[0.07]">
          <div>
            <p className="text-[11px] text-gray-600 mb-1">Total tips</p>
            <p className="text-[18px] font-medium tracking-tight break-all">
              {Object.entries(totalsByCurrency).map(([c, a]) => formatMoney(a, c)).join(" · ") || "₹0"}
            </p>
            <p className="text-[11px] text-gray-600 mt-1">
              {supporters} {supporters === 1 ? "supporter" : "supporters"}
            </p>
          </div>


        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 min-w-0 flex flex-col">

        {/* Header */}
        <header className="sticky top-0 z-10 bg-[#0e0e0e]/90 backdrop-blur border-b border-white/[0.07] px-7 py-4 flex items-center gap-4">
          <p className="flex-1 text-[15px] font-medium">
            {NAV_ITEMS.find((n) => n.id === activeView)?.label}
          </p>

          {activeView === "monthly" && (
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-[#161616] border border-white/[0.07] text-white text-[13px] rounded-lg px-3 py-1.5 outline-none cursor-pointer"
            >
              {monthOptions.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          )}

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.07] text-gray-500 text-[13px] hover:text-white hover:border-white/20 transition-colors"
          >
            Log out
          </button>
        </header>

        {/* Body */}
        <div className="p-7 flex flex-col gap-6">

          {/* ── LIVE ── */}
          {activeView === "live" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  label="Total tips"
                  value={Object.entries(totalsByCurrency).map(([c, a]) => formatMoney(a, c)).join(" · ") || "₹0"}
                />
                <StatCard label="Supporters" value={supporters} />
              </div>

              <Panel title="New tips" accent>
                {newTips.length === 0
                  ? <Empty>Waiting for tips — new ones appear here instantly.</Empty>
                  : <ul className="p-3 space-y-2">
                      {newTips.map((tip) => (
                        <TipItem key={tip._id || tip.id} tip={tip} highlight onReplay={replayTip} />
                      ))}
                    </ul>
                }
              </Panel>

              <Panel title="Recent tips (last 10)">
                {oldTips.length === 0
                  ? <Empty>No past tips yet.</Empty>
                  : <ul className="p-3 space-y-2">
                      {oldTips.map((tip) => (
                        <TipItem key={tip._id || tip.id} tip={tip} onReplay={replayTip} />
                      ))}
                    </ul>
                }
              </Panel>
            </>
          )}

          {/* ── MONTHLY ── */}
          {activeView === "monthly" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  label="Monthly total"
                  value={Object.entries(monthlyTotalsByCurrency).map(([c, a]) => formatMoney(a, c)).join(" · ") || "₹0"}
                />
                <StatCard label="Tips" value={monthlyTips.length} />
              </div>

              <div className="bg-[#161616] border border-white/[0.07] rounded-xl overflow-hidden">
                {monthlyLoading ? (
                  <Empty>Loading…</Empty>
                ) : monthlyTips.length === 0 ? (
                  <Empty>No tips for this month.</Empty>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-[13px]">
                      <thead>
                        <tr className="border-b border-white/[0.07]">
                          {["Name", "Message", "Date", "Amount"].map((h, i) => (
                            <th key={h} className={`px-4 py-3 text-[11px] font-medium text-gray-600 tracking-wide ${i === 3 ? "text-right" : "text-left"}`}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {monthlyTips.map((tip) => {
                          const style = getTipStyle(tip.amount);
                          return (
                            <tr key={tip._id || tip.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                              <td className="px-4 py-3 text-white font-medium">
                                <div className="flex items-center gap-2">
                                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />
                                  {tip.name || "Anonymous"}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-white max-w-[200px]">
                                <div className="truncate">
                                  {tip.memeSound
                                    ? <span className="text-violet-400">🔊 {tip.memeSound}</span>
                                    : tip.message || "—"}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                                {tip.createdAt
                                  ? new Date(tip.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                                  : "—"}
                              </td>
                              <td className={`px-4 py-3 text-right font-semibold whitespace-nowrap ${style.text}`}>
                                {formatMoney(tip.amount, tip.currency)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── OVERLAYS ── */}
          {activeView === "overlays" && (
            <div className="flex flex-col gap-6 max-w-2xl">

              {/* Alert Overlay */}
              <OverlayCard
                title="Alert Overlay"
                description="Shows a pop-up on stream whenever a new tip comes in, with TTS and sound."
                icon="ti-bell"
                link={streamer ? `${window.location.origin}/${streamer.username}/alert` : null}
              />

              {/* Top Donators Overlay */}
              <OverlayCard
                title="Top Donators Overlay"
                description="Displays a live leaderboard of your top supporters on stream."
                icon="ti-trophy"
                link={streamer ? `${window.location.origin}/${streamer.username}/overlay/top-donators` : null}
              />

              {/* Goal Overlay */}
              <GoalOverlayCard
                streamer={streamer}
                goalName={goalName}
                setGoalName={setGoalName}
                goalTarget={goalTarget}
                setGoalTarget={setGoalTarget}
                goalMessage={goalMessage}
                goalLoading={goalLoading}
                resetGoal={resetGoal}
                createGoal={createGoal}
              />

            </div>
          )}

        </div>
      </main>
    </div>
  );
};

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
    <li className={`grid grid-cols-[1fr_1fr_auto_auto] items-center gap-3 px-4 py-3 rounded-xl border ${style.bg} ${style.border} ${isActive ? "animate-pulse" : ""}`}>

      {/* Name */}
      <div className="flex items-center gap-2 min-w-0">
        <span className={`w-2 h-2 rounded-full shrink-0 ${style.dot}`} />
        <span className="text-[13px] font-medium text-white truncate">
          {tip.name || "Anonymous"}
        </span>
      </div>

      {/* Message */}
      <div className="text-[13px] text-white truncate min-w-0 text-center">
        {tip.memeSound
          ? <span className="text-violet-400">🔊 {tip.memeSound}</span>
          : tip.message || "No message"}
      </div>

      {/* Replay */}
      <button
        onClick={() => onReplay(tip._id || tip.id)}
        className="px-3 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-600 text-white text-[12px] font-semibold transition-colors whitespace-nowrap"
        title="Replay this tip on stream"
      >
        ↻ Replay
      </button>

      {/* Amount */}
      <span className={`text-[15px] font-bold whitespace-nowrap text-right min-w-[80px] ${style.text}`}>
        {formatMoney(tip.amount, tip.currency)}
      </span>
    </li>
  );
};

/* ================================
   SMALL COMPONENTS
================================ */

const StatCard = ({ label, value }) => (
  <div className="bg-[#161616] border border-white/[0.07] rounded-xl px-5 py-4">
    <p className="text-[11px] text-gray-600 mb-1.5 tracking-wide">{label}</p>
    <p className="text-[22px] font-medium tracking-tight text-white break-all">{value}</p>
  </div>
);

const Panel = ({ title, children, accent }) => (
  <div className="bg-[#161616] border border-white/[0.07] rounded-xl overflow-hidden">
    <div className={`px-5 py-3 border-b border-white/[0.07] text-[12px] font-medium tracking-wide ${accent ? "text-green-400" : "text-gray-500"}`}>
      {title}
    </div>
    {children}
  </div>
);

const Empty = ({ children }) => (
  <p className="px-5 py-7 text-[13px] text-gray-600">{children}</p>
);

const Field = ({ label, children }) => (
  <div>
    <label className="block text-[11px] text-gray-600 mb-1.5 tracking-wide">{label}</label>
    {children}
  </div>
);

/* ================================
   OVERLAY COMPONENTS
================================ */

const GoalOverlayCard = ({ streamer, goalName, setGoalName, goalTarget, setGoalTarget, goalMessage, goalLoading, resetGoal, createGoal }) => {
  const [visible, setVisible] = useState(false);
  const link = streamer ? `${window.location.origin}/${streamer.username}/overlay/goal` : null;

  return (
    <div className="bg-[#161616] border border-white/[0.07] rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-white/[0.07] flex items-center gap-3">
        <i className="ti ti-target text-base text-gray-500" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-white">Goal Overlay</p>
          <p className="text-[11px] text-gray-600 mt-0.5">Shows a progress bar toward your current fundraising goal.</p>
        </div>
        <button
          onClick={() => setVisible((v) => !v)}
          className="shrink-0 p-1.5 rounded-lg text-gray-600 hover:text-white hover:bg-white/[0.06] transition-colors"
          title={visible ? "Hide link" : "Show link"}
        >
          <EyeIcon visible={visible} />
        </button>
      </div>

      <div className="px-5 py-4 border-b border-white/[0.07]">
        <OverlayLink link={link} visible={visible} />
      </div>

      <div className="px-5 py-5 flex flex-col gap-4">
        <p className="text-[11px] text-gray-600 tracking-wide">Set goal</p>

        <Field label="Goal name">
          <input
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="Example: New PC Setup"
            className="w-full px-3.5 py-2.5 bg-[#111] border border-white/[0.07] rounded-lg text-[13px] text-white placeholder-gray-600 outline-none focus:border-white/20"
          />
        </Field>

        <Field label="Target amount">
          <input
            type="number"
            value={goalTarget}
            onChange={(e) => setGoalTarget(e.target.value)}
            placeholder="Example: 10000"
            className="w-full px-3.5 py-2.5 bg-[#111] border border-white/[0.07] rounded-lg text-[13px] text-white placeholder-gray-600 outline-none focus:border-white/20"
          />
        </Field>

        {goalMessage && (
          <p className={`text-[13px] ${
            goalMessage.toLowerCase().includes("success") ? "text-green-400" : "text-red-400"
          }`}>
            {goalMessage}
          </p>
        )}

        <div className="flex gap-2.5">
          <button
            onClick={resetGoal}
            disabled={goalLoading}
            className="flex-1 py-2.5 rounded-lg border border-red-500/30 text-red-400 text-[13px] font-medium hover:bg-red-500/10 disabled:opacity-50 transition-colors"
          >
            {goalLoading ? "Please wait..." : "Reset Goal"}
          </button>
          <button
            onClick={createGoal}
            disabled={goalLoading}
            className="flex-[2] py-2.5 rounded-lg bg-white text-[#0e0e0e] text-[13px] font-medium hover:bg-gray-100 disabled:opacity-50 transition-colors"
          >
            {goalLoading ? "Saving..." : "Save Goal"}
          </button>
        </div>
      </div>
    </div>
  );
};

const EyeIcon = ({ visible }) =>
  visible ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

const OverlayLink = ({ link, visible }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    if (!link) return;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 px-3 py-2 bg-[#111] border border-white/[0.07] rounded-lg text-[12px] text-gray-500 truncate font-mono">
        {!link
          ? "Log in to see your link"
          : visible
          ? link
          : "••••••••••••••••••••••••••••••••"}
      </div>
      <button
        onClick={copy}
        disabled={!link}
        className="shrink-0 px-3 py-2 rounded-lg border border-white/[0.07] text-[12px] text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-40 transition-colors whitespace-nowrap"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

const OverlayCard = ({ title, description, icon, link }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="bg-[#161616] border border-white/[0.07] rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-white/[0.07] flex items-center gap-3">
        <i className={`ti ${icon} text-base text-gray-500`} aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-white">{title}</p>
          <p className="text-[11px] text-gray-600 mt-0.5">{description}</p>
        </div>
        <button
          onClick={() => setVisible((v) => !v)}
          className="shrink-0 p-1.5 rounded-lg text-gray-600 hover:text-white hover:bg-white/[0.06] transition-colors"
          title={visible ? "Hide link" : "Show link"}
        >
          <EyeIcon visible={visible} />
        </button>
      </div>
      <div className="px-5 py-4">
        <OverlayLink link={link} visible={visible} />
      </div>
    </div>
  );
};

export default TipsDashboard;