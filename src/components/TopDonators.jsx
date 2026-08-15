import { useEffect, useState } from "react";

export default function TopDonatorsOverlay() {
  const [donators, setDonators] = useState([]);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchTopDonators = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/donations/topDonaters`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch top donators");
      }

      const data = await response.json();

      setDonators(data.slice(0, 5));
    } catch (error) {
      console.error("Top donators error:", error);
    }
  };

  useEffect(() => {
    fetchTopDonators();

    const interval = setInterval(
      fetchTopDonators,
      10000
    );

    return () => clearInterval(interval);
  }, []);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  const getRank = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";

    return `#${index + 1}`;
  };

  /*
    Duplicate the list so the animation
    can loop smoothly.
  */
  const tickerItems = [
    ...donators,
    ...donators,
  ];

  return (
    <div className="overlay">

      <div className="ticker-wrapper">

        <div className="ticker">

          <div className="ticker-track">

            {tickerItems.map((donator, index) => {

              const originalIndex =
                index % donators.length;

              return (
                <div
                  className="ticker-item"
                  key={`${donator.name}-${index}`}
                >

                  <span className="rank">
                    {getRank(originalIndex)}
                  </span>

                  <span className="name">
                    {donator.name || "Anonymous"}
                  </span>

                  <span className="amount">
                    ₹{formatAmount(donator.totalINR)}
                  </span>

                  <span className="separator">
                    •
                  </span>

                </div>
              );

            })}

          </div>

        </div>

      </div>


      <style>{`

        * {
          box-sizing: border-box;
        }


        html,
        body,
        #root {
          margin: 0;
          padding: 0;

          width: 100%;
          height: 100%;

          background: transparent;

          overflow: hidden;
        }


        /* ================================
           OVERLAY
        ================================= */

        .overlay {
          width: 100%;
          height: 100%;

          display: flex;

          align-items: center;
          justify-content: center;

          font-family:
            Inter,
            Segoe UI,
            system-ui,
            sans-serif;
        }


        /* ================================
           TICKER
        ================================= */

        .ticker-wrapper {
          width: 650px;

          max-width: 90vw;

          overflow: hidden;

          border-radius: 999px;

          background:
            rgba(10, 10, 15, 0.72);

          border:
            1px solid
            rgba(255, 255, 255, 0.10);

          box-shadow:
            0 8px 30px
            rgba(0, 0, 0, 0.35),

            0 0 25px
            rgba(168, 85, 247, 0.10);

          backdrop-filter:
            blur(10px);

          -webkit-backdrop-filter:
            blur(10px);

          padding: 8px 0;
        }


        /* ================================
           TICKER TRACK
        ================================= */

        .ticker {
          width: 100%;

          overflow: hidden;
        }


        .ticker-track {
          display: flex;

          width: max-content;

          align-items: center;

          animation:
            tickerScroll 22s linear infinite;
        }


        /*
          The exact distance doesn't matter much
          because we duplicate the items.
        */

        @keyframes tickerScroll {

          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }

        }


        /* ================================
           ITEM
        ================================= */

        .ticker-item {
          display: flex;

          align-items: center;

          white-space: nowrap;

          font-size: 14px;

          padding-left: 18px;
        }


        /* ================================
           RANK
        ================================= */

        .rank {
          margin-right: 7px;

          font-size: 14px;
        }


        /* ================================
           NAME
        ================================= */

        .name {
          color: white;

          font-weight: 700;

          letter-spacing: .1px;
        }


        /* ================================
           AMOUNT
        ================================= */

        .amount {
          margin-left: 6px;

          font-weight: 800;

          background:
            linear-gradient(
              90deg,
              #f472b6,
              #c084fc
            );

          -webkit-background-clip: text;
          background-clip: text;

          color: transparent;
        }


        /* ================================
           SEPARATOR
        ================================= */

        .separator {
          margin-left: 18px;

          color:
            rgba(255, 255, 255, 0.28);

          font-size: 12px;
        }


      `}</style>

    </div>
  );
}
