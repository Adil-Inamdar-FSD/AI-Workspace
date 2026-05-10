import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function useGetCurrentUser() {
    const despatch= useDispatch()
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/me`, {
          withCredentials: true,
        });
        despatch(setUserData(result.data))
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUser();
  }, []);
}

export default useGetCurrentUser;
