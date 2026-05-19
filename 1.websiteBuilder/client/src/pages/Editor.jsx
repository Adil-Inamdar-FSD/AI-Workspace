import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../config/config";
import {
  ArrowLeft,
  Code2,
  Globe,
  Maximize2,
  MessagesSquare,
  Monitor,
  Rocket,
  Send,
  Sparkles,
  X,
  Check,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Editor from "@monaco-editor/react";

function WebsiteEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [website, setWebsite] = useState(null);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState([]);
  const iframeRef = useRef(null);

  const [prompt, setPrompt] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [thinkingIndex, setThinkinIndex] = useState(0);

  const [showCode, setShowCode] = useState(false);
  const [showFulPreview, setShowFulPreview] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const thinkingSteps = [
    "Understanding your request...",
    "Planning layout changes...",
    "Improving responsiveness...",
    "Applying modern animations...",
    "Finalizing beautiful UI...",
  ];

  const handelUpdate = async () => {
    if (!prompt) return;

    setUpdateLoading(true);

    const userPrompt = prompt;

    setMessage((m) => [...m, { role: "user", content: userPrompt }]);

    setPrompt("");

    try {
      const result = await axios.post(
        `${serverUrl}/api/website/update/${id}`,
        { prompt: userPrompt },
        { withCredentials: true },
      );

      setMessage((m) => [...m, { role: "ai", content: result.data.message }]);

      setCode(result.data.code);

      setUpdateLoading(false);
    } catch (error) {
      setUpdateLoading(false);

      setMessage((m) => [
        ...m,
        {
          role: "ai",
          content: error.response?.data?.message || "Failed to update website",
        },
      ]);
    }
  };

  const handleDeploy = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/website/deploy/${website._id}`,
        { withCredentials: true },
      );

      setWebsite((prev) => ({
        ...prev,
        deployed: true,
        slug: result.data.slug,
        deployUrl: result.data.url,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!updateLoading) return;

    const loadingText = setInterval(() => {
      setThinkinIndex((i) => (i + 1) % thinkingSteps.length);
    }, 1200);

    return () => clearInterval(loadingText);
  }, [updateLoading]);

  useEffect(() => {
    const handleGetWebsite = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/website/get-by-id/${id}`,
          { withCredentials: true },
        );

        const websiteData = result.data.website || result.data;

        setWebsite(websiteData);
        setCode(websiteData?.latestCode);
        setMessage(websiteData?.conversation || []);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load website");
      }
    };

    handleGetWebsite();
  }, [id]);

  useEffect(() => {
    if (!iframeRef.current || !code) return;

    requestAnimationFrame(() => {
      iframeRef.current.srcdoc = code;
    });
  }, [code]);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-red-400">
        {error}
      </div>
    );
  }

  if (!website) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#050505] text-white flex">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-100px] left-[-100px] w-[320px] h-[320px] rounded-full bg-purple-600/20 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-100px] right-[-100px] w-[320px] h-[320px] rounded-full bg-blue-600/20 blur-[120px]"
        />
      </div>

      {/* Sidebar */}
      <aside className="hidden lg:flex relative z-20 w-[390px] flex-col border-r border-white/10 bg-black/40 backdrop-blur-2xl">
        {/* Header */}
        <div className="h-16 px-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="min-w-0">
              <h2 className="font-semibold truncate">{website.title}</h2>

              <p className="text-xs text-zinc-400">AI Website Editor</p>
            </div>
          </div>

          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
            <Sparkles size={18} />
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
          {message?.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-[88%] ${
                m.role === "user" ? "ml-auto" : "mr-auto"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-3xl text-sm leading-relaxed shadow-lg
                ${
                  m.role === "user"
                    ? "bg-white text-black rounded-br-md"
                    : "bg-white/5 border border-white/10 text-zinc-200 rounded-bl-md"
                }`}
              >
                {m.content}
              </div>
            </motion.div>
          ))}

          {updateLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-[85%]"
            >
              <div className="px-4 py-3 rounded-3xl rounded-bl-md bg-white/5 border border-white/10 text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
                  />

                  {thinkingSteps[thinkingIndex]}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-xl">
            <input
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="Describe changes to your website..."
            />

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              disabled={updateLoading}
              onClick={handelUpdate}
              className="w-11 h-11 rounded-2xl bg-white text-black flex items-center justify-center font-semibold"
            >
              <Send size={16} />
            </motion.button>
          </div>
        </div>
      </aside>

      {/* Main Preview */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-16 px-4 sm:px-6 border-b border-white/10 bg-black/30 backdrop-blur-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-300">
              <Globe size={14} />
              Live Preview
            </div>

            {website.deployed && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-xs">
                <Check size={12} />
                Live
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {website.deployed ? (
              <button
                onClick={() => {
                  const liveUrl =
                    website.deployUrl ||
                    `${window.location.origin}/site/${website.slug}`;

                  window.open(liveUrl, "_blank");
                }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-sm"
              >
                <Globe size={14} />
                Open Site
              </button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.04 }}
                onClick={handleDeploy}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-sm font-semibold shadow-2xl"
              >
                <Rocket size={14} />
                Deploy
              </motion.button>
            )}

            <button
              onClick={() => setShowChat(true)}
              className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
            >
              <MessagesSquare size={18} />
            </button>

            <button
              onClick={() => setShowCode(true)}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
            >
              <Code2 size={18} />
            </button>

            <button
              onClick={() => setShowFulPreview(true)}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
            >
              <Maximize2 size={18} />
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="relative flex-1 overflow-hidden bg-[#0f0f0f]">
          <iframe
            ref={iframeRef}
            sandbox="allow-scripts allow-same-origin allow-forms"
            className="w-full h-full bg-white"
          />
        </div>
      </div>

      {/* Mobile Chat */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 24 }}
            className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col"
          >
            <div className="h-16 px-4 border-b border-white/10 flex items-center justify-between">
              <h2 className="font-semibold">AI Assistant</h2>

              <button
                onClick={() => setShowChat(false)}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
              {message?.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] ${
                    m.role === "user" ? "ml-auto" : "mr-auto"
                  }`}
                >
                  <div
                    className={`px-4 py-3 rounded-3xl text-sm leading-relaxed
                    ${
                      m.role === "user"
                        ? "bg-white text-black rounded-br-md"
                        : "bg-white/5 border border-white/10 rounded-bl-md"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-3 py-3">
                <input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none"
                  placeholder="Describe changes..."
                />

                <button
                  disabled={updateLoading}
                  onClick={handelUpdate}
                  className="w-11 h-11 rounded-2xl bg-white text-black flex items-center justify-center"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Code Editor */}
      <AnimatePresence>
        {showCode && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 24 }}
            className="fixed inset-y-0 right-0 w-full lg:w-[48%] z-[9999] bg-[#111111] border-l border-white/10 flex flex-col"
          >
            <div className="h-14 px-5 border-b border-white/10 flex items-center justify-between bg-black/50 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <Code2 size={18} />
                <span className="font-medium">index.html</span>
              </div>

              <button
                onClick={() => setShowCode(false)}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <Editor
              theme="vs-dark"
              value={code}
              language="html"
              onChange={(v) => setCode(v || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: "on",
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: {
                  top: 20,
                },
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Preview */}
      <AnimatePresence>
        {showFulPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black"
          >
            <iframe
              sandbox="allow-scripts allow-same-origin allow-forms"
              className="w-full h-full bg-white"
              srcDoc={code}
            />

            <button
              onClick={() => setShowFulPreview(false)}
              className="absolute top-5 right-5 w-12 h-12 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default WebsiteEditor;
