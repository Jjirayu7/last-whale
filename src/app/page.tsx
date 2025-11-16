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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-sky-900 to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/bg1.png')] bg-cover bg-center opacity-40 blur-md" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/15 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl p-10 flex flex-col items-center max-w-sm w-full"
      >
        <h2 className="text-3xl font-extrabold text-white mb-6 drop-shadow-lg">
          🔐 ใส่ PIN 6 หลัก
        </h2>
        <div className="flex space-x-3 mb-6">
          {pin.map((d, i) => (
            <motion.input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              type="password"
              maxLength={1}
              value={d}
              onChange={(e) => handlePinChange(e.target.value, i)}
              className="w-11 h-11 text-center text-2xl rounded-md bg-white/80 text-blue-900 font-bold focus:outline-none focus:ring-4 focus:ring-sky-400 shadow-md"
              whileFocus={{ scale: 1.1 }}
            />
          ))}
        </div>
        <AnimatePresence>
          {wrong && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-300 mt-2 font-medium"
            >
              PIN ไม่ถูกต้อง 😢
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
