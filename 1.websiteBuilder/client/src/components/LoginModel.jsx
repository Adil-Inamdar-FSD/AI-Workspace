import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { Sparkles, ShieldCheck, ArrowRight } from "lucide-react";

function LoginModel({ open, onClose }) {
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const { data } = await axios.post(
        `${serverUrl}/api/auth/google`,
        {
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        },
        { withCredentials: true },
      );

      dispatch(setUserData(data));
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 backdrop-blur-2xl px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
        >
          {/* Background Glow */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                x: [0, 80, 0],
                y: [0, -40, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-[-120px] left-[-100px] w-[350px] h-[350px] rounded-full bg-purple-600/25 blur-[120px]"
            />

            <motion.div
              animate={{
                x: [0, -60, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[-120px] right-[-100px] w-[350px] h-[350px] rounded-full bg-blue-600/20 blur-[120px]"
            />
          </div>

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 80 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{
              type: "spring",
              damping: 18,
              stiffness: 120,
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg"
          >
            {/* Gradient Border */}
            <div className="rounded-[32px] p-[1px] bg-gradient-to-br from-white/20 via-purple-500/30 to-blue-500/20 shadow-[0_20px_120px_rgba(139,92,246,0.25)]">
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#09090b]/95 backdrop-blur-3xl">
                {/* Top Shine */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_40%)]" />

                {/* Floating Blur */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-40 left-1/2 w-[420px] h-[420px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[120px]"
                />

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  ✕
                </button>

                {/* Content */}
                <div className="relative px-6 sm:px-10 pt-14 pb-10 text-center">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-7"
                  >
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-xs tracking-wide text-zinc-300">
                      AI Powered Website Builder
                    </span>
                  </motion.div>

                  {/* Heading */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl sm:text-5xl font-bold leading-tight"
                  >
                    Build websites
                    <br />
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                      with AI magic
                    </span>
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-5 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-md mx-auto"
                  >
                    Generate stunning modern websites instantly using AI. Login
                    securely and start building in seconds.
                  </motion.p>

                  {/* Features */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-3 mt-8"
                  >
                    {["Lightning Fast", "Modern UI", "Responsive Design"].map(
                      (item, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300"
                        >
                          {item}
                        </div>
                      ),
                    )}
                  </motion.div>

                  {/* Login Button */}
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    onClick={handleGoogleAuth}
                    className="group relative mt-10 w-full h-14 overflow-hidden rounded-2xl bg-white text-black font-semibold shadow-2xl"
                  >
                    {/* Hover Gradient */}
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition duration-500" />

                    <div className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition duration-300">
                      <img
                        src="https://www.svgrepo.com/show/353817/google-icon.svg"
                        alt="Google"
                        className="w-5 h-5"
                      />

                      <span>Continue with Google</span>

                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-300" />
                    </div>
                  </motion.button>

                  {/* Divider */}
                  <div className="flex items-center gap-4 my-8">
                    <div className="h-px flex-1 bg-white/10" />
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <ShieldCheck className="w-4 h-4" />
                      Secure Authentication
                    </div>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  {/* Footer Text */}
                  <p className="text-xs leading-relaxed text-zinc-500">
                    By continuing, you agree to our{" "}
                    <span className="underline cursor-pointer hover:text-zinc-300 transition">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="underline cursor-pointer hover:text-zinc-300 transition">
                      Privacy Policy
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoginModel;
