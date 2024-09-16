"use client"
import React, { useEffect, useState } from "react";
import Styles from "./page.module.scss"
import Icon from "../Components/Icon/Icon";
import Button from "../Components/Button/Button";
import Input from "../Components/Input/input";
import axios from "axios";
import { cookies } from "next/headers";
import { setCookie } from "../helper/cookie";
import { useRouter } from "next/navigation";

export default function SignUp () {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    const emailChage = (e:any) => {
        setEmail(e.target.value)
    }

    const passwordChange = (e:any) => {
        setPassword(e.target.value)
    }
    

    const confPasswordChange = (e:any) => {
        setConfPassword(e.target.value)
    }
    

    const regsiterUser = () => {
        axios.post("https://music-back-1s59.onrender.com/users",{
            name:'anonymos',
            email:email,
            password:password,
            confirmPassword:confPassword
        })
        .then((data) => {
            setCookie("userToken",data.data.token,60)
            router.replace("http://localhost:3000")
        })
        .catch(() => {
            console.log('s');
            
        })
    }
 
    
    return(
        <>
        <div className={Styles.main}> 
            <img className={Styles.image}
                src="./icons/SignupImg.png"
                height="469px"
                width="559px" 
            />
            <div className={Styles.border}>
                <div className={Styles.signup}>
                    <h1 className={Styles.h1}>Sign Up</h1>
                    <span className={Styles.provide}>Provide your name, email, and create a secure password.</span>
                        <div className={Styles.inputs}>
                            <div className={Styles.textinput}>
                                <span>Email</span>
                                <Input oncahnge={emailChage} type="email" mode={"white"} state={"neutral"} />
                            </div>
                            <div className={Styles.textinput}>
                                <span>Password</span>
                                <Input  oncahnge={passwordChange} type="password" mode={"white"} state={"neutral"} />
                            </div>
                            <div className={Styles.textinput}>
                                <span>Verify Password</span>
                                <Input  oncahnge={confPasswordChange} type="password" mode={"white"} state={"neutral"} />
                            </div>
                            <div >
                                <Button click={regsiterUser} text={"Sign Up"} width={"343px"} backgroundColor={"#FF5F5F"} borderRadius={"8px"} textColor={"#FFFFFF"} border={"none"} height={"48px"}></Button>
                            </div>
                            <div className="footer">
                            <span className={Styles.foottext}>Already Have An Account? </span> <span className={Styles.footred}>Sign In</span>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        </>
    )
    
}








