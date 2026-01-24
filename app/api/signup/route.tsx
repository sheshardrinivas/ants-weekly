import { NextResponse } from "next/server";
import argon2 from "argon2";
import { supabase } from "@/app/lib/supabase";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const hashedPassword = await argon2.hash(password);
    const checkUser = await supabase
      .from("user_auth")
      .select("name")
      .eq("name", name)
      .single();
      const checkEmail = await supabase
          .from("user_auth")
          .select("email")
          .eq("email", email)
          .single();

    if ( checkUser||checkEmail.data) {
      return NextResponse.json({ auth: false, message: "User already exists" }, { status: 409 });
    }
    await supabase.from("user_auth").insert({
      name,
      email,
      password: hashedPassword,
    });
    return NextResponse.json({ auth: true }, { status: 200 });
  } catch {
    return NextResponse.json({ auth: false }, { status: 500 });
  }
}
