import React, { useState } from "react";
import useLiveTips from "./useLiveTips";

const initialTips = [];

const TipsDashboard = () => {
  const [tips, setTips] = useState(initialTips);

  useLiveTips(setTips);

  const totalTips = tips.reduce((sum, tip) => sum + tip.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold">💸 Live Tips Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Stat title="Total Tips" value={`₹${totalTips}`} />
          <Stat title="Supporters" value={tips.length} />
          <Stat title="Highest Tip" value={`₹${Math.max(0, ...tips.map(t => t.amount))}`} />
        </div>

        <div className="bg-white rounded-xl shadow">
          <div className="p-6 border-b font-semibold">
            Live Tips
          </div>

          {tips.length === 0 ? (
            <p className="p-6 text-gray-500">Waiting for tips… 👀</p>
          ) : (
            <ul className="divide-y">
              {tips.map((tip) => (
                <li key={tip.id} className="p-6 flex justify-between">
                  <div>
                    <p className="font-semibold">{tip.user}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">{tip.message}</p>
                  </div>
                  <p className="font-bold text-green-600">
                    ₹{tip.amount}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

const Stat = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <p className="text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

export default TipsDashboard;