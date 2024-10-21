import './css/register.css'
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Register() {
  const [selected, setSelected] = useState(""); 
    const handleClick = (option) => {
        setSelected(option);
    };

    const handleShowTerms = () => {
      setShowTerms(true);
    }

      const handleCloseTerms = () => {
        setShowTerms(false);
      }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div className='register-background'>
    <div className='register-container'>
      <h1>Sign up</h1>
     
        <div className='user-form'>
            <div className='user-fullname'>
            <div className='user-inputs'>
            <label htmlFor="fname:">First Name:</label>
            <input type="text" name="fname" id="" placeholder='Sample'/>
            </div>
            <div className='user-inputs'>
            <label htmlFor="lname:">Last Name:</label>
            <input type="text" name="lname" id="" placeholder='Sample'/>
            </div>
            </div>
            <div className='user-inputs'>
            <label htmlFor="Email:">Email:</label>
            <input type="text" name="" id="" placeholder='test@email.com'/>
            </div>
            <div className='user-inputs'>
            <label htmlFor="Phone:">Phone:</label>
            <input type="text" name="" id="" placeholder='#### ### ####'/>
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
        <div className="role-selection">
                <div className={`role-option ${selected === "client" ? "selected" : ""}`} onClick={() => handleClick("client")}>
                   <span>CLIENT</span> 
                </div>
                <div className={`role-option ${selected === "worker" ? "selected" : ""}`}onClick={() => handleClick("worker")}>
                    <span>WORKER</span>
                </div>
            </div>
            <div className='terms'>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">I agree with the <span onClick={handleShowTerms} className='terms-label '>Terms and Conditions </span></label>
            </div>
            <div className='register-footer'>
            <Link to='/userloc'>
            <button className='signup-btn'>Sign Up</button></Link>
            <span style={{marginTop:"10px"}}>Already have an Account? <Link to='/'>Login Here</Link></span>
            </div>
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
