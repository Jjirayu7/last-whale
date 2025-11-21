"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: any;
  }
}

export default function MusicPage() {
  const router = useRouter();
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLDivElement | null>(null);

  const songs = [
  { id: 1, name: "เพลงนี้ให้โบ้", youtube: "BnkWh-s3aZY", playlist: "RDBnkWh-s3aZY" },
  { id: 2, name: "เพลงนี้ให้เอิน", youtube: "WeszpwtcSe0", playlist: "RDWeszpwtcSe0" },
  { id: 3, name: "เพลงนี้ให้ลัคกี้", youtube: "Do0Gokj8LLU", playlist: "RDDo0Gokj8LLU" },
  { id: 4, name: "เพลงนี้ให้เอิลล", youtube: "WtcKJtwMD2E", playlist: "RDWtcKJtwMD2E" },
  { id: 5, name: "เพลงนี้ให้อ้วน", youtube: "Gbtg204DP88", playlist: "RDGbtg204DP88" },
  { id: 6, name: "เพลงนี้ให้นะ", youtube: "5JPGMJjioqs", playlist: "RD5JPGMJjioqs" },
  { id: 7, name: "ให้โบ้ฟังตอนเศร้า", youtube: "jhhPA9GHDg4" },
  { id: 8, name: "ให้โบ้ฟังตอนมีความสุข", youtube: "D-aCb9xsqTE" },
  { id: 9, name: "ให้โบ้ฟังตอนทมีความสุขมาก", youtube: "q_Eq9V0F9g0" },
  { id:10, name: "ให้โบ้ฟังตอนมีความสุขมากๆๆ", youtube: "Y2E71oe0aSM" },
  { id: 11, name: "ให้โบ้ฟังหายเศร้า", youtube: "6Q5xqNkCk7w", playlist: "RD6Q5xqNkCk7w" },
  { id: 12, name: "ให้โบ้ฟังตอนทอ่านหนังสือ", youtube: "ks7p6DA0dKk", playlist: "PLaTZbioq5bqCJY_-eLK7jWWdD7Ds3Vg99" },
  { id: 13, name: "ให้ลัคกี้อีกเพลง", youtube: "iO8ouMrxFM8", playlist: "RDiO8ouMrxFM8" },
];

const playNextSong = () => {
  const currentIndex = songs.findIndex(s => s.id === currentSong.id);
  const nextIndex = (currentIndex + 1) % songs.length; // วนกลับเพลงแรก
  const nextSong = songs[nextIndex];

  setCurrentSong(nextSong);
  playerRef.current.loadVideoById(nextSong.youtube);
  playerRef.current.setVolume(volume);
  playerRef.current.playVideo();
  setIsPlaying(true);
};



  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [volume, setVolume] = useState(50);
  const [isLoop, setIsLoop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("yt-audio-player", {
        height: "1",
        width: "1",
        videoId: currentSong.youtube,
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 0,
        },
        events: {
          onReady: (e: any) => {
            e.target.setVolume(volume);
            e.target.playVideo();
          },
          onStateChange: (e: any) => {
          if (e.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
          }

          if (e.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
          }

          // 🔥 ถ้ามี loop ให้เล่นเพลงเดิม
          if (e.data === window.YT.PlayerState.ENDED && isLoop) {
            playerRef.current.playVideo();
            return;
          }

          // 🎵 ถ้าเพลงจบและไม่ loop → เล่นเพลงถัดไป
          if (e.data === window.YT.PlayerState.ENDED && !isLoop) {
            playNextSong();
          }
        }
        },
      });
    };
  }, []);

    const changeSong = (s: any) => {
  setCurrentSong(s);

  if (playerRef.current) {
    playerRef.current.loadVideoById(s.youtube);
    playerRef.current.setVolume(volume);
    playerRef.current.playVideo();

    // รอ onStateChange ส่งสถานะก่อน
    setIsPlaying(false);
  }
};



  // ▶ Play
  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  // ⏸ Pause
  const handlePause = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    }
  };

  const toggleLoop = () => {
    setIsLoop((prev) => !prev);
  };

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    if (playerRef.current) {
      playerRef.current.setVolume(v);
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center text-center font-sans"
      style={{
        backgroundImage: "url('/bg1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <button
        onClick={() => router.push("/home")}
        className="absolute top-5 left-6 bg-white/30 hover:bg-white/60 text-sky-900 font-bold text-3xl rounded-2xl w-10 h-10 flex items-center justify-center backdrop-blur-md shadow-lg"
      >
        ‹
      </button>
      {/* 🪼 Jellyfish Red Floating */}
        <motion.img
        src="/jellyfish-red.png"
        alt="jellyfish red"
        className="absolute top-4 right-6 w-32 opacity-90 drop-shadow-lg pointer-events-none"
        style={{ zIndex: 1000 }}
        animate={{
            y: [0, -20, 0],
            rotate: [0, 3, -3, 0],
        }}
        transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
        }}
        />

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-blue-300 text-3xl font-bold drop-shadow mb-6"
        style={{ zIndex: 1000 }}
      >
        เพลงของเรา 🎵
      </motion.h2>
      <div
        className="
          bg-white/20 backdrop-blur-xl p-6 rounded-xl border border-white/40 shadow-lg text-white mb-6
          max-h-120 overflow-y-auto
        "
         style={{ zIndex: 1000 }}
      >
        <div className="flex flex-col space-y-2 w-64">

          {songs.map((s) => (
            <button
              key={s.id}
              onClick={() => changeSong(s)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                currentSong.id === s.id
                  ? "bg-blue-50 text-blue-500 shadow-md"
                  : "bg-white/30 hover:bg-white/50 text-blue-900"
              }`}
            >
              {s.name}
            </button>
          ))}
          <p>เดี๋ยวมาแอดให้อีกนะทำงานก่อนคับ</p>
        </div>
      </div>


      {/* 🎧 Controls */}
      <div 
      className="flex space-x-4 bg-white/30 backdrop-blur-xl p-4 rounded-xl border border-white/40 shadow-lg text-white"
      style={{ zIndex: 1000 }}
      >

        {/* ▶⏸ Toggle Play/Pause */}
        <button
        onClick={() => {
            if (isPlaying) {
            handlePause();
            } else {
            handlePlay();
            }
        }}
        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            isPlaying
            ? "hover:bg-gray-100"
            : "hover:bg-gray-500"
        }`}
        >
        {isPlaying ? "⏸" : "▶"}
        </button>


        <button
          onClick={toggleLoop}
          className={`px-4 py-2 rounded-lg font-semibold ${
            isLoop ? "bg-blue-300/80" : "bg-white/0"
          }`}
        >
          Loop
        </button>
      </div>

      {/* Volume */}
      <div className="mt-6 text-white flex items-center space-x-3"
      style={{ zIndex: 1000 }}
      >
        <span>-</span>
        <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => handleVolumeChange(Number(e.target.value))}
        className="w-40 accent-white custom-range"
        />

        <span>+</span>
      </div>

      {/* 🎧 Hidden YouTube Player */}
      <div
        id="yt-audio-player"
        ref={iframeRef}
        className="opacity-0 w-[1px] h-[1px] absolute"
      ></div>
      {/* Floating Image #1 */}
        <motion.img
        src="/bg-x.jpg"
        alt="floating-1"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-24 opacity-40 z-0 pointer-events-none"
        animate={{
            y: [0, -25, 0],
            rotate: [0, 3, -3, 0],
            opacity: [3, 5, 3],
        }}
        transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
        }}
        />

        {/* Floating Image #2 */}
        <motion.img
        src="/bg-y.jpg"
        alt="floating-2"
        className="absolute top-20 left-10 w-20 opacity-30 z-0 pointer-events-none"
        animate={{
            y: [0, -15, 0],
            rotate: [0, -4, 4, 0],
            opacity: [2, 4, 2],
        }}
        transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
        }}
        />

        {/* Floating Image #3 */}
        <motion.img
        src="/bg-z.jpg"
        alt="floating-3"
        className="absolute bottom-24 right-8 w-28 opacity-45 z-0 pointer-events-none"
        animate={{
            y: [0, -30, 0],
            rotate: [0, 5, -5, 0],
            opacity: [4, 6, 4],
        }}
        transition={{
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut",
        }}
        />
        <motion.img
        src="/bg-a.jpg"
        alt="floating-3"
        className="absolute bottom-40 left-8 w-28 opacity-45 z-0 pointer-events-none"
        animate={{
            y: [0, -30, 0],
            rotate: [0, -3, 7, 0],
            opacity: [4, 6, 4],
        }}
        transition={{
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut",
        }}
        />
        <motion.img
        src="/bg-s.jpg"
        alt="floating-3"
        className="absolute top-40 right-2 w-28 opacity-45 z-0 pointer-events-none"
        animate={{
            y: [0, -30, 0],
            rotate: [0, -3, 7, 0],
            opacity: [4, 6, 4],
        }}
        transition={{
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut",
        }}
        />
        <motion.img
        src="/bg-d.jpg"
        alt="floating-3"
        className="absolute bottom-60 right-2 w-28 opacity-45 z-0 pointer-events-none"
        animate={{
            y: [0, -30, 0],
            rotate: [0, -3, 7, 0],
            opacity: [4, 6, 4],
        }}
        transition={{
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut",
        }}
        />
    </div>
  );
}
