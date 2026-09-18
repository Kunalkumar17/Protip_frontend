import React, { useCallback, useEffect, useRef, useState } from "react";

const DISPLAY_TIME = 6000;

const MEME_SOUNDS = {
  emotionalsound: "/sounds/emotionalsound.mp3",
  aayein: "/sounds/aayein.mp3",
  faaah: "/sounds/faaah.mp3",
  snore: "/sounds/snore.mp3",
  kuchupuchu: "/sounds/kuchupuchu.mp3",
  RazeUlt: "/sounds/RazeUlt.mp3",
  valorantteleporter: "/sounds/valorantteleporter.mp3",
  weeeee: "/sounds/weeeee.mp3",
  knock: "/sounds/knock.mp3",
  gareeb: "/sounds/gareeb.mp3",
  doglaugh: "/sounds/doglaugh.mp3",
  vasteganahoeyin: "/sounds/vasteganahoeyin.mp3",
  ladkitumbhotboltiho: "/sounds/ladkitumbhotboltiho.mp3",
  meowghopghop: "/sounds/meowghopghop.mp3",
  aisahaikya: "/sounds/aisahaikya.mp3",
  alelele: "/sounds/alelele.mp3",
  nanana: "/sounds/nanana.mp3",
  heyprabhu: "/sounds/heyprabhu.mp3",
  polsagyipols: "/sounds/polsagyipols.mp3",
  takleff: "/sounds/takleff.mp3",
};

