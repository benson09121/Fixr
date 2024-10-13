import "../css/register.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    f_name: "",
    l_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (cookies.account_token) {
      navigate("/home");
    }
  }, []);
  const [cookies, setCookie, removeCookie] = useCookies(["token_user"]);
  const onhandleRegister = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };
  function handleSubmit(e) {
    e.preventDefault();
    const register = {
      f_name: e.target.f_name.value,
      l_name: e.target.l_name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };
    axios
      .post("http://localhost/FIXR/API/register.php", register, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setCookie("account_token", res.data.data, {
          path: "/",
          expires: null,
          secure: true,
          sameSite: "strict",
        });
        if(res.status === 200){
          navigate("/home");
        }
      
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container">
      <h1 style={{ marginTop: "1.5rem" }}>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div className="user-form">
          <div className="user-fullname">
            <div className="user-inputs">
              <label htmlFor="f_name:">First Name:</label>
              <input
                type="text"
                name="f_name"
                placeholder="First Name"
                onChange={onhandleRegister}
              />
            </div>
            <div className="user-inputs">
              <label htmlFor="l_name:">Last Name:</label>
              <input
                type="text"
                name="l_name"
                placeholder="Last Name"
                onChange={onhandleRegister}
              />
            </div>
          </div>
          <div className="user-inputs">
            <label htmlFor="Email:">Email:</label>
            <input
              type="text"
              name="email"
              placeholder="test@email.com"
              onChange={onhandleRegister}
            />
          </div>
          <div className="user-inputs">
            <label htmlFor="Phone:">Phone:</label>
            <input
              type="text"
              name="phone"
              placeholder="####-###-####"
              onChange={onhandleRegister}
            />
          </div>
          <div className="user-inputs">
            <label htmlFor="Password:">Password:</label>
            <input
              type="password"
              name="password"
              placeholder=""
              onChange={onhandleRegister}
            />
          </div>
          <div className="user-inputs">
            <label htmlFor="Confirm Password:">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder=""
              onChange={onhandleRegister}
            />
          </div>
        </div>
        <div className="terms">
          <input type="checkbox" name="" id="" />
          <label htmlFor="">
            I agree with the <a href="">Terms and Conditions</a>
          </label>
        </div>
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
      </form>
      <span style={{ marginTop: "10px" }}>
        Already have an Account? <Link to="/">Login Here</Link>
      </span>
    </div>
  );
}

export default Register;
