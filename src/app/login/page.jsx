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
  });
  const [errors, setErrors] = useState("");
  const router = useRouter(); // Initialize useRouter
  const { logIn } = useUserAuth();

  function handleInput(event) {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setErrors(""); // Clear previous errors
    try {
      await logIn(values.email, values.password); // Attempt to sign up the user
      router.push("/home");
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
          <div className="flex flex-col lg:w-2/4 lg:h-2/4 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            {errors && (
              <span className="text-red-500 text-center mt-6">{errors}</span>
            )}

            <h1 className="text-4xl font-bold px-12 pt-12 pb-4">Log in</h1>
            <div className="flex flex-col px-12 pb-12 space-y-6">
              <input
                type="text"
                placeholder="Username"
                name="email"
                className="border-2 p-4"
                onChange={handleInput}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border-2 p-4 "
                onChange={handleInput}
              />

              <button
                className="bg-blue-300  p-4 text-white font-bold "
                onClick={handleSubmit}
              >
                Log in
              </button>
              <Link href="/signup" className="text-center">
                or, Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
