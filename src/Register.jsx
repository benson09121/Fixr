import './css/register.css'
import { useState } from 'react';
import { Link } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className='register-background'>
    <div className='register-container'>
      <h1>Sign up</h1>
     
        <div className='user-form'>
            <div className='user-fullname'>
            <div className='user-inputs'>
            <label htmlFor="fname:">First Name:</label>
            <input type="text" name="fname" id="" placeholder='Surname, FirstName'/>
            </div>
            <div className='user-inputs'>
            <label htmlFor="lname:">Last Name:</label>
            <input type="text" name="lname" id="" placeholder='Surname, FirstName'/>
            </div>
            </div>
            <div className='user-inputs'>
            <label htmlFor="Email:">Email:</label>
            <input type="text" name="" id="" placeholder='test@email.com'/>
            </div>
            <div className='user-inputs'>
            <label htmlFor="Phone:">Phone:</label>
            <input type="text" name="" id="" placeholder='####-###-####'/>
            </div>
            <div className='user-inputs'>
            <label htmlFor="Password:">Password:</label>
            <input type="password" name="" id="" placeholder=''/>
            </div>
            <div className='user-inputs'>
            <label htmlFor="Confirm Password:">Confirm Password:</label>
            <input type="password" name="" id="" placeholder=''/>
            </div>
        </div>
            <div className='terms'>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">I agree with the <a href="">Terms and Conditions</a></label>
            </div>
            <div className='register-footer'>
            <Link to='/userloc'>
            <button className='signup-btn'>Sign Up</button></Link>
            <span style={{marginTop:"10px"}}>Already have an Account? <Link to='/'>Login Here</Link></span>
            </div>
    </div>  

    </div>
  );
}

export default Register;