const EMOJI_EN_HI = {
  // Faces / reactions
  "ghost":"भूत",
  "skull":"खोपड़ी",
  "skull and crossbones":"खोपड़ी और हड्डियाँ",
  "grinning face":"हँसता चेहरा",
  "smiling face":"मुस्कुराता चेहरा",
  "face with tears of joy":"हँसी के आँसू",
  "rolling on the floor laughing":"हँसते हँसते लोटपोट",
  "winking face":"आँख मारता चेहरा",
  "face blowing a kiss":"चुम्मा देता चेहरा",
  "kissing face":"चुम्मा देता चेहरा",
  "heart eyes":"दिल वाली आँखें",
  "smiling face with heart-eyes":"दिल वाली आँखों वाला चेहरा",
  "thinking face":"सोचता हुआ चेहरा",
  "crying face":"रोता हुआ चेहरा",
  "loudly crying face":"जोर जोर से रोता चेहरा",
  "angry face":"गुस्से वाला चेहरा",
  "face screaming in fear":"डर से चीखता चेहरा",
  "face with sunglasses":"चश्मा लगाए चेहरा",
  "nerd face":"चश्मिश चेहरा",
  "sleeping face":"सोता हुआ चेहरा",
  "dizzy face":"चक्कर खाया चेहरा",
  "hot face":"गर्मी से लाल चेहरा",
  "cold face":"ठंड से काँपता चेहरा",
  "partying face":"पार्टी वाला चेहरा",
  "money-mouth face":"पैसे वाला चेहरा",
  "clown face":"जोकर का चेहरा",
  "poop":"पॉटी",
  "pile of poo":"पॉटी",

  // Hands / gestures
  "oncoming fist":"मुक्का",
  "fist":"मुक्का",
  "raised fist":"उठा हुआ मुक्का",
  "left-facing fist":"मुक्का",
  "right-facing fist":"मुक्का",
  "hand":"हाथ",
  "waving hand":"हाथ हिलाना",
  "raised hand":"उठा हुआ हाथ",
  "clapping hands":"तालियाँ",
  "folded hands":"नमस्ते",
  "thumbs up":"अच्छा है",
  "thumbs down":"बुरा है",
  "ok hand":"ठीक है",
  "victory hand":"विक्ट्री",
  "love-you gesture":"प्यार वाला हाथ",
  "crossed fingers":"उम्मीद है",
  "pointing up":"ऊपर इशारा",
  "backhand index pointing left":"बाएँ इशारा",
  "backhand index pointing right":"दाएँ इशारा",
  "middle finger":"मिडिल फिंगर",
  "pinching hand":"चुटकी",
  "call me hand":"फोन करने वाला हाथ",
  "handshake":"हाथ मिलाना",

  // Food / objects — natural spoken Hindi rather than literal translations
  "lollipop":"चूसने वाली मिठाई",
  "candy":"टॉफी",
  "chocolate bar":"चॉकलेट",
  "ice cream":"आइसक्रीम",
  "cake":"केक",
  "birthday cake":"जन्मदिन का केक",
  "cookie":"बिस्किट",
  "pizza":"पिज़्ज़ा",
  "hamburger":"बर्गर",
  "french fries":"फ्रेंच फ्राइज",
  "hot dog":"हॉट डॉग",
  "popcorn":"पॉपकॉर्न",
  "donut":"डोनट",
  "watermelon":"तरबूज",
  "banana":"केला",
  "apple":"सेब",
  "red apple":"लाल सेब",
  "peach":"आड़ू",
  "cherries":"चेरी",
  "strawberry":"स्ट्रॉबेरी",
  "grapes":"अंगूर",
  "lemon":"नींबू",
  "coffee":"कॉफी",
  "beer mug":"बीयर का मग",
  "clinking beer mugs":"बीयर के गिलास टकराना",
  "wine glass":"शराब का गिलास",

  // Animals / nature
  "dog face":"कुत्ते का चेहरा",
  "cat face":"बिल्ली का चेहरा",
  "mouse face":"चूहे का चेहरा",
  "hamster":"हैम्स्टर",
  "rabbit face":"खरगोश का चेहरा",
  "fox":"लोमड़ी",
  "bear":"भालू",
  "panda":"पांडा",
  "tiger face":"बाघ का चेहरा",
  "lion":"शेर",
  "frog":"मेंढक",
  "monkey face":"बंदर का चेहरा",
  "penguin":"पेंगुइन",
  "unicorn":"यूनिकॉर्न",
  "honeybee":"मधुमक्खी",
  "snake":"साँप",
  "spider":"मकड़ी",
  "butterfly":"तितली",
  "fire":"आग",
  "sparkles":"चमक",
  "star":"सितारा",
  "rainbow":"इंद्रधनुष",
  "sun":"सूरज",
  "crescent moon":"चाँद",
  "cloud":"बादल",
  "snowflake":"बर्फ का टुकड़ा",
  "lightning":"बिजली",
  "tornado":"बवंडर",

  // Common symbols / objects
  "red heart":"लाल दिल",
  "orange heart":"नारंगी दिल",
  "yellow heart":"पीला दिल",
  "green heart":"हरा दिल",
  "blue heart":"नीला दिल",
  "purple heart":"बैंगनी दिल",
  "black heart":"काला दिल",
  "broken heart":"टूटा हुआ दिल",
  "sparkling heart":"चमकता दिल",
  "heart exclamation":"दिल वाला विस्मय चिन्ह",
  "hundred points":"सौ पॉइंट",
  "collision":"धमाका",
  "boom":"धमाका",
  "zzz":"सोने का संकेत",
  "exclamation mark":"विस्मयादिबोधक चिन्ह",
  "question mark":"प्रश्न चिन्ह",
  "check mark button":"सही का निशान",
  "cross mark":"गलत का निशान",
  "prohibited":"मनाही",
  "red circle":"लाल गोला",
  "green circle":"हरा गोला",
  "blue circle":"नीला गोला",
  "yellow circle":"पीला गोला",
  "purple circle":"बैंगनी गोला",
  "white circle":"सफेद गोला",
  "black circle":"काला गोला",
  "eyes":"आँखें",
  "eye":"आँख",
  "mouth":"मुँह",
  "tongue":"जीभ",
  "kiss mark":"चुम्मा",
  "musical notes":"संगीत के सुर",
  "microphone":"माइक",
  "camera":"कैमरा",
  "telephone":"फोन",
  "mobile phone":"मोबाइल",
  "laptop":"लैपटॉप",
  "money bag":"पैसों की थैली",
  "gem stone":"हीरा",
  "crown":"ताज",
  "trophy":"ट्रॉफी",
  "gift":"तोहफा",
  "balloon":"गुब्बारा",
  "rocket":"रॉकेट",
  "bomb":"बम"
};

