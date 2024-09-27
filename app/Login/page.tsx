"use client"
import React, { useState } from "react";
import styles from "./Login.module.scss";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setCookie } from "@/helper/cookie";

type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

    const router = useRouter();

    const changeEmail = (e:any) => {
      setEmail(e.target.value)
    }
    const changePassword = (e:any) => {
      setPassword(e.target.value)
    }

    const authUser = () => {
      axios.post("https://music-back-1s59.onrender.com/auth",{
        email:email,
        password:password
      })
      .then((data) => {
       setCookie("userToken",data.data.token,60)
       localStorage.setItem("token",data.data.token)
       router.replace("http://localhost:3000")
     })
     .catch(() =>{console.log('s');
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
              <span>Email</span>
              <div className={styles.infoHolder}>
                <input
                onChange={changeEmail}
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
                onChange={changePassword}
                  className={styles.input}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>
          <div className={styles.passwordOptions}>
            <div className={styles.forgetPassword}>
              <span>Forget Password</span>
            </div>
          </div>
        </div>

        <div className={styles.contFooter}>
        <button className={styles.signInBTN} onClick={authUser}>signin</button>
            <span onClick={()=> router.push('./SignUp')}>Don’t Have An Account? <span className={styles.createAcc}>Create An Account</span></span>
        </div>
      </div>
    </div>
  );
};

export default Login; 
