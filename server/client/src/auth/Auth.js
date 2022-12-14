import { useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { AppContext } from "../App";

export const Auth = (props) => {
  const [redirect, setRedirect] = useState(null);
  const { accessToken, setAccessToken } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      console.log("trying to verify");
      try {
        const response = await axios.get("/token", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status == 200) {
          setRedirect(true);
          console.log("successfully vertified");
        }
      } catch (e) {
        navigate("/login");
        console.log(e, "verify not successful");
      }
    };
    verify();
  }, []);
  return redirect ? props.children : "";
};
