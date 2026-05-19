import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { serverUrl } from "../config/config";
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  LoaderCircle,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function LiveSite() {
  const { slug } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const getWebsite = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/website/site/${slug}`);

        setCode(result.data.latestCode || "");
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message || "Failed to load website");
      } finally {
        setLoading(false);
      }
    };

    getWebsite();
  }, [slug]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#040404] text-white flex items-center justify-center">
        {/* Animated Background */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-120px] left-[-120px] w-[380px] h-[380px] rounded-full bg-purple-500/20 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-120px] right-[-120px] w-[380px] h-[380px] rounded-full bg-blue-500/20 blur-[120px]"
        />

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="mb-6"
          >
            <LoaderCircle size={50} className="text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-semibold mb-2"
          >
            Loading Website
          </motion.h1>

          <p className="text-zinc-400 text-sm">Preparing live preview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative max-w-md w-full rounded-[32px] border border-red-500/20 bg-red-500/10 backdrop-blur-2xl p-10 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent" />

          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
              <Globe size={36} className="text-red-400" />
            </div>

            <h1 className="text-2xl font-bold mb-3">Unable to Load Website</h1>

            <p className="text-sm text-zinc-400 leading-relaxed">{error}</p>

            <button
              onClick={() => navigate("/dashboard")}
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Live Website */}
      <iframe
        title="Live Site"
        className="fixed inset-0 w-full h-full bg-white border-0"
        srcDoc={code}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />

      {/* Top Floating Controls */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between"
      >
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-2xl text-white shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">Dashboard</span>
        </motion.button>

        {/* Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="hidden md:flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-2xl"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
            <Sparkles size={18} />
          </div>

          <div>
            <h2 className="text-sm font-semibold">GenWeb.ai</h2>

            <p className="text-[11px] text-zinc-400">AI Generated Website</p>
          </div>
        </motion.div>

        {/* Open Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open(window.location.href)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-2xl text-white shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
        >
          <ExternalLink size={18} />

          <span className="hidden sm:inline">Open</span>
        </motion.button>
      </motion.div>

      {/* Intro Overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-xl flex items-center justify-center"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.92,
              }}
              transition={{
                duration: 0.45,
              }}
              className="relative max-w-lg w-full mx-6 overflow-hidden rounded-[36px] border border-white/10 bg-[#0b0b0b]/95 backdrop-blur-2xl p-10 text-center shadow-[0_30px_120px_rgba(0,0,0,0.8)]"
            >
              {/* Background Glow */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-purple-500/20 blur-[120px]"
              />

              <motion.div
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 1,
                }}
                className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-blue-500/20 blur-[120px]"
              />

              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="w-24 h-24 rounded-[28px] bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-8 shadow-[0_20px_80px_rgba(168,85,247,0.35)]"
                >
                  <Globe size={40} />
                </motion.div>

                <h1 className="text-4xl font-bold mb-4 leading-tight">
                  Welcome to the
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Live Experience
                  </span>
                </h1>

                <p className="text-zinc-400 leading-relaxed">
                  This website was generated using AI with modern design,
                  responsive layouts and interactive experiences.
                </p>

                <motion.div
                  animate={{
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="mt-8 text-xs tracking-[0.3em] uppercase text-zinc-500"
                >
                  Loading Preview
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Status */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />

          <span className="text-sm text-white">Website Live</span>

          <div className="w-px h-4 bg-white/10" />

          <span className="text-xs text-zinc-400">
            {code?.length || 0} characters rendered
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default LiveSite;
