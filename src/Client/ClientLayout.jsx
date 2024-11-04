import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { jwtDecode }from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function ClientLayout() {

  const [cookies, setCookie, removeCookie] = useCookies(["account_token"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.account_token && typeof cookies.account_token === 'string') {
      try {
        const decodedToken = jwtDecode(cookies.account_token);
        if (decodedToken.account_type !== "client") {
          console.log("Not a client");
          if(decodedToken.account_type === "worker") {
            navigate("/worker/home");
            window.location.reload();
          } else if(decodedToken.account_type === "admin") {
            navigate("/admin/dashboard");
          } else {
          navigate("/");
          }
        }
      }
      catch (error) {
        console.error("Invalid token:", error);
        navigate("/");
      }
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

