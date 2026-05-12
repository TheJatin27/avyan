import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
// ── Palette ──────────────────────────────────────────────────────────────────
const C = {
  red:    "#FF3B30",
  orange: "#FF9500",
  yellow: "#FFD60A",
  green:  "#30D158",
  teal:   "#5AC8FA",
  blue:   "#007AFF",
  pink:   "#FF375F",
  purple: "#BF5AF2",
  white:  "#FFFFFF",
  cream:  "#FFF9F0",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max));

// ── Confetti Piece ────────────────────────────────────────────────────────────
function ConfettiPiece({ x, delay, color, shape }) {
  return (
    <motion.div
      style={{
        position: "fixed",
        left: x + "%",
        top: -20,
        width: shape === "circle" ? 10 : 8,
        height: shape === "circle" ? 10 : 14,
        borderRadius: shape === "circle" ? "50%" : shape === "ribbon" ? 2 : 0,
        background: color,
        zIndex: 9999,
        pointerEvents: "none",
      }}
      initial={{ y: -20, rotate: 0, opacity: 1 }}
      animate={{
        y: "110vh",
        rotate: shape === "ribbon" ? [0, 360, 720] : [0, 180, 360],
        opacity: [1, 1, 0],
        x: [0, rand(-60, 60), rand(-100, 100)],
      }}
      transition={{ duration: rand(2.5, 4.5), delay, ease: "linear" }}
    />
  );
}