const HINGLISH_WORDS = {
  "bhai":"भाई", "bhaai":"भाई", "bro":"भाई",
  "kya":"क्या", "kyu":"क्यों", "kyun":"क्यों",
  "kaise":"कैसे", "kaisa":"कैसा", "kaisi":"कैसी",
  "hai":"है", "hain":"हैं", "ho":"हो", "hoga":"होगा",
  "nahi":"नहीं", "nahin":"नहीं", "nai":"नहीं",
  "haan":"हाँ", "han":"हाँ", "acha":"अच्छा", "accha":"अच्छा",
  "achha":"अच्छा", "acchi":"अच्छी", "theek":"ठीक", "thik":"ठीक",
  "yaar":"यार", "yar":"यार", "dost":"दोस्त",
  "aaj":"आज", "kal":"कल", "abhi":"अभी", "phir":"फिर",
  "bahut":"बहुत", "bohot":"बहुत", "thoda":"थोड़ा", "thodi":"थोड़ी",
  "mera":"मेरा", "meri":"मेरी", "mere":"मेरे",
  "tera":"तेरा", "teri":"तेरी", "tere":"तेरे",
  "tum":"तुम", "aap":"आप", "ap":"आप", "main":"मैं", "mein":"में",
  "mujhe":"मुझे", "mujhse":"मुझसे", "hum":"हम", "ham":"हम",
  "karo":"करो", "kar":"कर", "karna":"करना", "karta":"करता",
  "karte":"करते", "karungi":"करूँगी", "karenge":"करेंगे",
  "chal":"चल", "chalo":"चलो", "ruk":"रुक", "ruko":"रुको",
  "dekh":"देख", "dekho":"देखो", "sun":"सुन", "suno":"सुनो",
  "bata":"बता", "batao":"बताओ", "bolo":"बोलो", "bol":"बोल",
  "mast":"मस्त", "sahi":"सही", "zabardast":"ज़बरदस्त",
  "pagal":"पागल", "gajab":"गज़ब", "gazab":"गज़ब",
  "wah":"वाह", "waah":"वाह", "arre":"अरे", "are":"अरे",
  "bas":"बस", "ab":"अब", "toh":"तो", "to":"तो",
  "kyunki":"क्योंकि", "lekin":"लेकिन", "agar":"अगर", "fir":"फिर",
  "sab":"सब", "kuch":"कुछ", "koi":"कोई", "kaun":"कौन",
  "kahan":"कहाँ", "kidhar":"किधर", "kab":"कब",
  "wala":"वाला", "wali":"वाली", "wale":"वाले",
  "please":"प्लीज़", "plz":"प्लीज़", "thanks":"थैंक्स",
  "thankyou":"थैंक यू", "sorry":"सॉरी"
};

const EMOJI_SKIN_TONES = new Map([
  ["🏻", "light skin tone"],
  ["🏼", "medium-light skin tone"],
  ["🏽", "medium skin tone"],
  ["🏾", "medium-dark skin tone"],
  ["🏿", "dark skin tone"],
]);

const EMOJI_VARIATION_SELECTOR = /\uFE0F/g;
const EMOJI_SKIN_TONE_RE = /[🏻🏼🏽🏾🏿]/g;

function normalizeEmojiForLookup(emoji) {
  return emoji.replace(EMOJI_VARIATION_SELECTOR, "");
}

function getEmojiSpeechName(emoji, data) {
  if (!data) return null;
  if (data[emoji]?.name) return data[emoji].name;

  const normalized = normalizeEmojiForLookup(emoji);
  if (data[normalized]?.name) return data[normalized].name;

  const tones = [...emoji.matchAll(EMOJI_SKIN_TONE_RE)].map((m) => m[0]);

  if (tones.length) {
    const base = normalizeEmojiForLookup(emoji).replace(EMOJI_SKIN_TONE_RE, "");
    const baseName = data[base]?.name;

    if (baseName) {
      const toneName = tones.map((t) => EMOJI_SKIN_TONES.get(t)).join(" and ");
      return `${baseName}, ${toneName}`;
    }
  }

  return null;
}

