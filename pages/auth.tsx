import React from "react";
import Input from "@/Components/Input";
import axios from "axios";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const auth = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("Login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "Login" ? "Register" : "Login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        // redirect: false, //The redirect option is only available for credentials and email providers.
        callbackUrl: "/profile",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      // login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password]);

  return (
    <div className="relative h-full w-full bg bg-[url('/images/hero.jpg')]  bg-no-repeat bg-center bg-fixed bg-cover">
      <div className=" bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/Images/logo.png" alt="logo" className="h-12" />
        </nav>

        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-3xl mb-8 font-semibold">
              {/* {variant} {session ? `${session.user?.name},` : "No name"} Welcome */}{" "}
              {variant}
              {/* to NextJs */}
            </h2>
            <div className="flex  flex-col gap-4">
              {variant === "Register" && (
                <Input
                  label="Username"
                  onChange={(ev: any) => setName(ev.target.value)}
                  id="name"
                  type="text"
                  value={name}
                />
              )}

              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={email}
              />

              <Input
                label="Password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                id="email"
                type="password"
                value={password}
              />
            </div>

            <button
              onClick={variant === "Login" ? login : register}
              className="bg-red-600 py-3 text-white   rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "Login" ? "login" : "Sign up"}
            </button>

            <div className="flex gap-2 items-center justify-center">
              <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                <div
                  onClick={() => signIn("google", { callbackUrl: "/profile" })}
                  className="w-10 h-10 bg-white rounded-full flex flex-row items-center justify-center cursor-pointer hover:opacity-80
                transition"
                >
                  <FcGoogle size={30} />
                </div>
              </div>

              <div className="flex items-center gap-4 mt-8 justify-center">
                <div
                  onClick={() => signIn("github", { callbackUrl: "/profile" })}
                  className="w-10 h-10 bg-white rounded-full flex flex-row items-center justify-center cursor-pointer hover:opacity-80
                transition"
                >
                  <FaGithub size={30} />
                </div>
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "Login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "Login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default auth;
