import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export async function middleware(request: NextRequest) {
	const user = await getUserMeLoader();
	const currentPath = request.nextUrl.pathname;

	if (currentPath.startsWith("/dashboard") && user.ok === false) {
	 	return NextResponse.redirect(new URL("/iniciar-sesion", request.url));
	}

	if (currentPath.startsWith("/iniciar-sesion") && user.ok === true) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if (currentPath.startsWith("/registrarse") && user.ok === true) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return NextResponse.next();
}