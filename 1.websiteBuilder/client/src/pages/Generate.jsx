import {
  ArrowLeft,
  Sparkles,
  Rocket,
  WandSparkles,
  Globe,
  Layers3,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import axios from "axios";
import { serverUrl } from "../App";

const PHASES = [
  "Analyzing your idea...",
  "Designing premium layouts...",
  "Generating responsive sections...",
  "Adding animations & interactions...",
  "Optimizing final experience...",
];

function Generate() {
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [error, setError] = useState("");

  const suggestions = [
    "Modern SaaS Landing Page",
    "AI Startup Website",
    "Portfolio with Animations",
    "Luxury E-commerce Store",
    "Fitness App Landing Page",
    "Creative Agency Website",
  ];

  const handleGenerateWebsite = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");

    try {
      const result = await axios.post(
        `${serverUrl}/api/website/generate`,
        { prompt },
        { withCredentials: true },
      );

      setProgress(100);

      setTimeout(() => {
        navigate(`/editor/${result.data.websiteId}`);
      }, 800);
    } catch (error) {
      setLoading(false);

      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (!loading) {
      setPhaseIndex(0);
      setProgress(0);
      return;
    }

    let value = 0;

    const interval = setInterval(() => {
      const increment =
        value < 20
          ? Math.random() * 2
          : value < 60
            ? Math.random() * 1.3
            : Math.random() * 0.7;

      value += increment;

      if (value >= 93) value = 93;

      const phase = Math.min(
        Math.floor((value / 100) * PHASES.length),
        PHASES.length - 1,
      );

      setProgress(Math.floor(value));
      setPhaseIndex(phase);
    }, 1200);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] rounded-full bg-purple-600/20 blur-[140px]"
        />

        <motion.div
          animate={{
            x: [0, -70, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-140px] right-[-120px] w-[420px] h-[420px] rounded-full bg-blue-600/20 blur-[140px]"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_45%)]" />
      </div>

      {/* Navbar */}
      <div className="relative z-20 border-b border-white/10 bg-black/30 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/")}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
            >
              <ArrowLeft size={18} />
            </motion.button>

            <div>
              <h1 className="text-lg font-semibold">
                GenWeb
                <span className="text-zinc-400">.ai</span>
              </h1>

              <p className="text-xs text-zinc-500">AI Website Generator</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">
            <Sparkles size={14} className="text-purple-400" />
            Powered by Advanced AI
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <WandSparkles size={14} className="text-purple-400" />

            <span className="text-xs text-zinc-300">
              Build Stunning Websites with AI
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
            Turn your ideas into
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              beautiful websites
            </span>
          </h1>

          <p className="mt-6 text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Describe your dream website and let AI generate a fully responsive,
            animated and modern design in minutes.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          {[
            {
              icon: Globe,
              title: "Responsive Design",
              desc: "Optimized for desktop, tablet and mobile devices.",
            },
            {
              icon: Layers3,
              title: "Modern UI",
              desc: "Beautiful layouts with premium styling and effects.",
            },
            {
              icon: Rocket,
              title: "Fast Generation",
              desc: "Generate high quality websites using AI instantly.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-5">
                <item.icon size={22} />
              </div>

              <h2 className="text-lg font-semibold mb-2">{item.title}</h2>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Prompt Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-5 sm:p-8"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <Sparkles size={20} />
              </div>

              <div>
                <h2 className="text-xl font-semibold">Describe your website</h2>

                <p className="text-sm text-zinc-400">
                  Be specific for better AI generated results.
                </p>
              </div>
            </div>

            <textarea
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              placeholder="Create a modern AI SaaS landing page with dark theme, glassmorphism cards, pricing section, testimonials, smooth animations and fully responsive design..."
              className="w-full h-64 rounded-3xl border border-white/10 bg-black/40 p-6 text-sm sm:text-base leading-relaxed resize-none outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition"
            />

            {/* Suggestions */}
            <div className="flex flex-wrap gap-3 mt-5">
              {suggestions.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(item)}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 hover:bg-white/10 transition"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Error */}
            {error && <p className="mt-5 text-sm text-red-400">{error}</p>}

            {/* Generate Button */}
            <div className="flex justify-center mt-10">
              <motion.button
                whileHover={{
                  scale: loading ? 1 : 1.04,
                }}
                whileTap={{
                  scale: loading ? 1 : 0.96,
                }}
                disabled={!prompt.trim() || loading}
                onClick={handleGenerateWebsite}
                className={`relative overflow-hidden flex items-center gap-3 px-8 sm:px-12 py-4 rounded-2xl font-semibold text-base sm:text-lg transition-all
                ${
                  prompt.trim() && !loading
                    ? "bg-white text-black shadow-2xl"
                    : "bg-white/10 text-zinc-500 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                    />
                    Generating...
                  </>
                ) : (
                  <>
                    <Rocket size={18} />
                    Generate Website
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Progress */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto mt-12 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">
                    AI is generating your website
                  </h3>

                  <p className="text-sm text-zinc-400 mt-1">
                    {PHASES[phaseIndex]}
                  </p>
                </div>

                <span className="text-lg font-bold">{progress}%</span>
              </div>

              {/* Progress Bar */}
              <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    ease: "easeOut",
                    duration: 0.8,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
                />
              </div>

              {/* Steps */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
                {PHASES.map((phase, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl border p-3 text-center text-xs transition-all
                    ${
                      index <= phaseIndex
                        ? "border-purple-500/30 bg-purple-500/10 text-white"
                        : "border-white/10 bg-white/[0.03] text-zinc-500"
                    }`}
                  >
                    {phase}
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center text-sm text-zinc-400">
                Estimated remaining time:
                <span className="text-white font-semibold ml-2">
                  ~5 - 10 minutes
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Generate;
