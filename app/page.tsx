"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!mounted) return null;

  const glowColor =
    mouse.x < window.innerWidth / 2
      ? "rgba(0,140,255,0.35)"
      : "rgba(255,0,180,0.35)";

  const rotateY = ((mouse.x / window.innerWidth) - 0.5) * 12;
  const rotateX = -((mouse.y / window.innerHeight) - 0.5) * 12;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816]">

      {/* Cursor Glow */}
      <div
        className="pointer-events-none fixed z-0 h-[600px] w-[600px] rounded-full blur-[140px] transition-all duration-200"
        style={{
          left: mouse.x - 300,
          top: mouse.y - 300,
          background: glowColor,
        }}
      />

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,140,255,0.20),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(255,0,180,0.20),transparent_30%)]" />

      {/* Floating Blob Left */}
      <motion.div
        animate={{
          x: [0, 50, -20, 0],
          y: [0, -20, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-10 top-10 h-96 w-96 rounded-full bg-blue-500/20 blur-[140px]"
      />

      {/* Floating Blob Right */}
      <motion.div
        animate={{
          x: [0, -50, 20, 0],
          y: [0, 20, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-10 bottom-10 h-96 w-96 rounded-full bg-pink-500/20 blur-[140px]"
      />

      {/* Card */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
        }}
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 40,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="relative z-10 w-[950px] max-w-[92vw] rounded-[36px] border border-white/10 bg-white/5 p-12 backdrop-blur-xl shadow-[0_0_120px_rgba(168,85,247,0.15)]"
      >
        {/* Logo */}
        <motion.div
          className="flex justify-center"
          animate={{
            y: [0, -12, 0],
            rotate: [0, 2, 0, -2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        >
          <img
            src="/logo.png"
            alt="Gandi Politics"
            className="w-40 drop-shadow-[0_0_80px_rgba(255,140,0,0.9)]"
          />
        </motion.div>

        {/* Title */}
        <h1 className="mt-5 text-center text-7xl font-black text-white">
          GANDI POLITICS
        </h1>

        <p className="mt-3 text-center text-zinc-400 text-lg">
          Debate Hard. Cry Later.
        </p>

        {/* Quote */}
        <div className="mt-10 text-center">
          <h2 className="text-5xl font-bold text-white">
            Verify first.
          </h2>

          <h2 className="mt-3 bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-5xl font-bold text-transparent">
            Start the propaganda later.
          </h2>
        </div>

        {/* Button */}
        <div className="mt-12 flex justify-center">
          <motion.button
            whileHover={{
              scale: 1.08,
              boxShadow: "0 0 80px rgba(255,0,180,0.7)",
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="rounded-2xl bg-gradient-to-r from-blue-500 to-pink-500 px-12 py-5 text-xl font-bold text-white"
          >
            🎮 VERIFY WITH DISCORD
          </motion.button>
        </div>

        {/* Features */}
        <div className="mt-10 flex flex-wrap justify-center gap-8 text-zinc-300">
          <span>⚡ Instant Access</span>
          <span>🛡️ Secure Verification</span>
          <span>🚀 Premium Community</span>
        </div>
      </motion.div>
    </main>
  );
}