import { ArrowLeft, AwardIcon, Check, Rocket, Share2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

function Dashboard() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [websites, setWebsites] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const handleDeploy = async (id) => {
    try {
      const result = await axios.get(`${serverUrl}/api/website/deploy/${id}`, {
        withCredentials: true,
      });
      window.open(`${result.data.url}`, "_blank");
      setWebsite((prev) => ({
        ...prev,
        deployed: true,
        deployUrl: result.data.url,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const hadleGetAllWebsites = async () => {
      try {
        setLoading(true);
        const result = await axios.get(`${serverUrl}/api/website/get-all`, {
          withCredentials: true,
        });
        setWebsites(result.data || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.respnse.data.message);
        console.log(error);
      }
    };
    hadleGetAllWebsites();
  }, []);

  const handleShare = async (site) => {
    const shareUrl =
      site.deployUrl || `${window.location.origin}/preview/${site._id}`;
    if (!shareUrl) {
      alert("Please deploy website first");
      return;
    }

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
        setTimeout(() => setCopiedId(null), 2000);
      }
    } catch (error) {
      console.log("Share cancelled or failed:", error);
    }
  };
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-lg hover:bg-white/10 transition"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={16} />
            </button>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <button
            className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 transition"
            onClick={() => navigate("/generate")}
          >
            + New Website
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-sm  text-zinc-400 mb-1">Welcome Back</p>
          <h1 className="text-3xl font-bold">{userData.name}</h1>
        </motion.div>

        {loading && (
          <div className="mt-24 text-center text-zinc-400">
            Loading your websites....
          </div>
        )}

        {error && !loading && (
          <div className="mt-24 text-center text-red-400">{error}</div>
        )}

        {websites?.length == 0 && (
          <div className="mt-24 text-center text-zinc-400">
            You have no websites
          </div>
        )}

        {!loading && !error && websites?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {websites.map((w, i) => {
              const copied = copiedId === w._id;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  onClick={() => navigate(`/editor/${w._id}`)}
                  className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition flex flex-col"
                >
                  <div className="relative h-40 bg-black cursor-pointer">
                    <iframe
                      srcDoc={w.latestCode}
                      className="absolute inset-0 w-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>

                  <div className="p-5 flex flex-col gap-4 flex-1">
                    <h3 className="text-base font-semibold line-clamp-2">
                      {w.title}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Last Updated {""}{" "}
                      {new Date(w.updatedAt).toLocaleDateString()}
                    </p>
                    {!w.deployed ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeploy(w._id);
                        }}
                        className="mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 transition"
                      >
                        <Rocket size={18} />
                        Deploy
                      </button>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(w);
                        }}
                        className={`mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all 
                          ${
                            copied
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-white/10 hover:bg-white/20 border border-white/10"
                          }
                          `}
                      >
                        {copied ? (
                          <>
                            <Check size={14} />
                            Link Copied
                          </>
                        ) : (
                          <>
                            <Share2 size={14} />
                            Share Link
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