// ── Floating Balloon ──────────────────────────────────────────────────────────
function Balloon({ x, color, delay, size = 50, onClick, popped }) {
  const [localPopped, setLocalPopped] = useState(false);

  const handlePop = () => {
    setLocalPopped(true);
    onClick && onClick();
  };

  return (
    <AnimatePresence>
      {!localPopped && (
        <motion.div
          onClick={handlePop}
          style={{ position: "absolute", left: x + "%", cursor: "pointer", userSelect: "none" }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: [null, `-${size * 6}px`, `-${size * 5}px`, `-${size * 7}px`] }}
          transition={{ duration: rand(6, 10), delay, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
          exit={{ scale: [1, 1.5, 0], opacity: [1, 1, 0], transition: { duration: 0.3 } }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.3 }}
        >
          {/* Balloon SVG */}
          <svg width={size} height={size * 1.3} viewBox="0 0 50 65">
            <ellipse cx="25" cy="24" rx="20" ry="24" fill={color} />
            <ellipse cx="18" cy="14" rx="6" ry="8" fill="rgba(255,255,255,0.3)" />
            <path d="M25 48 Q23 52 25 56 Q27 52 25 48" stroke={color} strokeWidth="1.5" fill="none" />
            <line x1="25" y1="56" x2="25" y2="65" stroke="#888" strokeWidth="1" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Star particle ─────────────────────────────────────────────────────────────
function StarParticle({ x, y, delay }) {
  return (
    <motion.div
      style={{ position: "absolute", left: x + "%", top: y + "%", fontSize: randInt(12, 22), zIndex: 1, pointerEvents: "none" }}
      animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.3, 1, 0.3], rotate: [0, 180, 360] }}
      transition={{ duration: rand(2, 4), delay, repeat: Infinity }}
    >
      {["⭐", "✨", "🌟"][randInt(0, 3)]}
    </motion.div>
  );
}

// ── Firefly ───────────────────────────────────────────────────────────────────
function Firefly({ x, y, color }) {
  return (
    <motion.div
      style={{
        position: "absolute", left: x + "%", top: y + "%",
        width: 6, height: 6, borderRadius: "50%", background: color,
        boxShadow: `0 0 8px ${color}, 0 0 16px ${color}`,
        zIndex: 1, pointerEvents: "none",
      }}
      animate={{
        x: [0, rand(-30, 30), rand(-20, 20), 0],
        y: [0, rand(-20, 20), rand(-30, 30), 0],
        opacity: [0.2, 1, 0.4, 0.9, 0.2],
      }}
      transition={{ duration: rand(4, 8), repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ── Watermelon slice SVG ──────────────────────────────────────────────────────
function WatermelonSlice({ size = 60 }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 55">
      <path d="M5 50 Q50 0 95 50 Z" fill="#FF4757" />
      <path d="M12 50 Q50 8 88 50 Z" fill="#FF6B81" />
      <path d="M5 50 Q50 0 95 50 Q50 58 5 50Z" fill="#5DBB63" />
      <circle cx="30" cy="35" r="3" fill="#2d2d2d" />
      <circle cx="50" cy="28" r="3" fill="#2d2d2d" />
      <circle cx="70" cy="35" r="3" fill="#2d2d2d" />
      <circle cx="42" cy="40" r="2.5" fill="#2d2d2d" />
      <circle cx="62" cy="40" r="2.5" fill="#2d2d2d" />
    </svg>
  );
}

// ── Cake SVG ──────────────────────────────────────────────────────────────────
function BirthdayCake({ size = 90 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {/* plate */}
      <ellipse cx="50" cy="88" rx="40" ry="6" fill="#e0e0e0" />
      {/* bottom tier */}
      <rect x="15" y="60" width="70" height="28" rx="6" fill="#FF6B9D" />
      <rect x="15" y="60" width="70" height="8" rx="4" fill="#FF8FAB" />
      {/* middle tier */}
      <rect x="22" y="38" width="56" height="24" rx="5" fill="#FFD700" />
      <rect x="22" y="38" width="56" height="7" rx="3.5" fill="#FFE566" />
      {/* top tier */}
      <rect x="30" y="22" width="40" height="18" rx="5" fill="#5AC8FA" />
      <rect x="30" y="22" width="40" height="6" rx="3" fill="#87DCFF" />
      {/* frosting drips */}
      {[20,30,42,55,67,78].map((x,i)=>(
        <ellipse key={i} cx={x} cy="60" rx="4" ry="5" fill="white" opacity="0.8"/>
      ))}
      {/* candle */}
      <rect x="47" y="10" width="6" height="13" rx="3" fill="#FF6B9D" />
      <ellipse cx="50" cy="10" rx="3" ry="2" fill="#FFD700" />
      {/* flame */}
      <motion.ellipse
        cx="50" cy="6" rx="2.5" ry="4" fill="#FFD60A"
        animate={{ scaleX: [1, 1.3, 0.8, 1.2, 1], scaleY: [1, 0.8, 1.2, 0.9, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      {/* decorations */}
      <circle cx="25" cy="70" r="3" fill="#FFD700" />
      <circle cx="40" cy="73" r="3" fill="#5AC8FA" />
      <circle cx="60" cy="73" r="3" fill="#5AC8FA" />
      <circle cx="75" cy="70" r="3" fill="#FFD700" />
      <circle cx="35" cy="47" r="2.5" fill="#FF6B9D" />
      <circle cx="50" cy="50" r="2.5" fill="#FF6B9D" />
      <circle cx="65" cy="47" r="2.5" fill="#FF6B9D" />
      {/* "1" on cake */}
      <text x="48" y="34" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">1</text>
    </svg>
  );
}

// ── JJ Character ──────────────────────────────────────────────────────────────
function JJCharacter({ size = 100 }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 100 110">
      {/* body */}
      <rect x="30" y="55" width="40" height="35" rx="10" fill="#5AC8FA" />
      {/* diaper */}
      <rect x="28" y="75" width="44" height="20" rx="8" fill="white" />
      {/* arms */}
      <ellipse cx="20" cy="65" rx="10" ry="7" fill="#FFDAB9" transform="rotate(30 20 65)" />
      <ellipse cx="80" cy="65" rx="10" ry="7" fill="#FFDAB9" transform="rotate(-30 80 65)" />
      {/* legs */}
      <rect x="33" y="88" width="14" height="16" rx="7" fill="#FFDAB9" />
      <rect x="53" y="88" width="14" height="16" rx="7" fill="#FFDAB9" />
      {/* head */}
      <circle cx="50" cy="36" r="28" fill="#FFDAB9" />
      {/* hair */}
      <path d="M24 22 Q30 5 50 8 Q70 5 76 22" fill="#4a3728" />
      {/* eyes */}
      <circle cx="41" cy="32" r="5" fill="white" />
      <circle cx="59" cy="32" r="5" fill="white" />
      <motion.circle cx="42" cy="33" r="3" fill="#2d2d2d"
        animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }} />
      <motion.circle cx="60" cy="33" r="3" fill="#2d2d2d"
        animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }} />
      {/* smile */}
      <path d="M40 44 Q50 54 60 44" stroke="#4a3728" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* cheeks */}
      <circle cx="35" cy="42" r="5" fill="#FFB3BA" opacity="0.6" />
      <circle cx="65" cy="42" r="5" fill="#FFB3BA" opacity="0.6" />
      {/* ear */}
      <circle cx="22" cy="38" r="6" fill="#FFDAB9" />
      <circle cx="78" cy="38" r="6" fill="#FFDAB9" />
    </svg>
  );
}

// ── Rainbow arc ───────────────────────────────────────────────────────────────
function Rainbow() {
  const colors = ["#FF3B30","#FF9500","#FFD60A","#30D158","#5AC8FA","#007AFF","#BF5AF2"];
  return (
    <svg width="340" height="120" viewBox="0 0 340 120" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", opacity: 0.35 }}>
      {colors.map((c, i) => (
        <path key={i}
          d={`M ${20 + i * 8} 115 Q 170 ${5 + i * 10} ${320 - i * 8} 115`}
          stroke={c} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.9"
        />
      ))}
    </svg>
  );
}

// ── Section reveal wrapper ────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 40 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Detail Card ───────────────────────────────────────────────────────────────
function DetailCard({ icon, label, value, sub, bg, delay }) {
  return (
    <Reveal delay={delay}>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        style={{
          background: bg,
          borderRadius: 24,
          padding: "18px 20px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          marginBottom: 14,
        }}
      >
        <motion.div
          style={{ fontSize: 36, marginBottom: 6 }}
          animate={{ rotate: [-5, 5, -5], y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {icon}
        </motion.div>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
        <div style={{ fontFamily: "'Bubblegum Sans', cursive", fontSize: 22, color: "white", lineHeight: 1.2 }}>{value}</div>
        {sub && <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 4, fontWeight: 700 }}>{sub}</div>}
      </motion.div>
    </Reveal>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────
export default function App() {
  const [confetti, setConfetti] = useState([]);
  const [popCount, setPopCount] = useState(0);
  const [rsvpDone, setRsvpDone] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  // Confetti colors & shapes
  const confettiColors = [C.red, C.orange, C.yellow, C.green, C.teal, C.blue, C.pink, C.purple, C.white];
  const confettiShapes = ["square", "circle", "ribbon"];

  const launchConfetti = React.useCallback((count = 60) => {
    const pieces = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: rand(0, 100),
      delay: rand(0, 1.5),
      color: confettiColors[randInt(0, confettiColors.length)],
      shape: confettiShapes[randInt(0, confettiShapes.length)],
    }));
    setConfetti(prev => [...prev, ...pieces]);
    setTimeout(() => setConfetti(prev => prev.filter(p => !pieces.find(pp => pp.id === p.id))), 6000);
  }, []);
useEffect(() => {
  const timer = setTimeout(() => {
    launchConfetti(80);
  }, 800);

  return () => clearTimeout(timer);
}, [launchConfetti]);

  const handleRSVP = () => {
    setRsvpDone(true);
    setShowFireworks(true);
    launchConfetti(120);
    setTimeout(() => setShowFireworks(false), 4000);
  };

  // Balloons
  const balloonData = [
    { x: 4,  color: C.red,    delay: 0 },
    { x: 16, color: C.yellow, delay: 1.2 },
    { x: 30, color: C.green,  delay: 0.5 },
    { x: 46, color: C.teal,   delay: 1.8 },
    { x: 60, color: C.pink,   delay: 0.8 },
    { x: 74, color: C.purple, delay: 1.5 },
    { x: 88, color: C.orange, delay: 0.3 },
  ];

  // Stars
  const stars = Array.from({ length: 18 }, (_, i) => ({
    id: i, x: rand(2, 95), y: rand(5, 90), delay: rand(0, 3)
  }));

  // Fireflies
  const fireflies = Array.from({ length: 12 }, (_, i) => ({
    id: i, x: rand(5, 92), y: rand(10, 88),
    color: [C.yellow, C.teal, C.pink, C.green][randInt(0, 4)]
  }));

  const scrollIndicatorWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div style={{ width: "100%", maxWidth: 420, margin: "0 auto", position: "relative", fontFamily: "'Nunito', sans-serif", background: "#0a0a1a", minHeight: "100vh" }}>

      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Nunito:wght@400;600;700;800;900&display=swap');`}</style>

      {/* Scroll Progress Bar */}
      <motion.div style={{
        position: "fixed", top: 0, left: 0, height: 4,
        background: "linear-gradient(90deg, #FF375F, #FFD60A, #30D158, #5AC8FA)",
        zIndex: 10000, width: scrollIndicatorWidth,
        boxShadow: "0 0 12px #FFD60A",
      }} />

      {/* Confetti */}
      {confetti.map(p => <ConfettiPiece key={p.id} {...p} />)}

      {/* Main scrollable container */}
      <div ref={containerRef} style={{ overflowY: "auto", height: "100vh", scrollBehavior: "smooth" }}>

        {/* ── HERO SECTION ── */}
        <div style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #0a0018 0%, #150030 30%, #001a40 60%, #002a10 100%)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px 20px 60px",
        }}>

          {/* Stars background */}
          {stars.map(s => <StarParticle key={s.id} {...s} />)}

          {/* Fireflies */}
          {fireflies.map(f => <Firefly key={f.id} {...f} />)}

          {/* Rainbow */}
          <Rainbow />

          {/* Floating balloons */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            {balloonData.map((b, i) => (
              <Balloon key={i} {...b} onClick={() => {
                setPopCount(p => p + 1);
                launchConfetti(20);
              }} />
            ))}
          </div>

          {/* Moon */}
          <motion.div style={{ position: "absolute", top: 24, right: 20, fontSize: 48, zIndex: 2 }}
            animate={{ rotate: [0, 5, -5, 0], y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            🌙
          </motion.div>

          {/* "1" big badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.3 }}
            style={{
              width: 110, height: 110,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FFD60A, #FF9500)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Bubblegum Sans', cursive",
              fontSize: 64, color: "white",
              boxShadow: "0 0 0 6px rgba(255,214,10,0.3), 0 0 60px rgba(255,149,0,0.6)",
              marginBottom: 16,
              position: "relative", zIndex: 3,
            }}>
            <motion.span animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>1</motion.span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Bubblegum Sans', cursive",
              fontSize: 48,
              color: "white",
              textAlign: "center",
              lineHeight: 1.05,
              textShadow: "0 0 30px rgba(255,214,10,0.8), 0 4px 0 rgba(0,0,0,0.3)",
              zIndex: 3, position: "relative",
              margin: 0,
            }}
          >
            Avyan's<br/>
            <motion.span style={{ color: C.yellow }}
              animate={{ textShadow: ["0 0 20px #FFD60A", "0 0 50px #FF9500", "0 0 20px #FFD60A"] }}
              transition={{ duration: 2, repeat: Infinity }}>
              1st Birthday!
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring" }}
            style={{
              marginTop: 12, fontSize: 16, color: "rgba(255,255,255,0.85)",
              fontWeight: 800, letterSpacing: 2, textTransform: "uppercase",
              zIndex: 3, position: "relative",
            }}
          >
            🎉 You're Invited! 🎉
          </motion.div>

          {/* JJ Character */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginTop: 24, zIndex: 3, position: "relative" }}
          >
            <motion.div
              animate={{ y: [0, -14, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <JJCharacter size={120} />
            </motion.div>
            <motion.div
              animate={{ scaleX: [1, 0.7, 1], opacity: [0.4, 0.2, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                width: 80, height: 12, borderRadius: "50%",
                background: "rgba(0,0,0,0.3)",
                margin: "-8px auto 0",
              }}
            />
          </motion.div>

          {/* Watermelons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            style={{ display: "flex", gap: 16, marginTop: 20, zIndex: 3, position: "relative" }}
          >
            {[0, 1, 2].map(i => (
              <motion.div key={i}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}>
                <WatermelonSlice size={44} />
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            style={{ marginTop: 30, textAlign: "center", zIndex: 3, position: "relative" }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", fontWeight: 700 }}
            >
              🎈 Scroll down for the fun! 🎈
            </motion.div>
            <motion.div
              animate={{ y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
              style={{ fontSize: 22, marginTop: 4 }}
            >
              ↓
            </motion.div>
          </motion.div>

          {/* Pop counter */}
          {popCount > 0 && (
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              style={{
                position: "fixed", bottom: 20, right: 16,
                background: "linear-gradient(135deg, #FF375F, #FF9500)",
                color: "white", borderRadius: 20, padding: "8px 14px",
                fontSize: 13, fontWeight: 800, zIndex: 1000,
                boxShadow: "0 4px 20px rgba(255,57,95,0.5)",
              }}
            >
              💥 {popCount} popped!
            </motion.div>
          )}
        </div>

        {/* ── DETAILS SECTION ── */}
        <div style={{
          background: "linear-gradient(180deg, #001a40 0%, #002060 40%, #003020 100%)",
          padding: "40px 20px",
          position: "relative",
          overflow: "hidden",
        }}>

          {/* Decorative circles */}
          {[...Array(5)].map((_, i) => (
            <motion.div key={i}
              style={{
                position: "absolute",
                width: rand(60, 140), height: rand(60, 140),
                borderRadius: "50%",
                border: `2px solid rgba(255,255,255,0.05)`,
                left: rand(-30, 80) + "%", top: rand(5, 90) + "%",
                pointerEvents: "none",
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: rand(10, 20), repeat: Infinity, ease: "linear" }}
            />
          ))}

          {/* CoComelon label */}
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #FF6B9D, #FF9500)",
                  borderRadius: 50, padding: "8px 24px",
                  fontFamily: "'Bubblegum Sans', cursive",
                  fontSize: 18, color: "white",
                  boxShadow: "0 4px 20px rgba(255,107,157,0.5)",
                  letterSpacing: 1,
                }}
              >
                🍉 CoComelon Theme Party 🍉
              </motion.div>
            </div>
          </Reveal>

          {/* Cake + title */}
          <Reveal delay={0.1}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ display: "inline-block" }}
              >
                <BirthdayCake size={100} />
              </motion.div>
              <div style={{
                fontFamily: "'Bubblegum Sans', cursive", fontSize: 28,
                color: "white", marginTop: 8,
                textShadow: "0 0 20px rgba(255,214,10,0.6)",
              }}>
                Party Details 🎊
              </div>
            </div>
          </Reveal>

          {/* Two column date/time */}
          <Reveal delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <motion.div whileHover={{ y: -4, scale: 1.03 }}
                style={{
                  background: "linear-gradient(135deg, #FF375F, #FF6B9D)",
                  borderRadius: 22, padding: "18px 14px",
                  boxShadow: "0 8px 30px rgba(255,55,95,0.4)",
                }}>
                <motion.div style={{ fontSize: 32, marginBottom: 6 }}
                  animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }}>
                  📅
                </motion.div>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: "rgba(255,255,255,0.75)", textTransform: "uppercase" }}>Date</div>
                <div style={{ fontFamily: "'Bubblegum Sans', cursive", fontSize: 20, color: "white", lineHeight: 1.2, marginTop: 3 }}>25th May<br/>2025</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", marginTop: 4, fontWeight: 700 }}>Sunday 🌟</div>
              </motion.div>

              <motion.div whileHover={{ y: -4, scale: 1.03 }}
                style={{
                  background: "linear-gradient(135deg, #007AFF, #5AC8FA)",
                  borderRadius: 22, padding: "18px 14px",
                  boxShadow: "0 8px 30px rgba(0,122,255,0.4)",
                }}>
                <motion.div style={{ fontSize: 32, marginBottom: 6 }}
                  animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
                  ⏰
                </motion.div>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: "rgba(255,255,255,0.75)", textTransform: "uppercase" }}>Time</div>
                <div style={{ fontFamily: "'Bubblegum Sans', cursive", fontSize: 24, color: "white", lineHeight: 1.2, marginTop: 3 }}>6:00 PM</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", marginTop: 4, fontWeight: 700 }}>Evening 🌅</div>
              </motion.div>
            </div>
          </Reveal>

          {/* Venue */}
          <DetailCard icon="🏨" label="Venue" value="Hotel Renuka Inn"
            sub="📍 Kachehri Chowk, Deoria"
            bg="linear-gradient(135deg, #30D158, #007A33)"
            delay={0.2} />

