import { ArrowLeft, Check, Coins, Sparkles, Zap, Crown } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../config/config";

const plans = [
  {
    key: "free",
    name: "Free",
    price: "₹0",
    credits: 100,
    icon: Zap,
    description: "Perfect to explore GenWeb.ai and generate starter websites.",
    features: [
      "AI website generation",
      "Responsive HTML output",
      "Basic animations",
      "Live preview support",
    ],
    popular: false,
    button: "Get Started",
  },
  {
    key: "pro",
    name: "Pro",
    price: "₹499",
    credits: 500,
    icon: Sparkles,
    description:
      "Best for creators, freelancers and agencies building premium websites.",
    features: [
      "Advanced AI website generation",
      "Responsive HTML + CSS output",
      "Smooth UI animations",
      "Faster generation speed",
      "Priority AI processing",
    ],
    popular: true,
    button: "Upgrade to Pro",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "₹1499",
    credits: 1000,
    icon: Crown,
    description:
      "Powerful enterprise experience with premium generation capabilities.",
    features: [
      "Unlimited premium generations",
      "Enterprise-grade UI designs",
      "Custom branding support",
      "Advanced code optimization",
      "Early access features",
      "Priority support",
    ],
    popular: false,
    button: "Go Enterprise",
  },
];

function Pricing() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(null);

  const { userData } = useSelector((state) => state.user);

  const handleBuy = async (planKey) => {
    if (!userData) {
      navigate("/");
      return;
    }

    if (planKey === "free") {
      navigate("/dashboard");
      return;
    }

    setLoading(planKey);

    try {
      const result = await axios.post(
        `${serverUrl}/api/billing`,
        { planType: planKey },
        { withCredentials: true },
      );

      window.location.href = result.data.sessionUrl;
    } catch (error) {
      console.log(error);
      setLoading(null);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040404] text-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 120, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-purple-500/20 blur-[140px]"
        />

        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 90, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-140px] right-[-140px] w-[520px] h-[520px] rounded-full bg-blue-500/20 blur-[140px]"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
      </div>

      {/* Top Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <motion.button
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-sm hover:bg-white/10 transition"
        >
          <ArrowLeft size={16} />
          Back
        </motion.button>

        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
          <Coins size={16} className="text-yellow-400" />

          <span className="text-sm text-zinc-300">AI Powered Pricing</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-10 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-8">
            <Sparkles size={14} className="text-purple-400" />

            <span className="text-xs tracking-[0.25em] uppercase text-zinc-300">
              Flexible Pricing
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Simple Pricing
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Built for Creators
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Choose the perfect plan for your AI website generation workflow. Pay
            once and create beautiful experiences anytime.
          </p>
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, i) => {
            const Icon = p.icon;
            const isLoading = loading === p.key;

            return (
              <motion.div
                key={p.key}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className={`relative overflow-hidden rounded-[34px] border backdrop-blur-2xl transition-all duration-500
                  ${
                    p.popular
                      ? "border-purple-500/40 bg-gradient-to-b from-purple-500/15 via-white/[0.04] to-transparent shadow-[0_20px_80px_rgba(168,85,247,0.25)]"
                      : "border-white/10 bg-white/[0.04] hover:border-white/20"
                  }
                `}
              >
                {/* Glow */}
                <div
                  className={`absolute inset-0 opacity-60 ${
                    p.popular
                      ? "bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.2),transparent_50%)]"
                      : "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_50%)]"
                  }`}
                />

                {/* Popular Badge */}
                {p.popular && (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="absolute top-5 right-5 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-xs font-semibold shadow-lg"
                  >
                    Most Popular
                  </motion.div>
                )}

                <div className="relative p-8 md:p-10 h-full flex flex-col">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 8 }}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8
                      ${
                        p.popular
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_20px_60px_rgba(168,85,247,0.4)]"
                          : "bg-white/10 border border-white/10"
                      }
                    `}
                  >
                    <Icon size={28} />
                  </motion.div>

                  {/* Plan Info */}
                  <h2 className="text-3xl font-bold mb-3">{p.name}</h2>

                  <p className="text-zinc-400 leading-relaxed mb-8">
                    {p.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-bold tracking-tight">
                        {p.price}
                      </span>

                      <span className="text-zinc-400 mb-2">/one-time</span>
                    </div>
                  </div>

                  {/* Credits */}
                  <div className="flex items-center gap-3 px-4 py-4 rounded-2xl border border-white/10 bg-white/5 mb-10">
                    <div className="w-11 h-11 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                      <Coins size={20} className="text-yellow-400" />
                    </div>

                    <div>
                      <p className="text-lg font-semibold">
                        {p.credits} Credits
                      </p>

                      <p className="text-xs text-zinc-500">
                        Available instantly
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-10 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5">
                          <Check size={12} className="text-emerald-400" />
                        </div>

                        <span className="text-sm text-zinc-300 leading-relaxed">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    disabled={loading}
                    onClick={() => handleBuy(p.key)}
                    className={`relative overflow-hidden w-full py-4 rounded-2xl font-semibold transition-all duration-300
                      ${
                        p.popular
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-[0_20px_60px_rgba(168,85,247,0.45)]"
                          : "bg-white/10 hover:bg-white/15 border border-white/10"
                      }
                      disabled:opacity-70
                    `}
                  >
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div
                          key="loading"
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          exit={{
                            opacity: 0,
                          }}
                          className="flex items-center justify-center gap-3"
                        >
                          <motion.div
                            animate={{
                              rotate: 360,
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Redirecting...
                        </motion.div>
                      ) : (
                        <motion.span
                          key="button"
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          exit={{
                            opacity: 0,
                          }}
                        >
                          {p.button}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 px-6 pb-20">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          className="max-w-4xl mx-auto rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-10 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Build Faster with AI</h2>

          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Generate modern, animated and production-ready websites using
            advanced AI powered workflows. Create landing pages, portfolios,
            SaaS apps and more within minutes.
          </p>

          <button
            onClick={() => navigate("/generate")}
            className="mt-8 px-8 py-4 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition"
          >
            Start Building
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Pricing;
