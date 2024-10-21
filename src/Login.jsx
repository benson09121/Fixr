
import { Link } from "react-router-dom";
import { useState } from 'react';
import './css/logincss.css'

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    
  return (
    <>
   
   <div className="login-background">

    <div className='content' >
    <div className="login-container mt-5" >
      <div>
        <h1 style={{fontSize:'40px', fontFamily:'inherit',}}><b>Login</b></h1>
      </div>

      <div className="mb-3" style={{marginTop:"5%"}}>
           <div className='user-inputs' >
            <label htmlFor="Email:">Email:</label>
            <input type="text" name="" id="" style={{height:"50px"}}/>
            </div>
            <div className='user-inputs' style={{marginTop:"20px"}}>
            <label >Password:</label>
            <input type="password" name="" id="" placeholder=''style={{height:"50px"}}/>
            </div>

      </div>

      <div className='centerItems mt-4'>
        
      </div>


      <div className='signinbuttons mt-3'> 
          <div className="col mt-3">
        <Link to="userloc"><button className='loginbtn'>Login</button> </Link> 
          </div>
      </div>

      <div className='noaccount'>
        <p>Don't have an Account?</p> 
        <Link to='register' className='register'>Register Here</Link>
      </div>
    </div>
    </div>

    </div>
    </>
  );
}

export default Login;