function getEmojiRegex(data) {
  const emojis = Object.keys(data).sort((a, b) => b.length - a.length);

  return new RegExp(
    emojis
      .map((e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|"),
    "gu"
  );
}

function emojiNameInHindi(name) {
  if (!name) return null;
  if (EMOJI_EN_HI[name]) return EMOJI_EN_HI[name];
  return name;
}

function convertEmojiToSpeech(text, data) {
  if (!data || !text) return text;

  const emojiRegex = getEmojiRegex(data);

  return text
    .replace(emojiRegex, (emoji) => {
      const name = getEmojiSpeechName(emoji, data);
      return name ? ` ${emojiNameInHindi(name)} ` : " ";
    })
    .replace(/\s{2,}/g, " ")
    .trim();
}

function normalizeHinglishForTTS(text) {
  if (!text) return text;

  return text.replace(/\b[A-Za-z]+\b/g, (word) => {
    const replacement = HINGLISH_WORDS[word.toLowerCase()];
    return replacement || word;
  });
}

function getCurrencySymbol(currency) {
  const value = currency?.toLowerCase();

  if (value === "inr") return "₹";
  if (value === "usd") return "$";
  if (value === "aud") return "A$";
  if (value === "eur") return "€";
  if (value === "gbp") return "£";
  if (value === "cad") return "C$";
  if (value === "sgd") return "S$";
  if (value === "chf") return "CHF ";

  return value || "";
}

export default function AlertOverlay() {
  const [tip, setTip] = useState(null);
  const [show, setShow] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  const queueRef = useRef([]);
  const isPlayingRef = useRef(false);
  const currentMemeAudioRef = useRef(null);
  const tokenCacheRef = useRef({ value: null, expiresAt: 0 });
  const hideTimerRef = useRef(null);
  const nextTimerRef = useRef(null);
  const emojiNamesRef = useRef(null);
  const emojiPromiseRef = useRef(null);

  // /berry/alert -> berry
  const streamerSlug = window.location.pathname
    .split("/")
    .filter(Boolean)[0]
    ?.toLowerCase()
    .trim();

  const backendUrl = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/$/, "");

  const getAzureToken = useCallback(async () => {
    const now = Date.now();

    if (
      tokenCacheRef.current.value &&
      now < tokenCacheRef.current.expiresAt
    ) {
      return tokenCacheRef.current.value;
    }

    const res = await fetch(`${backendUrl}/api/tts-token`);

    if (!res.ok) {
      throw new Error(`TTS token request failed: ${res.status}`);
    }

    const { token, region } = await res.json();

    tokenCacheRef.current = {
      value: { token, region },
      expiresAt: now + 9 * 60 * 1000,
    };

    return { token, region };
  }, [backendUrl]);

  const loadEmojiNames = useCallback(async () => {
    if (emojiNamesRef.current) return emojiNamesRef.current;
    if (emojiPromiseRef.current) return emojiPromiseRef.current;

    const url =
      "https://cdn.jsdelivr.net/npm/unicode-emoji-json@0.9.0/data-by-emoji.json";

    emojiPromiseRef.current = fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Emoji data HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        emojiNamesRef.current = data;
        console.log(
          `😀 Loaded ${Object.keys(data).length} Unicode emoji names for TTS`
        );
        return data;
      })
      .catch((err) => {
        console.warn("Could not load Unicode emoji names:", err);
        emojiPromiseRef.current = null;
        return null;
      });

    return emojiPromiseRef.current;
  }, []);

  const playMemeSound = useCallback((soundId) => {
    const soundPath = MEME_SOUNDS[soundId];

    if (!soundPath) {
      console.error("Sound not found for ID:", soundId);
      return Promise.resolve();
    }

    if (currentMemeAudioRef.current) {
      currentMemeAudioRef.current.pause();
      currentMemeAudioRef.current.currentTime = 0;
    }

    const audio = new Audio(soundPath);
    currentMemeAudioRef.current = audio;
    audio.volume = 1;

    return new Promise((resolve) => {
      const finish = () => resolve();

      audio.onended = finish;
      audio.onerror = (error) => {
        console.error("Audio failed to load:", soundPath, error);
        finish();
      };

      audio.play().catch((error) => {
        console.error("Audio play failed:", error);
        finish();
      });
    });
  }, []);

  const speakTip = useCallback(
    async (currentTip) => {
      if (!(Number(currentTip.convertedAmount) >= 40)) return;

      try {
        const { token, region } = await getAzureToken();

        const parts = [
          currentTip.user || currentTip.name || "Someone",
          "tipped",
          currentTip.currency
            ? currentTip.currency.toUpperCase()
            : "",
          String(currentTip.amount ?? 0),
        ].filter(Boolean);

        const displayText =
          parts.join(" ") +
          (currentTip.message ? `. ${currentTip.message}` : ".");

        const emojiData = await loadEmojiNames();
        const emojiText = convertEmojiToSpeech(displayText, emojiData);
        const text = normalizeHinglishForTTS(emojiText);

        const escapeSSML = (value) =>
          value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        const ssml = `
          <speak version="1.0" xml:lang="hi-IN">
            <voice name="hi-IN-SwaraNeural">
              ${escapeSSML(text)}
            </voice>
          </speak>
        `.trim();

        const res = await fetch(
          `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/ssml+xml",
              "X-Microsoft-OutputFormat":
                "audio-24khz-96kbitrate-mono-mp3",
            },
            body: ssml,
          }
        );

        if (!res.ok) {
          console.error("Azure TTS failed:", res.status, await res.text());
          return;
        }

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);

        await new Promise((resolve) => {
          audio.onended = resolve;
          audio.onerror = resolve;
          audio.play().catch((err) => {
            console.warn("TTS playback blocked:", err);
            resolve();
          });
        });

        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("TTS error:", error);
      }
    },
    [getAzureToken, loadEmojiNames]
  );

  const createSparkles = useCallback(() => {
    const items = Array.from({ length: 15 }, (_, index) => ({
      id: `${Date.now()}-${index}-${Math.random()}`,
      left: Math.random() * 100,
      top: 50 + Math.random() * 40,
      delay: Math.random() * 0.5,
    }));

    setSparkles(items);
    window.setTimeout(() => setSparkles([]), 2500);
  }, []);

  const next = useCallback(async () => {
    if (isPlayingRef.current || !queueRef.current.length) return;

    const nextTip = queueRef.current.shift();
    if (!nextTip) return;

    isPlayingRef.current = true;
    setTip(nextTip);
    setShow(true);
    createSparkles();

    // Sound first, with no artificial delay.
    if (nextTip.memeSound) {
      await playMemeSound(nextTip.memeSound);
    }

    // TTS starts after the meme sound has finished.
    await speakTip(nextTip);

    hideTimerRef.current = window.setTimeout(() => {
      setShow(false);

      nextTimerRef.current = window.setTimeout(() => {
        isPlayingRef.current = false;
        next();
      }, 500);
    }, DISPLAY_TIME);
  }, [createSparkles, playMemeSound, speakTip]);

  const showAlert = useCallback(
    (newTip) => {
      queueRef.current.push(newTip);
      next();
    },
    [next]
  );

  useEffect(() => {
    if (!streamerSlug) {
      console.error("No streamer slug found in alert URL.");
      return;
    }

    if (!backendUrl) {
      console.error("VITE_BACKEND_URL is missing.");
      return;
    }

    const wsUrl = backendUrl
      .replace(/^http:/, "ws:")
      .replace(/^https:/, "wss:");

    const ws = new WebSocket(
      `${wsUrl}/?streamer=${encodeURIComponent(streamerSlug)}`
    );

    ws.onopen = () => {
      console.log("Tip WebSocket connected for:", streamerSlug);
    };

    ws.onmessage = (event) => {
  console.log("📨 RAW WS MESSAGE:", event.data);

  try {
    const data = JSON.parse(event.data);

    console.log("📦 PARSED WS DATA:", data);
    console.log("📌 MESSAGE TYPE:", data.type);

    if (data.type === "tipAlert") {
      console.log("🚨 TIP ALERT RECEIVED:", data);

      showAlert(data);
    }

    if (data.type === "goalInit") {
      console.log("🎯 GOAL INIT RECEIVED:", data);
    }

    if (data.type === "goalUpdate") {
      console.log("🎯 GOAL UPDATE RECEIVED:", data);
    }
  } catch (error) {
    console.error("❌ WS JSON ERROR:", error);
  }
};

    ws.onerror = (error) => {
      console.error("Tip WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("Tip WebSocket disconnected. Reconnecting...");
      window.setTimeout(() => window.location.reload(), 3000);
    };

    return () => {
      ws.close();

      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
      }

      if (nextTimerRef.current) {
        window.clearTimeout(nextTimerRef.current);
      }

      if (currentMemeAudioRef.current) {
        currentMemeAudioRef.current.pause();
        currentMemeAudioRef.current.currentTime = 0;
      }
    };
  }, [backendUrl, showAlert, streamerSlug]);

  const symbol = getCurrencySymbol(tip?.currency);
  const amount = Number(tip?.amount || 0);
  const tipperName = tip?.user || tip?.name || "Anonymous";

  return (
    <>
      <style>{`
        @keyframes alertGradientMove {
          from { background-position: 0% 50%; }
          to { background-position: 200% 50%; }
        }

        @keyframes alertHeartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @keyframes alertLineOpen {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes alertLineClose {
          from { width: 100%; }
          to { width: 0; }
        }

        @keyframes alertSparkle {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(.4) rotate(0deg);
          }
          25% { opacity: .9; }
          100% {
            opacity: 0;
            transform: translateY(-120px) scale(1.15) rotate(90deg);
          }
        }

        .alert-line-animation {
          animation:
            alertLineOpen .8s cubic-bezier(.16,1,.3,1) forwards,
            alertLineClose .8s ease forwards 5.2s;
        }

        .alert-gradient-animation {
          background-size: 200% 100%;
          animation: alertGradientMove 3s linear infinite;
        }

        .alert-sparkle-animation {
          animation: alertSparkle 2s ease-out forwards;
        }
      `}</style>

      <div
        className={[
          "fixed inset-0 flex items-center justify-center",
          "pointer-events-none transition-all duration-500",
          show
            ? "visible opacity-100 translate-y-0 scale-100"
            : "invisible opacity-0 translate-y-[25px] scale-[0.94]",
        ].join(" ")}
      >
        <div
          className={[
            "relative w-[min(620px,90vw)] overflow-hidden",
            "rounded-[24px] border border-white/10",
            "bg-[rgba(15,15,20,0.78)] px-[42px] pb-8 pt-[30px]",
            "text-center",
            "shadow-[0_20px_60px_rgba(0,0,0,0.45),0_0_35px_rgba(168,85,247,0.18)]",
            "backdrop-blur-[14px]",
          ].join(" ")}
        >
          <div className="pointer-events-none absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 alert-gradient-animation" />

          <div className="mb-2 flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-[2.5px] text-purple-300">
            <span
              className="inline-block text-[15px]"
              style={{ animation: "alertHeartBeat 1.2s ease-in-out infinite" }}
            >
              ♥
            </span>
            NEW TIP
            <span
              className="inline-block text-[15px]"
              style={{ animation: "alertHeartBeat 1.2s ease-in-out infinite" }}
            >
              ♥
            </span>
          </div>

          <div className="text-[30px] font-[750] leading-tight tracking-[-0.5px] text-white">
            {tipperName} tipped
          </div>

          <div className="mt-1.5 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-[22px] font-extrabold text-transparent">
            {symbol}{amount.toFixed(2)}
          </div>

          <div className="my-5 flex w-full justify-center">
            <div
              key={
                tip
                  ? `${tipperName}-${tip.amount}-${tip.message ?? ""}-${tip.memeSound ?? ""}`
                  : "empty"
              }
              className="h-[3px] rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-[0_0_10px_rgba(168,85,247,0.35)] alert-line-animation"
            />
          </div>

          {tip?.message ? (
            <div className="mx-auto mt-3.5 max-w-[540px] break-words rounded-[14px] border border-purple-300/35 bg-purple-500/15 px-5 py-3.5 text-[20px] font-extrabold leading-[1.5] text-white shadow-[inset_0_0_20px_rgba(168,85,247,0.08),0_6px_22px_rgba(0,0,0,0.18)]">
              <span className="mx-[3px] align-[-4px] text-[25px] font-extrabold text-purple-300">
                “
              </span>
              <span>{tip.message}</span>
              <span className="mx-[3px] align-[-4px] text-[25px] font-extrabold text-purple-300">
                ”
              </span>
            </div>
          ) : null}

          <div className="pointer-events-none absolute -right-[100px] -top-[150px] h-[220px] w-[220px] rounded-full bg-purple-500/10 blur-[30px]" />

          {sparkles.map((sparkle) => (
            <span
              key={sparkle.id}
              className="pointer-events-none absolute h-3 w-3 bg-white opacity-0 alert-sparkle-animation"
              style={{
                left: `${sparkle.left}%`,
                top: `${sparkle.top}%`,
                animationDelay: `${sparkle.delay}s`,
                clipPath:
                  "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
