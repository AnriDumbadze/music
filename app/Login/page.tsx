"use client";
import React, { useState } from "react";
import styles from "./Login.module.scss";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setCookie } from "@/helper/cookie";
import Image from 'next/image';

type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to handle error messages

  const router = useRouter();

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const authUser = async () => {
    try {
      const response = await axios.post("https://music-back-1s59.onrender.com/auth", {
        email: email,
        password: password,
      });
      
      setCookie("userToken", response.data.token, 60);
      setCookie("isAdmin", response.data.forToken.role, 60);
      setCookie("lastLogin", response.data.lastLogin, 60);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.data.token);
      }
  

      // Redirect after successful login
      router.replace("http://localhost:3000");
    } catch (error) {
      setError('Login failed. Please check your email and password.'); // Set error message
      console.error('Login error:', error);
    }
  };

  return (
    <div className={styles.mainContent}>
    <div className={styles.login}>
      <div>
        <Image src="/Images/Login.png" alt="Login" width={559} height={469} className={styles.image} />
      </div>
        <div className={styles.loginContainer}>
          <div className={styles.contHeader}>
            <h1>Log In to Your Account</h1>
            <span>Enter the email and password you used to register</span>
          </div>

          {error && <p className={styles.error}>{error}</p>} {/* Display error message */}

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
            <button className={styles.signInBTN} onClick={authUser}>Sign In</button>
            <span onClick={() => router.push('./SignUp')}>
              Don’t Have An Account? <span className={styles.createAcc}>Create An Account</span>
            </span>
          </div>
        </div>
    </div>
    </div>
  );
};

export default Login;
