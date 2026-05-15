import {
  ArrowLeft,
  Check,
  Globe,
  Plus,
  Rocket,
  Share2,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

function Dashboard() {
  const { userData } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const handleDeploy = async (id) => {
    try {
      const result = await axios.get(`${serverUrl}/api/website/deploy/${id}`, {
        withCredentials: true,
      });

      window.open(result.data.url, "_blank");

      setWebsites((prev) =>
        prev.map((site) =>
          site._id === id
            ? {
                ...site,
                deployed: true,
                deployUrl: result.data.url,
              }
            : site,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleGetAllWebsites = async () => {
      try {
        setLoading(true);

        const result = await axios.get(`${serverUrl}/api/website/get-all`, {
          withCredentials: true,
        });

        setWebsites(result.data || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.response?.data?.message || "Something went wrong");
        console.log(error);
      }
    };

    handleGetAllWebsites();
  }, []);

  const handleShare = async (site) => {
    const shareUrl =
      site.deployUrl || `${window.location.origin}/preview/${site._id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: site.title || "My Genweb.ai Website",
          text: "Check out this website I created with Genweb.ai",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);

        setCopiedId(site._id);

        setTimeout(() => {
          setCopiedId(null);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 -left-24 w-[380px] h-[380px] rounded-full bg-purple-600/20 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] rounded-full bg-blue-600/20 blur-[120px]"
        />
      </div>

      {/* Navbar */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/")}
              className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              <ArrowLeft size={18} />
            </motion.button>

            <div>
              <h1 className="text-lg font-semibold flex items-center gap-2">
                <LayoutDashboard size={18} />
                Dashboard
              </h1>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/generate")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm shadow-2xl"
          >
            <Plus size={16} />
            New Website
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-5">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-xs text-zinc-300">AI Website Dashboard</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Welcome back,
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              {userData?.name}
            </span>
          </h1>

          <p className="mt-4 text-zinc-400 max-w-xl text-sm sm:text-base">
            Manage, deploy and share all your AI generated websites from one
            beautiful dashboard.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {[
            {
              label: "Total Websites",
              value: websites?.length || 0,
            },
            {
              label: "Deployed",
              value: websites?.filter((w) => w.deployed).length || 0,
            },
            {
              label: "Draft Projects",
              value: websites?.filter((w) => !w.deployed).length || 0,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
            >
              <p className="text-sm text-zinc-400">{item.label}</p>

              <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
            </motion.div>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white"
            />

            <p className="mt-5 text-zinc-400">Loading your websites...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && websites?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 border border-dashed border-white/10 rounded-3xl bg-white/[0.03]"
          >
            <Globe size={50} className="text-zinc-600 mb-5" />

            <h2 className="text-2xl font-semibold mb-2">No websites yet</h2>

            <p className="text-zinc-400 text-sm mb-6">
              Start building your first AI powered website now.
            </p>

            <button
              onClick={() => navigate("/generate")}
              className="px-5 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
            >
              Create Website
            </button>
          </motion.div>
        )}

        {/* Website Grid */}
        {!loading && !error && websites?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {websites.map((w, i) => {
              const copied = copiedId === w._id;

              return (
                <motion.div
                  key={w._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{
                    y: -8,
                  }}
                  onClick={() => navigate(`/editor/${w._id}`)}
                  className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl cursor-pointer"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />

                  {/* Preview */}
                  <div className="relative h-52 overflow-hidden bg-black">
                    <iframe
                      srcDoc={w.latestCode}
                      title={w.title}
                      className="absolute inset-0 w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Deploy Badge */}
                    <div className="absolute top-4 right-4">
                      {w.deployed ? (
                        <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs">
                          Live
                        </div>
                      ) : (
                        <div className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-xs">
                          Draft
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-5 flex flex-col gap-4">
                    <div>
                      <h2 className="text-lg font-semibold line-clamp-1">
                        {w.title}
                      </h2>

                      <p className="mt-1 text-xs text-zinc-400">
                        Updated on {new Date(w.updatedAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Buttons */}
                    {!w.deployed ? (
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeploy(w._id);
                        }}
                        className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-3 font-semibold shadow-2xl"
                      >
                        <Rocket size={18} />
                        Deploy Website
                      </motion.button>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(w);
                        }}
                        className={`mt-2 flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-medium border transition-all
                        ${
                          copied
                            ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check size={16} />
                            Link Copied
                          </>
                        ) : (
                          <>
                            <Share2 size={16} />
                            Share Website
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
