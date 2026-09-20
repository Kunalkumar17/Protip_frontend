import { useEffect, useState } from "react";
import { adminApi } from "../api/adminApi";

export default function AdminDashboard() {
  const [overview, setOverview] = useState(null);
  const [streamers, setStreamers] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [tips, setTips] = useState([]);

  const [activeTab, setActiveTab] = useState("overview");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [tipsPage, setTipsPage] = useState(1);
  const [tipsPagination, setTipsPagination] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const [
        overviewData,
        streamersData,
        payoutsData,
        tipsData,
      ] = await Promise.all([
        adminApi.overview(),
        adminApi.streamers(),
        adminApi.payouts(),
        adminApi.tips(1, 20),
      ]);

      setOverview(overviewData);
      setStreamers(streamersData.streamers || streamersData || []);
      setPayouts(payoutsData.payouts || payoutsData || []);
      setTips(tipsData.tips || tipsData || []);
      setTipsPagination(tipsData.pagination || null);
    } catch (err) {
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  async function loadTips(page) {
    try {
      const data = await adminApi.tips(page, 20);

      setTips(data.tips || data || []);
      setTipsPagination(data.pagination || null);
      setTipsPage(page);
    } catch (err) {
      setError(err.message);
    }
  }

  async function logout() {
    try {
      await adminApi.logout();
    } finally {
      window.location.href = "/login";
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white flex">
      {/* Sidebar */}

      <aside className="w-64 border-r border-white/10 bg-[#0d0d0d] p-5 hidden md:block">
        <div className="mb-10">
          <h1 className="text-2xl font-bold">
            Pro<span className="text-purple-500">Tip</span>
          </h1>

          <p className="text-xs text-gray-500 mt-1">
            Administration
          </p>
        </div>

        <nav className="space-y-2">
          <NavButton
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </NavButton>

          <NavButton
            active={activeTab === "streamers"}
            onClick={() => setActiveTab("streamers")}
          >
            Streamers
          </NavButton>

          <NavButton
            active={activeTab === "tips"}
            onClick={() => setActiveTab("tips")}
          >
            Tips
          </NavButton>

          <NavButton
            active={activeTab === "payouts"}
            onClick={() => setActiveTab("payouts")}
          >
            Payouts
          </NavButton>
        </nav>

        <button
          onClick={logout}
          className="mt-10 w-full text-left px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main */}

      <main className="flex-1 p-5 md:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold">
              {activeTab === "overview" && "Overview"}
              {activeTab === "streamers" && "Streamers"}
              {activeTab === "tips" && "Tips"}
              {activeTab === "payouts" && "Payouts"}
            </h2>

            <p className="text-gray-500 mt-1">
              Manage your ProTip platform.
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {activeTab === "overview" && (
            <Overview
              overview={overview}
              streamers={streamers}
              payouts={payouts}
            />
          )}

          {activeTab === "streamers" && (
            <Streamers streamers={streamers} />
          )}

          {activeTab === "tips" && (
            <Tips
              tips={tips}
              pagination={tipsPagination}
              page={tipsPage}
              onPageChange={loadTips}
            />
          )}

          {activeTab === "payouts" && (
            <Payouts />
          )}
        </div>
      </main>
    </div>
  );
}

function NavButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-lg transition ${
        active
          ? "bg-purple-600/15 text-purple-400"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function Overview({ overview }) {
  if (!overview) return null;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Streamers"
          value={overview.totalStreamers ?? 0}
        />

        <StatCard
          title="Verified Streamers"
          value={overview.verifiedStreamers ?? 0}
        />

        <StatCard
          title="Total Tips"
          value={overview.totalTips ?? 0}
        />

        <StatCard
          title="Successful Tips"
          value={overview.successfulTips ?? 0}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <MoneyCard
          title="Total Revenue"
          value={overview.totalRevenue ?? 0}
        />

        <MoneyCard
          title="Today's Revenue"
          value={overview.todayRevenue ?? 0}
        />

        <MoneyCard
          title="This Month"
          value={overview.monthRevenue ?? 0}
        />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-5">
      <p className="text-sm text-gray-500">{title}</p>

      <p className="text-3xl font-semibold mt-3">
        {Number(value).toLocaleString()}
      </p>
    </div>
  );
}

function MoneyCard({ title, value }) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-5">
      <p className="text-sm text-gray-500">{title}</p>

      <p className="text-2xl font-semibold mt-3">
        ₹{Number(value).toLocaleString("en-IN")}
      </p>
    </div>
  );
}

