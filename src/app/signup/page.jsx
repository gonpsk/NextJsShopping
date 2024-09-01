"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useUserAuth } from "../context/UserAuthContext";

function page() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState("");
  const { signUp } = useUserAuth();
  const router = useRouter(); // Initialize useRouter

  function handleInput(event) {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setErrors(""); // Clear previous errors
    if (values.password !== values.confirmPassword) {
      setErrors("Passwords do not match");
      return;
    }
    try {
      await signUp(values.email, values.password); // Attempt to sign up the user
      alert("สมัครสมาชิกเสร็จสิ้น");
      router.push("/login");
    } catch (err) {
      setErrors(err.message); // Set and display the error message if something goes wrong
      console.log(err);
    }
  };

  return (
    <div>
      <div
        className="min-h-screen py-40"
        style={{ backgroundImage: "linear-gradient(115deg, #9F7AEB, #fEE2FD)" }}
      >
        <div className="container mx-auto">
          <div className="flex lg:w-8/12  bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div
              className="flex flex-col justify-center items-center w-1/2 bg-center bg-cover bg-no-repeat p-8"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
              }}
            ></div>
            <div className="w-1/2 py-12 px-16">
              <h2 className="text-3xl mb-4">Register</h2>
              {/* form start */}
              {errors && <span className="text-red-500">{errors}</span>}
              <form onSubmit={handleSubmit}>
                <div className="mt-4">
                  <input
                    type="email"
                    name="email"
                    className="border border-gray-500 py-1 px-2 w-full"
                    placeholder="Email"
                    onChange={handleInput}
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email}</span>
                  )}
                </div>
                <div className="mt-4">
                  <input
                    type="password"
                    name="password"
                    className="border border-gray-500 py-1 px-2 w-full"
                    placeholder="Password"
                    onChange={handleInput}
                  />
                  {errors.password && (
                    <span className="text-red-500">{errors.password}</span>
                  )}
                </div>
                <div className="mt-4">
                  <input
                    type="password"
                    name="confirmPassword"
                    className="border border-gray-500 py-1 px-2 w-full"
                    placeholder="Password"
                    onChange={handleInput}
                  />
                  {errors.password && (
                    <span className="text-red-500">{errors.password}</span>
                  )}
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full bg-purple-400 py-3 text-center text-white text-xl"
                  >
                    Register
                  </button>
                </div>
                <div className="mt-4 text-end text-blue-500">
                  <Link href="/login" className="underline">
                    Already have an account? Sign in
                  </Link>
                </div>
              </form>
              {/* form end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
