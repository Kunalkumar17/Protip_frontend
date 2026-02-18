import { useEffect, useState } from 'react';
import { Heart, Sparkles, Send , Home } from 'lucide-react';
import confetti from "canvas-confetti";

export default function TippingPage() {
  const [amount, setAmount] = useState('100');
  const [message, setMessage] = useState('');
  const [name, setName] = useState("");
  const MIN_AMOUNT = 20;
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [recentTips, setRecentTips] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const getTips = async() => {
    try {
      const response = await fetch(`${backendUrl}/donations/gettips` , {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      const data = await response.json();
      if(response.status === 200) {
        const last3 = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);

          setRecentTips(last3)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTips();
  }, []);

  const presetAmounts = currency === "INR"
  ? [100, 200, 500, 1000]
  : currency === "USD"
  ? [5, 10, 20, 50]
  : [5, 10, 20, 50];

  const initPay = (order) => {
  const options = {
    key: import.meta.env.VITE_RAZOR_KEY_ID,
    amount: order.amount,
    currency: currency,
    name: "Berry",
    description: "Support the stream",
    order_id: order.id,

    handler: async (response) => {
      try {
        const verifyRes = await fetch(
          `${backendUrl}/donations/verifyRazorpay`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          }
        );

        if (verifyRes.status === 201) {
          setShowSuccess(true);
          fireConfetti();
          setTimeout(() => setShowSuccess(false), 3000);
        } else {
          alert("Payment verification failed");
        }
      } catch (err) {
        console.error(err);
        alert("Payment failed");
      }
      finally {
        setLoading(false)
      }
    },
    modal: {
      ondismiss: () => {
        alert("Trasaction Cancelled! Try Again!")
        setLoading(false);   // ✅ user closed popup
      }
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

  const handleSubmit = async () => {
  if (currency === "INR")
    if (!amount || Number(amount) < MIN_AMOUNT) {
      alert(`Minimum tip amount is ₹${MIN_AMOUNT}`);
      return;
    }

  const finalName = name.trim() || "Anonymous";

  try {
    setLoading(true);   // ✅ START LOADER

    const response = await fetch(`${backendUrl}/donations/razorpay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: finalName,
        amount: Number(amount),
        message,
        currency
      })
    });

    const order = await response.json();

    if (response.status === 201) {
      initPay(order);
    } else {
      alert("Failed to create order");
      setLoading(false)
    }

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  } finally {   // ✅ STOP LOADER (always runs)
  }
};

const fireConfetti = () => {
  const duration = 2500;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 70,
      origin: { x: 0 }
    });

    confetti({
      particleCount: 3,
      angle: 120,
      spread: 70,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};


  return (
    <div className="min-h-screen relative overflow-hidden p-4 flex items-center justify-center">
      {/* Animated Berry Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50">
        {/* Strawberries */}
        <div className="berry strawberry absolute w-24 h-24 opacity-80" style={{ top: '10%', left: '15%' }}></div>
        <div className="berry strawberry absolute w-20 h-20 opacity-70" style={{ top: '60%', left: '70%' }}></div>
        <div className="berry strawberry absolute w-28 h-28 opacity-75" style={{ top: '30%', left: '80%' }}></div>
        
        {/* Blueberries */}
        <div className="berry blueberry absolute w-20 h-20 opacity-85" style={{ top: '20%', left: '20%' }}></div>
        <div className="berry blueberry absolute w-24 h-24 opacity-75" style={{ top: '70%', left: '10%' }}></div>
        <div className="berry blueberry absolute w-18 h-18 opacity-70" style={{ top: '50%', left: '85%' }}></div>
        
        {/* Blackberries */}
        <div className="berry blackberry absolute w-28 h-28 opacity-75" style={{ top: '10%', left: '60%' }}></div>
        <div className="berry blackberry absolute w-22 h-22 opacity-80" style={{ top: '80%', left: '50%' }}></div>
        <div className="berry blackberry absolute w-24 h-24 opacity-70" style={{ top: '40%', left: '5%' }}></div>
      </div>

      {loading && (
  <div className="fixed inset-0 z-50 flex items-center justify-center
                  bg-white/30 backdrop-blur-md">
    
    <div className="bg-white rounded-2xl shadow-xl px-8 py-6 flex flex-col items-center gap-4">
      
      <div className="w-10 h-10 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
      
      <p className="font-semibold text-gray-700">
        Processing your tip...
      </p>

    </div>
  </div>
)}
      
       <button
  onClick={() => window.location.href = "/"}
  className="absolute top-5 left-5 z-20 flex items-center gap-2
             bg-white/80 backdrop-blur-md border border-pink-200
             px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition hover:cursor-pointer"
>
  <Home className="w-5 h-5 text-pink-500" />
</button>
      
      <div className="max-w-4xl w-full space-y-6 relative z-10">
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-pink-100 overflow-hidden">
  
          {/* Slim Banner */}
          <div
            className="relative h-32 w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://yt3.googleusercontent.com/8Dq8bW95xatklgGQDe1F6sJed3Y6y1gUT4-2OqBxTXamsh2whgaYJvQIWMIf8J9YX-mLDHHIxQ=w1138-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj')",
            }}
          >
          {/* Overlay */}
          <div className="absolute inset-0 flex items-center px-6">
            
            {/* Profile */}
            <div className="relative">
              <img
                src="https://yt3.googleusercontent.com/AogwYle8h_TG9_wjkWoWXuSOGIzcQeE1POYjfi4RlAvN4MCxZklytv0tLZ4mGYHgSk31qINENw=s160-c-k-c0x00ffffff-no-rj"
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
            </div>

            {/* Channel Info */}
            <div className="ml-5 text-white drop-shadow-lg">
              <h2 className="text-xl font-bold leading-tight">Berry</h2>
              <p className="text-xs opacity-90">@911berry • 21K subscribers</p>
            </div>

          </div>
      </div>

      </div>

        <div className="grid md:grid-cols-2 gap-6">
        
        {/* Tipping Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-pink-400 to-purple-400 p-3 rounded-2xl">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Send a Berry
              </h1>
              <p className="text-sm text-gray-500">Support the stream with love</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name( Or send as Anonymous)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Anonymous"
                className="w-full px-4 py-3 bg-pink-50/50 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tip Amount ({currency})
              </label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset.toString())}
                    className={`py-2 rounded-xl font-medium transition-all ${
                      amount === preset.toString()
                        ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg scale-105'
                        : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                    }`}
                  >
                    {}{preset}
                  </button>
                ))}
              </div>
              <div className='flex gap-2'>
                <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Custom amount"
                min="20"
                step="1"
                className="w-full px-4 py-3 bg-pink-50/50 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
              />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-[40%] px-4 py-3 bg-pink-50/50 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="AUD">AUD</option>
                </select>
              </div>
              
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Send a message..."
                rows="3"
                className="w-full px-4 py-3 bg-pink-50/50 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all resize-none"
              />
            </div>

            <button
  onClick={handleSubmit}
  disabled={loading}
  className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all
    ${loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-gradient-to-r from-pink-400 via-purple-400 to-rose-400 hover:shadow-lg hover:scale-105 text-white"
    }
  `}
>
  {loading ? (
    <>
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      Processing...
    </>
  ) : (
    <>
      <Send className="w-5 h-5" />
      Send Tip
    </>
  )}
</button>
          </div>

          {showSuccess && (
            <div className="mt-4 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2 animate-pulse">
              <Sparkles className="w-5 h-5" />
              <span>Tip sent successfully! Thank you! 💕</span>
            </div>
          )}
        </div>

        {/* Recent Tips */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-purple-100">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Recent Tips
            </h2>
          </div>

          <div className="space-y-4">
            {recentTips.map((tip, index) => (
              <div
                key={tip._id}
                className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-2xl border border-pink-200 hover:shadow-md transition-all animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center text-white font-semibold">
                      {tip.name[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{tip.name}</p>
                      <p className="text-xs text-gray-500">Just now</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-3 py-1 rounded-full font-bold text-sm">
                    {tip.currency.toUpperCase()} {tip.amount}
                  </div>
                </div>
                {tip.message && (
                  <p className="text-gray-600 text-sm ml-12 italic">
                    "{tip.message}"
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 text-pink-400" fill="currentColor" />
              Thank you for your support!
              <Heart className="w-4 h-4 text-pink-400" fill="currentColor" />
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}