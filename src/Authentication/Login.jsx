
import { Link } from "react-router-dom";
import { useState } from 'react';
import '../css/logincss.css'
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["token_user"]);
    const [Login, setLogin] = useState({
        email: "",
        password: "",
    });


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
    .post("http://localhost/FIXR/API/register.php", login, {
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
    <div className='content'>
    <div className="container mt-5">
      <div>
        <h1 style={{fontSize:'40px', fontFamily:'inherit',}}><b>Login</b></h1>
      </div>
      <form onSubmit={onHandleSubmit}>
      <div className="mb-3" style={{marginTop:"5%"}}>
           <div className='user-inputs' >
            <label htmlFor="Email:">Email:</label>
            <input type="text" name="email"  placeholder='test@email.com' style={{height:"50px"}} onChange={handleLogin}/>
            </div>
            <div className='user-inputs' style={{marginTop:"20px"}}>
            <label >Password:</label>
            <input type="password" name="password" placeholder=''style={{height:"50px"}}/>
            </div>

      </div>

      <div className='centerItems mt-4'>
        
      </div>


      <div className='signinbuttons mt-3'> 
          <div className="col mt-3">
        <button className='loginbtn'>Login</button>
          </div>
      </div>
      </form>
      <div className='noaccount'>
        <p>Don't have an Account?</p> 
        <Link to='register' className='register'>Register Here</Link>
      </div>
    </div>
    </div>
  );
}

export default Login;
