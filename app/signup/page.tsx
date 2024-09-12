
import React from "react";
import Styles from "./page.module.scss"
import Icon from "../Components/Icon/Icon";
import Button from "../Components/Button/Button";

export default function SignUp () {
    return(
        <>
        <div className={Styles.main}> 
            <img
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
                                <input type="email" />
                            </div>
                            <div className={Styles.textinput}>
                                <span>Password</span>
                                <input type="password" />
                            </div>
                            <div className={Styles.textinput}>
                                <span>Verify Password</span>
                                <input type="password" />
                            </div>
                            <div >
                                <Button text={"Sign Up"} width={"343px"} backgroundColor={"#FF5F5F"} borderRadius={"8px"} textColor={"#FFFFFF"} border={"none"} height={"48px"}></Button>
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