{/* Location Map */}
<Reveal delay={0.22}>
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    style={{
      background: "linear-gradient(135deg, #FF9500, #FF375F)",
      borderRadius: 24,
      padding: "18px",
      marginBottom: 14,
      boxShadow: "0 8px 30px rgba(255,149,0,0.35)",
    }}
  >
    <div
      style={{
        fontFamily: "'Bubblegum Sans', cursive",
        fontSize: 22,
        color: "white",
        marginBottom: 14,
        textAlign: "center",
      }}
    >
      📍 Party Location
    </div>

    <div
      style={{
        borderRadius: 18,
        overflow: "hidden",
        border: "3px solid rgba(255,255,255,0.2)",
      }}
    >
      <iframe
        src="https://www.google.com/maps?q=place_id:ChIJT8vTT9j7DDkR7O0m0kL5LwA&output=embed"
        width="100%"
        height="250"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Party Location"
      ></iframe>
    </div>

    <motion.a
      href="https://www.google.com/maps?cid=3399306884815841644&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: "block",
        textAlign: "center",
        marginTop: 14,
        background: "white",
        color: "#FF375F",
        padding: "12px",
        borderRadius: 14,
        textDecoration: "none",
        fontWeight: 800,
        fontSize: 15,
      }}
    >
      🗺️ Open in Google Maps
    </motion.a>
  </motion.div>
