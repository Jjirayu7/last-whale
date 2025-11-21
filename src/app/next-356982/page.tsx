"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo, useEffect, useState } from "react";

export default function NextPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  // 🫧 รูปฟองสบู่ทั้งหมด
  const bubbleImages = [
    "/bubble1.jpg",
    "/bubble2.jpg",
    "/bubble3.jpg",
    "/bubble4.jpg",
    "/bubble5.jpg",
    "/bubble6.jpg",
    "/bubble7.jpg",
    "/bubble8.jpg",
    "/bubble9.jpg",
    "/bubble10.jpg",
    "/bubble11.jpg",
  ];

  // 🌀 สุ่มรูปไม่ให้ซ้ำ
  function shuffleArray(array: string[]) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // 🔹 สร้างฟองสบู่แบบกระจาย
  const bubbles = useMemo(() => {
    if (!isClient) return [];
    const arr = [];
    const shuffledImages = shuffleArray(bubbleImages);
    const totalBubbles = 20;

    for (let i = 0; i < totalBubbles; i++) {
      const img = shuffledImages[i % shuffledImages.length];
      arr.push({
        id: i,
        img,
        left: Math.random() * 100 + "%",
        size: 40 + Math.random() * 60,
        startY: Math.random() * window.innerHeight * 0.7 - 200,
        delay: Math.random() * 10,
        duration: 18 + Math.random() * 12,
        opacity: 0.4 + Math.random() * 0.4,
        horizontalDrift: Math.random() * 60 - 30,
      });
    }
    return arr;
  }, [isClient]);

  // เปลี่ยนหน้า
  const goPrev = () => router.push("/home");
  const goNext = () => router.push("/next2-356982");

  if (!isClient) return null;

  return (
    <div
      className="relative min-h-screen w-screen flex flex-col items-center justify-start bg-no-repeat bg-center overflow-hidden text-center font-sans"
      style={{
        backgroundImage: "url('/bg1.png')",
        backgroundColor: "#ffffcc",
      }}
    >
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute z-10 cursor-grab"
          style={{
            left: b.left,
            bottom: b.startY,
            width: `${b.size}px`,
            height: `${b.size}px`,
            opacity: b.opacity,
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow:
              "0 0 15px rgba(255,255,255,0.6), inset 0 0 10px rgba(255,255,255,0.3)",
            backdropFilter: "blur(3px)",
          }}
          animate={{
            y: [0, -window.innerHeight * 1.2],
            x: [0, b.horizontalDrift, -b.horizontalDrift / 2],
            opacity: [b.opacity, b.opacity * 0.7, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: b.duration,
            delay: b.delay,
            ease: "easeInOut",
          }}
          // ✅ เพิ่มให้ drag ได้
          drag
          dragElastic={0.5}
          dragMomentum={false}
          whileTap={{ scale: 1.1, rotate: 3 }}
        >
          <img
            src={b.img}
            alt="bubble"
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      ))}

      {/* 🔹 ปุ่มเปลี่ยนหน้า */}
      <div className="absolute top-1/2 left-0 right-0 flex justify-between px-6 z-20">
        <button
          onClick={goPrev}
          className="bg-white/40 hover:bg-white/70 text-sky-900 font-bold text-xl rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-md shadow-md"
        >
          ‹
        </button>
        <button
          onClick={goNext}
          className="bg-white/40 hover:bg-white/70 text-sky-900 font-bold text-xl rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-md shadow-md"
        >
          ›
        </button>
      </div>

      {/* ข้อความ */}
      <p className="text-white/90 text-lg font-medium relative z-10 top-70">
        ขอบคุณสำหรับทุกๆอย่างนะ <br />
        นี่คงเป็นของขวัญชิ้นสุดท้ายที่เค้าจะมอบให้เทอ<br />
        รักเทอจัง❤️ แม้ในวันนี้เทอจะไม่รักเค้าแล้วก็ตาม<br />
        อยากให้เทออยู่ข้างๆในวันนี้จัง 21-11-68<br />
      </p>
    </div>
  );
}
