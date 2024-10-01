
import React from "react";
import Styles from "./page.module.scss"
import Icon from "../Components/Icon/Icon";
import Button from "../Components/Button/Button";
import Input from "../Components/Input/input";
import axios from "axios";
import { cookies } from "next/headers";
import { setCookie } from "../helper/cookie";
import { useRouter } from "next/navigation";

export default function SignUp () {
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
                                <Input type="email" mode={"white"} state={"neutral"} />
                            </div>
                            <div className={Styles.textinput}>
                                <span>Password</span>
                                <Input type="password" mode={"white"} state={"neutral"} />
                            </div>
                            <div className={Styles.textinput}>
                                <span>Verify Password</span>
                                <Input type="password" mode={"white"} state={"neutral"} />
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
          </form>
        </div>
      </div>
    </div>
  );
}

interface FormInputProps {
  label: string;
  type: string;
  register: any;
  error?: { message?: string };
}

function FormInput({ label, type, register, error }: FormInputProps) {
  return (
    <div className={Styles.textinput}>
      <span>{label}</span>
      <Input type={type} mode="white" state="neutral" {...register} />
      {error && <p className={Styles.error}>{error.message}</p>}
    </div>
  );
}