</Reveal>




          {/* Dress Code */}
          <DetailCard icon="👗" label="Dress Code" value="Western Wear 🌈"
            sub="Look your colorful best! ✨"
            bg="linear-gradient(135deg, #BF5AF2, #7B1FA2)"
            delay={0.25} />

          {/* Characters parade */}
          <Reveal delay={0.3}>
            <div style={{
              background: "rgba(255,255,255,0.06)",
              borderRadius: 24, padding: "18px",
              marginBottom: 14,
              border: "1.5px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
            }}>
              <div style={{ textAlign: "center", fontFamily: "'Bubblegum Sans', cursive", fontSize: 18, color: C.yellow, marginBottom: 12 }}>
                🎵 The Gang's All Here! 🎵
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {[
                  { emoji: "👶", name: "JJ", color: C.teal },
                  { emoji: "👧", name: "YoYo", color: C.pink },
                  { emoji: "👦", name: "TomTom", color: C.orange },
                  { emoji: "🐶", name: "Bingo", color: C.yellow },
                  { emoji: "🐱", name: "CeCe", color: C.purple },
                ].map((ch, i) => (
                  <motion.div key={i}
                    animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
                    transition={{ duration: 1.8 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
                    style={{ textAlign: "center" }}
                  >
                    <div style={{ fontSize: 34 }}>{ch.emoji}</div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: ch.color, marginTop: 2 }}>{ch.name}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Notes */}
          <Reveal delay={0.35}>
            <div style={{
              background: "rgba(255,214,10,0.08)",
              border: "2px dashed rgba(255,214,10,0.4)",
              borderRadius: 24, padding: "18px 20px",
              marginBottom: 14,
            }}>
              <div style={{ fontFamily: "'Bubblegum Sans', cursive", fontSize: 20, color: C.yellow, marginBottom: 12 }}>
                🎀 Party Notes 🎀
              </div>
              {[
                ["🎂", "Cake cutting at 6:30 PM"],
                ["🎵", "CoComelon songs & fun"],
                ["🎁", "Gifts are welcome!"],
                ["📸", "Photo booth & memories"],
                ["🍽️", "Dinner will be served"],
                ["👶", "Kids are most welcome!"],
              ].map(([icon, text], i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8, color: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: 600 }}
                >
                  <span style={{ fontSize: 18 }}>{icon}</span> {text}
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── RSVP SECTION ── */}
        <div style={{
          background: "linear-gradient(180deg, #001a00 0%, #0a0018 100%)",
          padding: "40px 20px 60px",
          position: "relative",
          overflow: "hidden",
        }}>

          {/* Twinkling bg */}
          {[...Array(20)].map((_, i) => (
            <motion.div key={i}
              style={{
                position: "absolute",
                width: rand(2, 5), height: rand(2, 5),
                borderRadius: "50%", background: "white",
                left: rand(0, 100) + "%", top: rand(0, 100) + "%",
                pointerEvents: "none",
              }}
              animate={{ opacity: [0.1, 0.9, 0.1] }}
              transition={{ duration: rand(1.5, 4), repeat: Infinity, delay: rand(0, 3) }}
            />
          ))}

          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontFamily: "'Bubblegum Sans', cursive", fontSize: 30, color: "white", textShadow: "0 0 30px rgba(255,107,157,0.8)" }}>
                With Love From 💕
              </div>
            </div>
          </Reveal>

          {/* Family card */}
          <Reveal delay={0.1}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{
                background: "linear-gradient(135deg, rgba(255,55,95,0.2), rgba(191,90,242,0.2))",
                border: "2px solid rgba(255,255,255,0.15)",
                borderRadius: 28, padding: "28px 22px",
                textAlign: "center", marginBottom: 20,
                backdropFilter: "blur(12px)",
                boxShadow: "0 16px 50px rgba(255,55,95,0.2)",
              }}
            >
              <motion.div style={{ fontSize: 50, marginBottom: 12 }}
                animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                👨‍👩‍👦
              </motion.div>
              <div style={{ fontFamily: "'Bubblegum Sans', cursive", fontSize: 22, color: C.yellow, marginBottom: 16, textShadow: "0 0 20px rgba(255,214,10,0.5)" }}>
                The Mishra Family
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
  { icon: "👨‍👩‍👦", role: "Parents", name: "Abhinav & Juhi" },
  { icon: "👴👵", role: "Grandparents", name: "Rakesh Mishra & Manju Mishra" },
  { icon: "👶", role: "Birthday Boy", name: "Avyan" },
].map((p, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      background: "rgba(255,255,255,0.07)",
                      borderRadius: 16, padding: "10px 14px",
                    }}
                  >
                    <div style={{ fontSize: 28 }}>{p.icon}</div>
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{p.role}</div>
                      <div style={{ fontSize: 17, color: "white", fontWeight: 800 }}>{p.name}</div>
                    </div>
                    {i < 2 && <div style={{ fontSize: 18 }}>❤️</div>}
                    {i === 2 && (
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{ fontSize: 20 }}
                      >🎂</motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Reveal>

          {/* RSVP Button */}
          <Reveal delay={0.2}>
            <motion.button
              onClick={handleRSVP}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              animate={!rsvpDone ? {
                boxShadow: [
                  "0 0 20px rgba(255,55,95,0.6)",
                  "0 0 40px rgba(255,149,0,0.8)",
                  "0 0 20px rgba(255,55,95,0.6)",
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: "100%",
                background: rsvpDone
                  ? "linear-gradient(135deg, #30D158, #007A33)"
                  : "linear-gradient(135deg, #FF375F, #FF9500)",
                color: "white",
                fontFamily: "'Bubblegum Sans', cursive",
                fontSize: 22,
                border: "none",
                borderRadius: 50,
                padding: "18px",
                cursor: "pointer",
                boxShadow: "0 8px 30px rgba(255,55,95,0.5)",
                marginBottom: 16,
                letterSpacing: 1,
              }}
            >
              {rsvpDone ? "🥳 See You There! 🥳" : "🎉 We'll Be There! 🎉"}
            </motion.button>
          </Reveal>

          {/* Fireworks on RSVP */}
          <AnimatePresence>
            {showFireworks && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "fixed", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 80, zIndex: 9998, pointerEvents: "none",
                  flexDirection: "column", gap: 20,
                }}
              >
                {["🎆", "🎇", "🎊", "🎉"].map((fw, i) => (
                  <motion.div key={i}
                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                    animate={{ scale: [0, 1.5, 1], rotate: 0, opacity: [0, 1, 1] }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ delay: i * 0.2, duration: 0.5 }}
                  >
                    {fw}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <Reveal delay={0.3}>
            <div style={{ textAlign: "center", marginTop: 10 }}>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: 36, marginBottom: 10 }}
              >
                🍉🎈🎂🌟✨
              </motion.div>
              <div style={{ fontFamily: "'Bubblegum Sans', cursive", fontSize: 18, color: "rgba(255,255,255,0.7)" }}>
                With lots of love & joy!
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 6, fontWeight: 600 }}>
                Tap balloons to pop them! 🎈
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
