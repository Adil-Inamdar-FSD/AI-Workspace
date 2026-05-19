import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoginModel from "../components/LoginModel";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowRight,
  Coins,
  Layers3,
  LogOut,
  Rocket,
  Sparkles,
  WandSparkles,
  Globe,
  Menu,
  X,
} from "lucide-react";
import axios from "axios";
import { serverUrl } from "../config/config";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const { userData } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [websites, setWebsites] = useState([]);

  const handlLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      setOpenProfile(false);
    } catch (error) {
      console.log(error);
    }
  };

  const highlights = [
    {
      icon: WandSparkles,
      title: "AI Generated Code",
      desc: "Generate beautiful production ready websites powered by advanced AI.",
    },
    {
      icon: Layers3,
      title: "Fully Responsive",
      desc: "Modern layouts optimized for mobile, tablet and desktop screens.",
    },
    {
      icon: Rocket,
      title: "Fast Deployment",
      desc: "Create, edit and deploy your websites instantly with one click.",
    },
  ];

  useEffect(() => {
    if (!userData) return;

    const handleGetAllWebsites = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/website/get-all`, {
          withCredentials: true,
        });

        setWebsites(result.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    handleGetAllWebsites();
  }, [userData]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 90, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] rounded-full bg-purple-600/20 blur-[140px]"
        />

        <motion.div
          animate={{
            x: [0, -90, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-140px] right-[-140px] w-[420px] h-[420px] rounded-full bg-blue-600/20 blur-[140px]"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_45%)]" />
      </div>

      {/* Navbar */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-2xl">
              <Sparkles size={18} />
            </div>

            <div>
              <h1 className="text-lg font-bold">
                GenWeb
                <span className="text-zinc-400">.ai</span>
              </h1>

              <p className="text-[10px] text-zinc-500">AI Website Builder</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-5">
            <button
              onClick={() => navigate("/pricing")}
              className="text-sm text-zinc-400 hover:text-white transition"
            >
              Pricing
            </button>

            {userData && (
              <button
                onClick={() => navigate("/pricing")}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                <Coins size={14} className="text-yellow-400" />

                <span className="text-sm text-zinc-300">
                  {userData.credits} Credits
                </span>
              </button>
            )}

            {!userData ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpenLogin(true)}
                className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold shadow-2xl"
              >
                Get Started
              </motion.button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setOpenProfile(!openProfile)}
                  className="flex items-center"
                >
                  <img
                    src={
                      userData.avatar ||
                      `https://ui-avatars.com/api/?name=${userData.name}`
                    }
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-white/20"
                  />
                </button>

                <AnimatePresence>
                  {openProfile && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -10,
                        scale: 0.95,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -10,
                        scale: 0.95,
                      }}
                      className="absolute right-0 top-14 w-72 rounded-3xl border border-white/10 bg-[#0b0b0b]/95 backdrop-blur-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
                    >
                      <div className="p-5 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              userData.avatar ||
                              `https://ui-avatars.com/api/?name=${userData.name}`
                            }
                            alt=""
                            className="w-12 h-12 rounded-full object-cover"
                          />

                          <div className="min-w-0">
                            <h2 className="font-semibold truncate">
                              {userData.name}
                            </h2>

                            <p className="text-xs text-zinc-500 truncate">
                              {userData.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <button
                          onClick={() => {
                            setOpenProfile(false);
                            navigate("/dashboard");
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition text-sm"
                        >
                          <Globe size={16} />
                          Dashboard
                        </button>

                        <button
                          onClick={() => {
                            setOpenProfile(false);
                            navigate("/pricing");
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition text-sm"
                        >
                          <Coins size={16} className="text-yellow-400" />
                          Buy Credits
                        </button>

                        <button
                          onClick={handlLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-500/10 text-red-400 transition text-sm"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
          >
            {mobileMenu ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-2xl"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                <button
                  onClick={() => navigate("/pricing")}
                  className="text-left px-4 py-3 rounded-2xl bg-white/5 border border-white/10"
                >
                  Pricing
                </button>

                {!userData ? (
                  <button
                    onClick={() => setOpenLogin(true)}
                    className="px-4 py-3 rounded-2xl bg-white text-black font-semibold"
                  >
                    Get Started
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-left"
                    >
                      Dashboard
                    </button>

                    <button
                      onClick={handlLogout}
                      className="px-4 py-3 rounded-2xl bg-red-500/10 text-red-400 text-left"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 mb-8"
          >
            <Sparkles size={14} className="text-purple-400" />

            <span className="text-xs text-zinc-300">
              Build Websites with Advanced AI
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-7xl font-bold leading-tight tracking-tight"
          >
            Create stunning
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              AI powered websites
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-2xl mx-auto text-zinc-400 text-base sm:text-lg leading-relaxed"
          >
            Describe your idea and let GenWeb.ai generate a beautiful,
            responsive and production ready website with animations, modern
            layouts and clean code.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() =>
                userData ? navigate("/generate") : setOpenLogin(true)
              }
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-semibold shadow-[0_20px_80px_rgba(255,255,255,0.15)]"
            >
              <Rocket size={18} />
              {userData ? "Start Building" : "Get Started"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/pricing")}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              Explore Pricing
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      {!userData && (
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-6">
                    <item.icon size={24} />
                  </div>

                  <h2 className="text-xl font-semibold mb-3">{item.title}</h2>

                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* User Websites */}
      {userData && websites?.length > 0 && (
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-28">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Your Websites</h2>

              <p className="text-zinc-400 mt-2">
                Continue editing your recent AI generated projects.
              </p>
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="hidden sm:flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              View All
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {websites.slice(0, 3).map((w, i) => (
              <motion.div
                key={w._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                onClick={() => navigate(`/editor/${w._id}`)}
                className="group cursor-pointer overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl"
              >
                {/* Preview */}
                <div className="relative h-52 overflow-hidden bg-black">
                  <iframe
                    srcDoc={w.latestCode}
                    className="absolute inset-0 w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs">
                    {w.deployed ? "Live" : "Draft"}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold line-clamp-1">
                    {w.title}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-400">
                    Last updated {new Date(w.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!userData && (
        <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-28">
          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-purple-500/10 via-black to-blue-500/10 p-10 sm:p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />

            <div className="relative">
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                Ready to build your
                <br />
                next website with AI?
              </h2>

              <p className="mt-6 text-zinc-400 max-w-2xl mx-auto">
                Create beautiful websites in minutes with animations, responsive
                layouts and clean code.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setOpenLogin(true)}
                className="mt-10 inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-semibold"
              >
                <Sparkles size={18} />
                Start for Free
              </motion.button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} GenWeb.ai — Build beautiful websites with
        AI.
      </footer>

      {/* Login Modal */}
      {openLogin && (
        <LoginModel open={openLogin} onClose={() => setOpenLogin(false)} />
      )}
    </div>
  );
}

export default Home;
