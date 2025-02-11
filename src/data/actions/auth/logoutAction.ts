"use server"

import { config } from "@/lib/config/auth/cookieConfig";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
	cookies().set("jwt", "", { ...config, maxAge: 0 });
	redirect("/iniciar-sesion");
  }