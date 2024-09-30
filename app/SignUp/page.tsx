"use client"

import React, { useEffect, useState } from "react";
import styles from "./SignUp.module.scss";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setCookie } from "@/helper/cookie";


const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPass, setConfPass] = useState('')
  const [username,setUsername] = useState('')

  const router = useRouter();

  const emailchange =(e:any) => {
    setEmail(e.target.value)
  }

  const passwordChange =(e:any) => {
    setPassword(e.target.value)
  }

  const ConfChnage =(e:any) => {
    setConfPass(e.target.value)
  }

  const usernameChnage =(e:any) =>{
    setUsername(e.target.value)
  }


  const sendinfo = () => {
    axios.post("https://music-back-1s59.onrender.com/users",{
      name:username,
      email:email,
      password:password,
      confirmPassowrd:confPass
    })
    .then((data) => {
      setCookie("userToken",data.data.token,60)
      setCookie("isAdmin",data.data.forToken.role,60)
      router.replace("http://localhost:3000")
    })
    .catch(() => {
      console.log('error')
    })
  }

  return (
    <div className={styles.login}>
      <div>
        <img src="./Images/Login.png" alt="" />
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.contHeader}>
          <h1>Log In to Your Account</h1>
          <span>Enter The email and password you used to register</span>
        </div>

        <div className={styles.contBody}>
          <div className={styles.loginBody}>
          <div className={styles.emailCont}>
              <span>username</span>
              <div className={styles.infoHolder}>
                <input
                onChange={usernameChnage}
                  className={styles.input}
                  type="text"
                  placeholder="username"
                />
              </div>
            </div>
            <div className={styles.emailCont}>
              <span>Email</span>
              <div className={styles.infoHolder}>
                <input
                onChange={emailchange}
                  className={styles.input}
                  type="email"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className={styles.passCont}>
              <span>Password</span>
              <div className={styles.infoHolder}>
                <input
                onChange={passwordChange}
                  className={styles.input}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            
            <div className={styles.passCont}>
              <span>Verify Password</span>
              <div className={styles.infoHolder}>
                <input
                onChange={ConfChnage}
                  className={styles.input}
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
          </div>
          
        </div>

        <div className={styles.contFooter}>
            <button onClick={sendinfo} className={styles.signInBTN}>Sign up</button>
            <span onClick={()=> router.push('./Login') }>Already Have An Account?  <span className={styles.createAcc}>Sign In</span></span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
