"use client"

import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import { useRouter } from "next/navigation";


const SignUp = () => {

  const router = useRouter();

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
                  className={styles.input}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>
          
        </div>

        <div className={styles.contFooter}>
            <div className={styles.signInBTN}>
                <span>Sign up</span>
                <span>hello</span>
                <span>123
                </span>
            </div>
            <span onClick={()=> router.push('./Login') }>Already Have An Account?  <span className={styles.createAcc}>Sign In</span></span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
