import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/user/me`,
          { withCredentials: true }
        );

        dispatch(setUserData(result.data));
      } catch (error) {
        console.log("User fetch error:", error.response?.data || error.message);
      }
    };

    getCurrentUser();
  }, [dispatch]);
}

export default useGetCurrentUser;