function Streamers({ streamers }) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-white/10 text-sm text-gray-500">
            <tr>
              <th className="px-5 py-4">Username</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Channel</th>
              <th className="px-5 py-4">Tips</th>
              <th className="px-5 py-4">Revenue</th>
            </tr>
          </thead>

          <tbody>
            {streamers.map((streamer) => (
              <tr
                key={streamer._id}
                className="border-b border-white/5 hover:bg-white/[0.02]"
              >
                <td className="px-5 py-4">
                  {streamer.username}
                </td>

                <td className="px-5 py-4 text-gray-400">
                  {streamer.email}
                </td>

                <td className="px-5 py-4">
                  {streamer.channelName || "-"}
                </td>

                <td className="px-5 py-4">
                  {streamer.totalTips ?? 0}
                </td>

                <td className="px-5 py-4">
                  ₹
                  {Number(
                    streamer.totalAmount || 0
                  ).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {streamers.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No streamers found.
        </div>
      )}
    </div>
  );
}

function Tips({
  tips,
  pagination,
  page,
  onPageChange,
}) {
  return (
    <div>
      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-white/10 text-sm text-gray-500">
              <tr>
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Streamer</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">INR</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {tips.map((tip) => (
                <tr
                  key={tip._id}
                  className="border-b border-white/5"
                >
                  <td className="px-5 py-4">
                    {tip.name}
                  </td>

                  <td className="px-5 py-4 text-gray-400">
                    {tip.streamerId?.username || "-"}
                  </td>

                  <td className="px-5 py-4">
                    {tip.currency?.toUpperCase()}{" "}
                    {tip.amount}
                  </td>

                  <td className="px-5 py-4">
                    ₹
                    {Number(
                      tip.convertedAmount || 0
                    ).toLocaleString("en-IN")}
                  </td>

                  <td className="px-5 py-4">
                    {tip.payment ? (
                      <span className="text-green-400">
                        Paid
                      </span>
                    ) : (
                      <span className="text-yellow-400">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4 text-gray-500">
                    {new Date(
                      tip.createdAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {tips.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No tips found.
          </div>
        )}
      </div>

      {pagination && (
        <div className="flex items-center justify-between mt-4">
          <button
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="px-4 py-2 rounded-lg bg-white/5 disabled:opacity-30"
          >
            Previous
          </button>

          <span className="text-gray-500">
            Page {page}
          </span>

          <button
            disabled={
              pagination.totalPages
                ? page >= pagination.totalPages
                : tips.length < 20
            }
            onClick={() => onPageChange(page + 1)}
            className="px-4 py-2 rounded-lg bg-white/5 disabled:opacity-30"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function Payouts() {
  const now = new Date();

  const [month, setMonth] = useState(
    now.getMonth()
  );

  const [year, setYear] = useState(
    now.getFullYear()
  );

  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadPayouts() {
    try {
      setLoading(true);

      const data = await adminApi.payouts(
        month,
        year
      );

      setPayouts(data.payouts || []);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPayouts();
  }, [month, year]);

  async function markPaid(payout) {
    const reference = window.prompt(
      `Payment reference for ${payout.username}:`
    );

    if (reference === null) {
      return;
    }

    try {
      await adminApi.markPayoutPaid(
        payout._id,
        reference
      );

      await loadPayouts();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <select
          value={month}
          onChange={(e) =>
            setMonth(Number(e.target.value))
          }
          className="bg-[#111] border border-white/10 rounded-lg px-4 py-2"
        >
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((name, index) => (
            <option key={index} value={index}>
              {name}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) =>
            setYear(Number(e.target.value))
          }
          className="bg-[#111] border border-white/10 rounded-lg px-4 py-2"
        >
          {[2026, 2027, 2028].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-white/10 text-sm text-gray-500">
              <tr>
                <th className="px-5 py-4">
                  Streamer
                </th>

                <th className="px-5 py-4">
                  Email
                </th>

                <th className="px-5 py-4">
                  Tips
                </th>

                <th className="px-5 py-4">
                  Amount
                </th>

                <th className="px-5 py-4">
                  Status
                </th>

                <th className="px-5 py-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {payouts.map((payout) => (
                <tr
                  key={payout._id}
                  className="border-b border-white/5"
                >
                  <td className="px-5 py-4">
                    <div className="font-medium">
                      {payout.username}
                    </div>

                    <div className="text-xs text-gray-500">
                      {payout.channelName || ""}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-gray-400">
                    {payout.email}
                  </td>

                  <td className="px-5 py-4">
                    {payout.totalTips}
                  </td>

                  <td className="px-5 py-4 font-medium">
                    ₹
                    {Number(
                      payout.totalAmount || 0
                    ).toLocaleString("en-IN")}
                  </td>

                  <td className="px-5 py-4">
                    {payout.status === "paid" ? (
                      <div>
                        <span className="text-green-400">
                          Paid
                        </span>

                        {payout.paidAt && (
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(
                              payout.paidAt
                            ).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-yellow-400">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    {payout.status !== "paid" && (
                      <button
                        onClick={() =>
                          markPaid(payout)
                        }
                        className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 transition text-sm"
                      >
                        Mark Paid
                      </button>
                    )}

                    {payout.status === "paid" && (
                      <span className="text-gray-500 text-sm">
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {loading && (
          <div className="p-8 text-center text-gray-500">
            Loading payouts...
          </div>
        )}

        {!loading && payouts.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No payouts for this month.
          </div>
        )}
      </div>
    </div>
  );
}