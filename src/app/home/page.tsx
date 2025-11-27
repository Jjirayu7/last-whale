"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";


export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [popCount, setPopCount] = useState(0);

// 🎬 วิดีโอตามวันที่
const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
const [showVideo, setShowVideo] = useState(false);

const handleDateClick = (day: number) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const formatted = `${year}_${String(month).padStart(2, "0")}_${String(day).padStart(2, "0")}`;

  const videoMap: Record<string, string> = {
    "2025_11_27": "https://www.youtube.com/embed/n5OoVaS8OZs?autoplay=1&mute=0",
  };

  const rawUrl = videoMap[formatted];

  if (!rawUrl) {
    toast.error(`🌸 ไม่มีวิดีโอสำหรับวันที่ ${day}/${month}/${year}`, {
      description: "ลองเลือกวันอื่นดูนะลัคกี้ 💫",
      style: {
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(8px)",
        borderRadius: "10px",
        color: "#1e3a8a",
        fontWeight: 500,
      },
    });
    setSelectedVideo(null);
    setShowVideo(false);
    return;
  }

  let embedUrl = rawUrl;
  if (rawUrl.includes("youtu.be/")) {
    const id = rawUrl.split("youtu.be/")[1].split("?")[0];
    embedUrl = `https://www.youtube.com/embed/${id}`;
  } else if (rawUrl.includes("watch?v=")) {
    const id = rawUrl.split("watch?v=")[1].split("&")[0];
    embedUrl = `https://www.youtube.com/embed/${id}`;
  }

  setSelectedVideo(embedUrl);
  setShowVideo(false);

  toast.success("✨ เจอวิดีโอแล้วววโบ้วว กด ▶️ ได้เลยนะ 💙", {
    duration: 2500,
    style: {
      background: "rgba(240,248,255,0.9)",
      borderRadius: "10px",
      color: "#2563eb",
      fontWeight: 600,
      backdropFilter: "blur(10px)",
    },
  });
};


  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsClient(true);
    audioRef.current = new Audio("/sharp-pop-328170.mp3");
    audioRef.current.volume = 0.5;
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      setCurrentTime(now.toLocaleString("th-TH", options));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [isClient]);

  // 📅 ปฏิทิน
  const generateCalendar = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const days: { day: number; is14th: boolean; isToday: boolean }[] = [];

    for (let d = 1; d <= daysInMonth; d++) {
      days.push({
        day: d,
        is14th: d === 14,
        isToday:
          d === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear(),
      });
    }

    const blanks = Array(firstDay).fill(null);
    return [...blanks, ...days];
  };

  const [calendarDays, setCalendarDays] = useState(
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth())
  );

  useEffect(() => {
    if (!isClient) return;
    setCalendarDays(
      generateCalendar(currentDate.getFullYear(), currentDate.getMonth())
    );
  }, [currentDate, isClient]);

  const goNextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  const goPrevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );

  const goToNext = () => router.push("/next-356982");
  const goToPrev = () => router.push("/music-356982");

  // 🪼 แมงกระพรุน
  const jellyfish = useMemo(() => {
    if (!isClient) return [];
    const fishes = [];
    for (let i = 0; i < 14; i++) {
      fishes.push({
        id: i,
        type: i === 0 ? "/jellyfish-red.png" : "/jellyfish-blue.png",
        left: `${Math.random() * 80}%`,
        top: `${70 + Math.random() * 30}%`,
        delay: Math.random() * 3,
        duration: 6 + Math.random() * 4,
        size: 50 + Math.random() * 120,
      });
    }
    return fishes;
  }, [isClient]);

  // 🐋 Click Whale
  const handleWhaleClick = () => {
    setPopCount((prev) => prev + 1);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  if (!isClient) return null;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-center font-sans">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg1.png')" }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* ส่วนบน */}
      <div className="absolute top-6 flex flex-col items-center z-40">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-blue-300 text-7xl font-extrabold drop-shadow-lg tracking-widest"
        >
          JN
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-blue-300 text-lg font-medium mt-2 drop-shadow-md"
        >
          {currentTime}
        </motion.p>

        {/* ปฏิทิน */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="bg-white/20 backdrop-blur-md rounded-xl px-4 p-2 mt-2 shadow-md border border-white/40 text-blue-300 scale-100"
        >
          <div className="flex justify-between items-center mb-1">
            <button
              onClick={goPrevMonth}
              className="bg-white/30 hover:bg-white/60 text-sky-900 font-bold px-1.5 py-0.5 rounded-md text-xs"
            >
              ‹
            </button>
            <span className="font-semibold text-sm">
              {currentDate.toLocaleString("th-TH", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              onClick={goNextMonth}
              className="bg-white/30 hover:bg-white/60 text-sky-900 font-bold px-1.5 py-0.5 rounded-md text-xs"
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-xs">
            {["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map((d) => (
              <div key={d} className="text-blue-100 font-semibold text-center text-xs">
                {d}
              </div>
            ))}
            {calendarDays.map((d, i) =>
              d ? (
                <button
                  key={i}
                  onClick={() => handleDateClick(d.day)}
                  className={`text-center py-0.5 rounded-full ${
                    d.isToday
                      ? "bg-blue-300 text-white font-bold"
                      : d.is14th
                      ? "bg-pink-400 text-white font-bold"
                      : "hover:bg-white/20"
                  }`}
                >
                  {d.day}
                </button>
              ) : (
                <div key={i}></div>
              )
            )}
          </div>
        </motion.div>
        {/* 🎥 ปุ่มเล่นและแสดงวิดีโอ */}
{selectedVideo && !showVideo && (
  <motion.button
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    onClick={() => setShowVideo(true)}
    className="mt-4 bg-blue-400/70 hover:bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md backdrop-blur-sm"
  >
    ▶️ เล่นวิดีโอ
  </motion.button>
)}

{showVideo && selectedVideo && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="mt-4 relative w-[90vw] max-w-2xl aspect-video rounded-xl overflow-hidden shadow-lg border border-white/40"
  >
    <button
      onClick={() => setShowVideo(false)}
      className="absolute top-2 right-2 bg-white/70 hover:bg-white text-sky-900 font-bold rounded-full w-8 h-8 flex items-center justify-center z-50"
    >
      ✕
    </button>
    <iframe
      src={selectedVideo}
      title="YouTube Video"
      width="100%"
      height="100%"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </motion.div>
)}
      </div>

      {/* ปุ่มเปลี่ยนหน้า */}
      <div className="absolute top-1/2 left-0 w-full flex justify-between px-6 z-30">
      {/* ปุ่มก่อนหน้า */}
      <button
        onClick={goToPrev}
        className="bg-white/40 hover:bg-white/70 text-sky-900 font-bold text-xl rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-md shadow-md"
      >
        ‹
      </button>

      {/* ปุ่มถัดไป */}
      <button
        onClick={goToNext}
        className="bg-white/40 hover:bg-white/70 text-sky-900 font-bold text-xl rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-md shadow-md"
      >
        ›
      </button>
    </div>
     


      {/* Jellyfish */}
      {jellyfish.map((j) => (
        <motion.img
          key={j.id}
          src={j.type}
          alt="jellyfish"
          className={`absolute z-20 select-none ${
            j.type.includes("red")
              ? "drop-shadow-[0_0_15px_rgba(255,100,100,0.8)]"
              : "drop-shadow-[0_0_10px_rgba(100,200,255,0.7)]"
          }`}
          style={{
            left: j.left,
            top: j.top,
            width: `${j.size}px`,
            touchAction: "none",
            cursor: "grab",
          }}
          animate={{
            rotate: [0, 3, -3, 0],
            y: [0, -40, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: j.duration,
            delay: j.delay,
            ease: "easeInOut",
          }}
          drag
          dragElastic={0.4}
          dragMomentum={false}
          onClick={() => setMessage(j.type.includes("red") ? "❤️" : "💙")}
        />
      ))}
      <div className="text-xs relative top-110">
          พรุ่งนี้จะต้องใส่ชุดครุยแล้วสิ <br />
          อยากให้เทออยู่ข้างๆในวันนี้จัง ทำไมถึงไม่มีใครเลยนะ <br />
          แย่จังไม่มีใครเข้าใจเค้าเลย ไม่มีเลย ไม่มีจริๆ
        </div>

      {/* ข้อความ */}
      <AnimatePresence>
        {message && (
          <motion.div
            key="msg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-28 text-xl font-semibold text-pink-200 drop-shadow-lg z-30"
          >
            {message}
            
          </motion.div>
        )}
      </AnimatePresence>

      {/* วาฬ */}
      <motion.img
        src="/whale.png"
        alt="Whale cartoon"
        className="w-48 mb-2 drop-shadow-lg cursor-pointer"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        whileTap={{ scale: 0.85, rotate: -5 }}
        onClick={handleWhaleClick}
      />
      <Toaster position="top-center" richColors expand={true} />
    </div>
    
  );
}
