"use client"
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Styles from "./page.module.scss";
import Button from "../Components/Button/Button";
import Input from "../Components/Input/input";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("http://localhost:3000/signup", data);
      const parsedData = JSON.parse(JSON.stringify(response.data));
      console.log(parsedData);
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  return (
    <div className={Styles.main}>
      <img
        className={Styles.image}
        src="./icons/SignupImg.png"
        height="469px"
        width="559px"
        alt="Sign up illustration"
      />
      <div className={Styles.border}>
        <div className={Styles.signup}>
          <h1 className={Styles.h1}>Sign Up</h1>
          <span className={Styles.provide}>
            Provide your name, email, and create a secure password.
          </span>
          <form onSubmit={handleSubmit(onSubmit)} className={Styles.inputs}>
            <FormInput
              label="Email"
              type="email"
              register={register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              error={errors.email}
            />

            <FormInput
              label="Password"
              type="password"
              register={register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={errors.password}
            />

            <FormInput
              label="Verify Password"
              type="password"
              register={register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              error={errors.confirmPassword}
            />

            <Button
              text="Sign Up"
              width="343px"
              backgroundColor="#FF5F5F"
              borderRadius="8px"
              textColor="#FFFFFF"
              border="none"
              height="48px"
            />

            <div className="footer">
              <span className={Styles.foottext}>Already Have An Account? </span>
              <span className={Styles.footred}>Sign In</span>
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
