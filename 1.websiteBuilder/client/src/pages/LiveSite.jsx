import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { ArrowLeft } from "lucide-react";

function LiveSite() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [code, setCode] = useState("");

  useEffect(() => {
    const getWebsite = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/website/site/${slug}`);

        console.log("LIVE SITE RESULT:", result.data);
        console.log("LATEST CODE:", result.data.latestCode);
        console.log("CODE LENGTH:", result.data.latestCode?.length);

        setCode(result.data.latestCode);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getWebsite();
  }, [slug]);
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading website...
      </div>
    );
  }
  return (
    <div className="h-screen w-screen bg-black">
      <iframe
        title="Live Site"
        className="fixed inset-0 w-full h-full bg-white border-0"
        srcDoc={code}
      />

      <button
        onClick={() => navigate("/dashboard")}
        className="fixed top-4 left-4 z-50 px-4 py-2 rounded-lg bg-black/70 text-white"
      >
        <ArrowLeft size={16} />
      </button>

      <div className="fixed bottom-4 left-4 z-50 bg-black text-white text-xs p-2 rounded">
        Code Length: {code?.length || 0}
      </div>
    </div>
  );
}

export default LiveSite;
