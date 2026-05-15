import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  Coins,
  LoaderCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const sessionId = searchParams.get("session_id");

        await new Promise((resolve) => setTimeout(resolve, 1800));

        const { data } = await axios.post(
          `${serverUrl}/api/billing/verify`,
          { sessionId },
          { withCredentials: true },
        );

        dispatch(setUserData(data.user));

        setStatus("success");

        setTimeout(() => {
          navigate("/dashboard");
        }, 3500);
      } catch (error) {
        console.log(error);

        setStatus("error");

        setTimeout(() => {
          navigate("/pricing");
        }, 3000);
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040404] text-white flex items-center justify-center px-6">
      {/* Animated Background */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-140px] left-[-140px] w-[420px] h-[420px] rounded-full bg-purple-500/20 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 90, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-140px] right-[-140px] w-[420px] h-[420px] rounded-full bg-blue-500/20 blur-[140px]"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />

      {/* Main Card */}
      <AnimatePresence mode="wait">
        {status === "loading" && (
          <motion.div
            key="loading"
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
            className="relative z-10 max-w-xl w-full overflow-hidden rounded-[36px] border border-white/10 bg-[#0b0b0b]/90 backdrop-blur-2xl shadow-[0_30px_120px_rgba(0,0,0,0.8)]"
          >
            {/* Glow */}
            <motion.div
              animate={{
                opacity: [0.25, 0.5, 0.25],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-purple-500/20 blur-[120px]"
            />

            <motion.div
              animate={{
                opacity: [0.2, 0.45, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: 1,
              }}
              className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-blue-500/20 blur-[120px]"
            />

            <div className="relative p-10 sm:p-14 text-center">
              {/* Loader */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-24 h-24 rounded-[30px] bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-8 shadow-[0_20px_80px_rgba(168,85,247,0.35)]"
              >
                <LoaderCircle size={42} />
              </motion.div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
                <ShieldCheck size={14} className="text-emerald-400" />

                <span className="text-xs text-zinc-300">
                  Secure Payment Verification
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-bold leading-tight mb-4">
                Processing Your
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Credits Purchase
                </span>
              </h1>

              {/* Description */}
              <p className="text-zinc-400 leading-relaxed max-w-md mx-auto">
                Please wait while we verify your payment and update your
                GenWeb.ai credits securely.
              </p>

              {/* Progress */}
              <div className="mt-10">
                <div className="h-2 w-full rounded-full overflow-hidden bg-white/10">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                    }}
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
                  />
                </div>

                <div className="mt-4 text-xs tracking-[0.25em] uppercase text-zinc-500">
                  Updating account balance
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Success State */}
        {status === "success" && (
          <motion.div
            key="success"
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="relative z-10 max-w-xl w-full overflow-hidden rounded-[36px] border border-emerald-500/20 bg-[#0b0b0b]/90 backdrop-blur-2xl shadow-[0_30px_120px_rgba(0,0,0,0.8)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10" />

            <div className="relative p-10 sm:p-14 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 10,
                }}
                className="w-24 h-24 rounded-[30px] bg-emerald-500/20 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8"
              >
                <CheckCircle2 size={48} className="text-emerald-400" />
              </motion.div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 mb-6">
                <Sparkles size={14} className="text-emerald-400" />

                <span className="text-xs text-emerald-300">
                  Payment Successful
                </span>
              </div>

              <h1 className="text-4xl font-bold leading-tight mb-4">
                Credits Added
                <span className="block bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Successfully
                </span>
              </h1>

              <p className="text-zinc-400 leading-relaxed max-w-md mx-auto">
                Your credits have been updated and your account is ready to
                continue building AI powered websites.
              </p>

              <div className="mt-10 flex items-center justify-center gap-3">
                <div className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/10 bg-white/5">
                  <Coins size={18} className="text-yellow-400" />

                  <span className="text-sm text-zinc-300">Credits Updated</span>
                </div>
              </div>

              <motion.div
                animate={{
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="mt-8 text-xs tracking-[0.25em] uppercase text-zinc-500"
              >
                Redirecting to dashboard
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {status === "error" && (
          <motion.div
            key="error"
            initial={{
              opacity: 0,
              scale: 0.92,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="relative z-10 max-w-xl w-full overflow-hidden rounded-[36px] border border-red-500/20 bg-[#0b0b0b]/90 backdrop-blur-2xl p-12 text-center"
          >
            <div className="w-24 h-24 rounded-[30px] bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-8">
              <LoaderCircle size={42} className="text-red-400" />
            </div>

            <h1 className="text-4xl font-bold mb-4">
              Payment Verification Failed
            </h1>

            <p className="text-zinc-400 leading-relaxed">
              Something went wrong while verifying your payment. Please try
              again or contact support.
            </p>

            <button
              onClick={() => navigate("/pricing")}
              className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition"
            >
              Back to Pricing
              <ArrowRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PaymentSuccess;
