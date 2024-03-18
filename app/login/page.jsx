"use client";
// import LoginForm from "@/components/dash_components/fields/InputField";
import LoginForm from "@/components/LoginForm";
import Default from "@/components/dash_components/auth";
import { FcGoogle } from "react-icons/fc";
// import Checkbox from "components/checkbox";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { z } from "zod";

function SignInDefault() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();

    // .min(3, { message: "The Email should be more then 3 letters" })
    const loginSchema = z.object({
      username: z.string().min(3).email().max(50),
      password: z
        .string()
        .min(6, { message: "The Password should be more then 6 letters" })
        .max(20),
    });
    try {
      loginSchema.parse({ username, password });
      // If validation succeeds, you can proceed with form submission
      console.log("Form submitted:", { username, password });
    } catch (error) {
      console.error(error.errors);
      console.log(error.errors);
      // Handle validation errors here, e.g., update state to display error messages to the user
      setErrors(error.errors);
    }
  };

  return (
    <Default
      maincard={
        <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
          {/* Sign in section */}
          <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h3 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
              Sign In
            </h3>
            <p className="mb-9 ml-1 text-base text-gray-600">
              Enter your email and password to sign in!
            </p>
            <div
              onClick={() => {
                signIn("google");
              }}
              className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-white hover:cursor-pointer dark:bg-navy-800 dark:text-white"
            >
              <div className="rounded-full text-xl">
                <FcGoogle />
              </div>
              <p className="text-sm font-medium text-navy-700 dark:text-white">
                Sign In with Google
              </p>
            </div>
            <div className="mb-6 flex items-center  gap-3">
              <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
              <p className="text-base text-gray-600"> or </p>
              <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
            </div>
            {/* Email */}
            <LoginForm
              variant="auth"
              extra="mb-3"
              label="Email*"
              placeholder="mail@simmmple.com"
              id="email"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.length > 0 && (
              <div className="error-messages">
                {errors.map((error, index) =>
                  error.path[0] === "username" ? (
                    <p className="text-red-500" key={index}>
                      {error.message}
                    </p>
                  ) : null
                )}
              </div>
            )}
            {/* Password */}
            <LoginForm
              variant="auth"
              extra="mb-3"
              label="Password*"
              placeholder="Min. 8 characters"
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.length > 0 && (
              <div className="error-messages">
                {errors.map((error, index) =>
                  error.path[0] === "password" ? (
                    <p className="text-red-500" key={index}>
                      {error.message}
                    </p>
                  ) : null
                )}
              </div>
            )}
            {/* Checkbox */}
            <div className="mb-4 flex items-center justify-between px-2">
              <div className="mt-2 flex items-center">
                {/* <Checkbox /> */}
                <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white"></p>
              </div>
              <a
                className="text-sm font-medium text-gray-600 hover:text-brand-600 dark:text-white"
                href="/login"
              >
                Forgot Password?
              </a>
            </div>
            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className="linear w-full rounded-xl bg-[#000000] hover:bg-[#454545] py-3 text-base font-medium text-white transition duration-200 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            >
              Sign In
            </button>
            <div className="mt-4">
              <span className="text-sm font-medium text-navy-700 dark:text-gray-500">
                Not registered yet?
              </span>
              <a
                href="/login"
                className="ml-1 text-sm font-medium text-gray-600 hover:text-brand-600 dark:text-white"
              >
                Create an account
              </a>
            </div>
          </div>
        </div>
      }
    />
  );
}

export default SignInDefault;
