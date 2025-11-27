"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function PinPage() {
  const router = useRouter();
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [wrong, setWrong] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const PASSWORD = process.env.NEXT_PUBLIC_ACCESS_PASSWORD || "356982";

  const handlePinChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 5) inputsRef.current[index + 1]?.focus();

    checkPassword(newPin);
  };

  const checkPassword = (newPin: string[]) => {
    if (newPin.every((v) => v !== "")) {
      const entered = newPin.join("");
      if (entered === PASSWORD) {
        localStorage.setItem("isAuthorized", "true");
        router.push("/home");
      } else {
        setWrong(true);
        setPin(["", "", "", "", "", ""]);
        inputsRef.current[0]?.focus();
      }
    }
  };

  const handleKeyPress = (key: string) => {
    const currentIndex = pin.findIndex((v) => v === "");
    let newPin = [...pin];

    if (key === "backspace" || key === "⌫") {
      const lastFilled = newPin.slice().reverse().findIndex((v) => v !== "");
      if (lastFilled !== -1) {
        const removeIndex = 5 - lastFilled;
        newPin[removeIndex] = "";
        setPin(newPin);
        inputsRef.current[removeIndex]?.focus();
      }
      return;
    }

    if (!/^[0-9]$/.test(key) || currentIndex === -1) return;

    newPin[currentIndex] = key;
    setPin(newPin);

    if (currentIndex < 5) inputsRef.current[currentIndex + 1]?.focus();
    checkPassword(newPin);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 via-sky-900 to-blue-800 relative overflow-hidden">
      {/* 🌊 พื้นหลัง */}
      <div className="absolute inset-0 bg-[url('/bg1.png')] bg-cover bg-center opacity-40 blur-md" />

      {/* 🔐 กล่องใส่รหัส */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/15 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl p-10 flex flex-col items-center max-w-90"
      >
        <h2 className="text-3xl font-extrabold text-white mb-6 drop-shadow-lg">
          🔐
        </h2>

        {/* ช่องกรอก PIN */}
<div className="flex space-x-3 mb-6">
  {pin.map((d, i) => (
    <motion.div
      key={i}
      className={`w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold shadow-md ${
        wrong ? "border-2 border-red-400" : "border border-white/30"
      }`}
      whileHover={{ scale: 1.05 }}
    >
      {d ? "•" : ""}
    </motion.div>
  ))}
</div>


        {/* แสดงข้อความเมื่อรหัสผิด */}
        <AnimatePresence>
          {wrong && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-300 mt-2 font-medium"
            >
              ไม่ถูกก 😢
            </motion.p>
          )}
        </AnimatePresence>

        {/* 🔢 แป้นตัวเลข */}
<div className="grid grid-cols-3 gap-3 mt-8">
  {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, "⌫"].map((key, idx) => (
    <motion.button
      key={idx}
      onClick={() => handleKeyPress(String(key).toLowerCase())}
      whileTap={{ scale: 0.9 }}
      className={`w-14 h-14 flex items-center justify-center rounded-full text-2xl font-bold shadow-lg transition-all
        ${
          key === "⌫"
            ? "bg-pink-300 text-white hover:bg-red-400"
            : "bg-white text-blue-400 hover:bg-white/50"
        }`}
    >
      {key}
    </motion.button>
  ))}
</div>

      </motion.div>
    </div>
  );
}
