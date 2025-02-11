import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  if (!user.ok) {
    // Redirige a iniciar sesión si el usuario no está autenticado y está accediendo a una ruta protegida.
    if (currentPath.startsWith("/dashboard") || currentPath.startsWith("/dashboardAdmin")) {
      return NextResponse.redirect(new URL("/iniciar-sesion", request.url));
    }
  } else {
    const userRole = user.data.role.name;

    // Evita que usuarios autenticados accedan a /iniciar-sesion o /registrarse
    if (currentPath.startsWith("/iniciar-sesion") || currentPath.startsWith("/registrarse")) {
      if (userRole === "Usuario") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else if (userRole === "Empleado") {
        return NextResponse.redirect(new URL("/dashboardAdmin", request.url));
      }
    }

    // // Verifica restricciones de acceso por rol.
    // if (currentPath.startsWith("/dashboard") && userRole !== "Usuario") {
    //   return NextResponse.redirect(new URL("/dashboardAdmin/recursos", request.url));
    // }
  }

  return NextResponse.next();
}
