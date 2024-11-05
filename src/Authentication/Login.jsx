import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/logincss.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["account_token"]);
  const [Login, setLogin] = useState({
    email: "",
    password: "",
  });
  
  useEffect(() => {
    if (cookies.account_token && typeof cookies.account_token === 'string') {
      try {
        const decodedToken = jwtDecode(cookies.account_token);
        if (decodedToken.account_type === "client") {
          navigate("/client/home");
        } else {
          removeCookie("account_token");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        removeCookie("account_token");
      }
    } else {
      console.log("No token found");
    }
  }, []);

  function handleLogin(e) {
    setLogin({
      ...Login,
      [e.target.name]: e.target.value,
    });
  }

  function onHandleSubmit(e) {
    e.preventDefault();
    const login = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    axios
      .post("http://localhost/FIXR/API/Authentication/login.php", login)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          const token = jwtDecode(res.data.data);
          if (token.user_id == null && token.account_type == null) {
            alert("Wrong Output!");
          } 
          else {
            setCookie("account_token", res.data.data, {
              path: "/",
              expires: null,
              secure: true,
              sameSite: "strict",
            });
            navigate("/client/home");
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("Invalid Email or Password");
        }
        if (err.response.status === 404) {
          alert("User not found");
        }
      });
  }

  function handleRegisterClick() {
    navigate("/client/register");
  }

  return (
    <div className="login-background">
      <div className="content">
        <div className="login-container mt-5">
          <div>
            <h1 style={{ fontSize: "40px", fontFamily: "inherit" }}>
              <b>Login</b>
            </h1>
          </div>
          <form onSubmit={onHandleSubmit}>
            <div className="mb-3" style={{ marginTop: "5%" }}>
              <div className="user-inputs">
                <label htmlFor="Email:">Email:</label>
                <input
                  type="text"
                  name="email"
                  id=""
                  style={{ height: "50px" }}
                  onChange={handleLogin}
                />
              </div>
              <div className="user-inputs" style={{ marginTop: "20px" }}>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  id=""
                  placeholder=""
                  style={{ height: "50px" }}
                  onChange={handleLogin}
                />
              </div>
            </div>

            <div className="centerItems mt-4"></div>

            <div className="signinbuttons mt-3">
              <div className="col mt-3">
                <button className="loginbtn">Login</button>
              </div>
            </div>
          </form>

          <div className="noaccount">
            <p>Don't have an Account?</p>
            <div
              style={{ cursor: "pointer" }}
              onClick={handleRegisterClick}
              className="register"
            >
              Register Here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
