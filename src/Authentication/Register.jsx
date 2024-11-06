import "../css/register.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import {jwtDecode} from "jwt-decode";
function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selected, setSelected] = useState(""); 
  const [showTerms, setShowTerms] = useState(false);
  const handleClick = (option) => {
    setSelected(option);
  };

  const handleShowTerms = (event) => {
    event.preventDefault();
    setShowTerms(true);
  }

  const handleCloseTerms = () => {
    setShowTerms(false);
  }

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
      const token = jwtDecode(cookies.account_token);
      if(!token.user_id == null && !token.account_type == null){
        navigate("/client/home");
      }
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
    const { f_name, l_name, email, phone, password, confirmPassword } = register;

    if (!f_name || !l_name || !email || !phone || !password || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const registerData = {
      f_name,
      l_name,
      email,
      phone,
      password,
      account_type: selected,
    };

    axios
      .post("http://localhost/FIXR/API/Authentication/register.php", registerData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCookie("account_token", res.data.data, {
            path: "/",
            expires: null,
            secure: true,
            sameSite: "strict",
          });
          navigate("/client/home");
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          alert("Email already exists");
        } else if (err.response.status === 400) {
          alert("Missing required fields");
        } else {
          alert("Registration failed");
        }
      });
  }

  return (
    <div className='register-background'>
      <div className='register-container'>
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className='user-form'>
            <div className='user-fullname'>
              <div className='user-inputs'>
                <label htmlFor="fname:">First Name:</label>
                <input type="text" name="f_name" id="" onChange={onhandleRegister}/>
              </div>
              <div className='user-inputs'>
                <label htmlFor="lname:">Last Name:</label>
                <input type="text" name="l_name" id="" onChange={onhandleRegister}/>
              </div>
            </div>
            <div className='user-inputs'>
              <label htmlFor="Email:">Email:</label>
              <input type="text" name="email" id="" placeholder='test@email.com' onChange={onhandleRegister}/>
            </div>
            <div className='user-inputs'>
              <label htmlFor="Phone:">Phone:</label>
              <input type="text" name="phone" id="" placeholder='####-###-####' onChange={onhandleRegister}/>
            </div>
            <div className='user-inputs'>
              <label htmlFor="Password:">Password:</label>
              <input type="password" name="password" id="" placeholder='' onChange={onhandleRegister}/>
            </div>
            <div className='user-inputs'>
              <label htmlFor="Confirm Password:">Confirm Password:</label>
              <input type="password" name="confirmPassword" id="" placeholder='' onChange={onhandleRegister}/>
            </div>
            <div className="role-selection">
              <div className={`role-option ${selected === "client" ? "selected" : ""}`} onClick={() => handleClick("client")}>
                <span>CLIENT</span>
              </div>
              <div className={`role-option ${selected === "worker" ? "selected" : ""}`} onClick={() => handleClick("worker")}>
                <span>WORKER</span>
              </div>
            </div>
          </div>
          <div className='terms'>
            <input type="checkbox" required />
            <label>
              I agree with the <span onClick={handleShowTerms} className='terms-label'>Terms and Conditions</span>
            </label>
          </div>
          <div className='register-footer'>
            <button className='signup-btn' type="submit">Sign Up</button>
            <span style={{ marginTop: "10px" }}>Already have an Account? <Link to='/'>Login Here</Link></span>
          </div>
        </form>
      </div>

      {showTerms && (
        <div className='terms-and-conditions'>
          <div className="terms-header">
            <button onClick={handleCloseTerms}>X</button>
          </div>
          <div className='terms-content'>
            <h6>Terms and Conditions</h6>
            <span>FIXR is a trusted platform designed to connect homeowners with skilled and professional service providers, offering a seamless solution for all your home maintenance and repair needs. Whether you're looking for a plumber, electrician, cleaner, or handyman, FIXR provides a user-friendly interface that allows you to quickly find and hire the right professional near you. With transparent booking and a commitment to quality, FIXR ensures that your home services are handled efficiently and reliably, giving you peace of mind every time.</span>
            <br />
            <br />
            <span>At FIXR, we prioritize customer satisfaction by carefully vetting our service providers to ensure they meet high standards of expertise and professionalism. We also offer comprehensive support throughout the entire process, from booking to service completion, and provide dispute resolution to ensure smooth and stress-free experiences. Whether you're tackling a big home renovation or need quick repairs, FIXR is here to make sure your home gets the attention and care it deserves.</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;