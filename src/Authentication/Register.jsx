import "../css/register.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
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
    const register = {
      f_name: e.target.f_name.value,
      l_name: e.target.l_name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };
    axios
      .post("http://localhost/FIXR/API/Authentication/register.php", register, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if(res.status === 200){
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
          alert("Email already exist");
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
            <input type="text" name="f_name" id="" placeholder='Surname, FirstName' onChange={onhandleRegister}/>
            </div>
            <div className='user-inputs'>
            <label htmlFor="lname:">Last Name:</label>
            <input type="text" name="l_name" id="" placeholder='Surname, FirstName' onChange={onhandleRegister}/>
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
        </div>
            <div className='terms'>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">I agree with the <a href="">Terms and Conditions</a></label>
            </div>
            <div className='register-footer'>
            <button className='signup-btn'>Sign Up</button>
            
            <span style={{marginTop:"10px"}}>Already have an Account? <Link to='/'>Login Here</Link></span>
            </div>
            </form>
    </div>  

    </div>
  );
}

export default Register;
