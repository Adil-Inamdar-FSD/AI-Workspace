import React, { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const sessionId = searchParams.get("session_id");

        const { data } = await axios.post(
          `${serverUrl}/api/billing/verify`,
          { sessionId },
          { withCredentials: true }
        );

        dispatch(setUserData(data.user));
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
        navigate("/pricing");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      Updating your credits...
    </div>
  );
}

export default PaymentSuccess;