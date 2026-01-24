"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {supabase} from "@/app/lib/supabase";

export default function Home() {
  const router = useRouter();
  const name = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function login() {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: name.current?.value ?? "",
        password: password.current?.value ?? "",
      }),
    });
    const auth = await response.json();
    if (auth?.auth) {
        const { data, error } = await supabase
            .from("roles")
            .select("role")
            .eq("name", name.current?.value)
            .single();
        if(data?.role){
            console.log(data?.role);
            router.push("/admin/dashboard");
        }
    }
    else{
       alert("Login failed. Please check your credentials.");
    }
  }

  function createUser() {
    router.push("/signup");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-background text-white">
      <div className="w-full max-w-sm space-y-6 rounded-2xl bg-zinc-900/70 p-8 shadow-xl border border-zinc-800">
        <h1 className="text-3xl font-semibold text-center">Login</h1>

        <input
          type="text"
          ref={name}
          placeholder="Username"
          className="w-full rounded-lg bg-zinc-800 px-4 py-2 text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            ref={password}
            placeholder="Password"
            className="w-full rounded-lg bg-zinc-800 px-4 py-2 pr-12 text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-indigo-400 transition"
          >
            {showPassword ? "◉" : "◎"}
          </button>
        </div>

        <button
          onClick={login}
          className="w-full rounded-lg bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-500 transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-zinc-500">
          Don’t have an account?
        </p>

        <button
          onClick={createUser}
          className="w-full rounded-lg border border-zinc-700 py-2 text-sm text-zinc-300 hover:border-indigo-500 hover:text-indigo-400 transition"
        >
          Create account
        </button>
      </div>
    </div>
  );
}
