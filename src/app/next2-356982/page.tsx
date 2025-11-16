"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Next2() {
  const router = useRouter();

  return (
    <div
      className="relative min-h-screen w-screen flex flex-col items-center justify-center overflow-hidden text-center font-sans"
      style={{
        backgroundImage: "url('/bg1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#000",
      }}
    >
      <button
        onClick={() => router.push("/home")}
        className="absolute top-6 left-6 bg-white/30 hover:bg-white/60 text-sky-900 font-bold text-lg rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-md shadow-lg z-30"
      >
        ‹
      </button>

      {/* 🐋 วาฬ */}
      <motion.img
        src="/whale.png"
        alt="Whale cartoon"
        className="w-44 mb-6 drop-shadow-lg"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative w-[90vw] max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/70 z-20"
      >
        <iframe
          src="https://www.youtube.com/embed/owhM2RLj0lA?autoplay=1&mute=0"
          title="Whale Video"
          width="100%"
          height="100%"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </motion.div>

      {/* ✨ ข้อความล่าง */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="text-white/90 mt-8 text-lg drop-shadow-lg z-20"
      >
        เทอคงได้ดูมาก่อนแล้ว ขอบคุณที่ดูจนจบนะ
        <br />
        ขอให้เทอมีความสุขมากๆๆๆหลังจากนี้และต่อๆไปเลย <br />
        เค้าไม่รู้ว่าจะต้องก้าวผ่านช่วงเวลาที่ไม่มีเทอไปได้ยังไง <br />
        ขอบคุณที่ครั้งนึงเคยรักเคยผูกพันกันมากขนาดนี้นะ <br />
        รักเทอนะ นภสร
      </motion.p>
    </div>
  );
}
