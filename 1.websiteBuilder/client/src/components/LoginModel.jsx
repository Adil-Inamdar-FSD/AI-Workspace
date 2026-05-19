import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { Sparkles, ShieldCheck, ArrowRight } from "lucide-react";

const serverUrl = import.meta.env.VITE_SERVER_URL;

function LoginModel({ open, onClose }) {
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {
      // 1. Firebase Google Login
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      // 2. Send user to backend
      const { data } = await axios.post(
  `${serverUrl}/api/auth/google`,
  {
    name: result.user.displayName,
    email: result.user.email,
    avatar: result.user.photoURL,
  },
  { withCredentials: true }
);

      // 3. Save user in Redux
      dispatch(setUserData(data));

      // 4. Close modal
      onClose();
    } catch (error) {
      console.log("Google Auth Error:", error);
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
              animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-120px] left-[-100px] w-[350px] h-[350px] rounded-full bg-purple-600/25 blur-[120px]"
            />

            <motion.div
              animate={{ x: [0, -60, 0], y: [0, 50, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[-120px] right-[-100px] w-[350px] h-[350px] rounded-full bg-blue-600/20 blur-[120px]"
            />
          </div>

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 80 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: "spring", damping: 18, stiffness: 120 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg"
          >
            <div className="rounded-[32px] p-[1px] bg-gradient-to-br from-white/20 via-purple-500/30 to-blue-500/20 shadow-[0_20px_120px_rgba(139,92,246,0.25)]">
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#09090b]/95 backdrop-blur-3xl">

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                >
                  ✕
                </button>

                <div className="relative px-6 sm:px-10 pt-14 pb-10 text-center">

                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-7"
                  >
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-xs text-zinc-300">
                      AI Powered Website Builder
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl sm:text-5xl font-bold"
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
                    className="mt-5 text-sm text-zinc-400 max-w-md mx-auto"
                  >
                    Login securely and start building modern websites instantly.
                  </motion.p>

                  {/* Login Button */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleGoogleAuth}
                    className="mt-10 w-full h-14 rounded-2xl bg-white text-black font-semibold flex items-center justify-center gap-3"
                  >
                    <img
                      src="https://www.svgrepo.com/show/353817/google-icon.svg"
                      className="w-5 h-5"
                      alt="google"
                    />
                    Continue with Google
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  {/* Divider */}
                  <div className="flex items-center gap-4 my-8">
                    <div className="h-px flex-1 bg-white/10" />
                    <div className="text-xs text-zinc-500 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      Secure Authentication
                    </div>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  {/* Footer */}
                  <p className="text-xs text-zinc-500">
                    By continuing you agree to Terms & Privacy Policy
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
