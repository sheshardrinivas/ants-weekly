import { NextResponse } from "next/server";
import argon2 from "argon2";
import { supabase } from "@/app/lib/supabase";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    //inputs;
    const { username, password } = await request.json();

    const { data, error } = await supabase
      .from("user_auth")
      .select("password")
      .eq("name", username)
      .single();

    if (error || !data) {
      return NextResponse.json({ auth: false }, { status: 401 });
    }
    const isValid = await argon2.verify(data.password, password);
    const isAdmin = await supabase
      .from("roles")
      .select("role")
      .eq("name", username)
      .single();
    const cookieStore = await cookies();
    if (isValid) {
      if (isAdmin.data?.role === "admin") {
        cookieStore.set("admin_session", "logged-in", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
        });
      } else {
        cookieStore.set("session", "logged-in", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
        });
      }
    }

    return NextResponse.json({ auth: isValid });
  } catch {
    return NextResponse.json({ auth: false }, { status: 500 });
  }
}
