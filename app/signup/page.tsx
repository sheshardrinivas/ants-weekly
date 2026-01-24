"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function Signup() {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
        const responseData = await response.json();
      if (responseData.auth) {
        alert("Signup successful!");
        router.push("/login");
      } else {
          alert(responseData?.message);
      }
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Signup();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-2xl bg-zinc-900/70 p-8 shadow-xl border border-zinc-800"
      >
        <h1 className="text-3xl font-semibold text-center">Create Account</h1>

        <div className="space-y-1">
          <label className="text-sm text-zinc-400">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-zinc-400">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-zinc-400">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-zinc-800 px-4 py-2 pr-12 outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-indigo-400 transition"
            >
              {showPassword ? "◉" : "◎"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 py-2 font-medium hover:bg-indigo-500 transition"
        >
          Sign up
        </button>

        <p className="text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <span
            className="text-indigo-400 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
