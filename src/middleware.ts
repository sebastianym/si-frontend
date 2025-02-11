import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  // Si el usuario intenta acceder a cualquier ruta del dashboard y no está autenticado, redirige a iniciar sesión.
  if (currentPath.startsWith("/dashboard") && user.ok === false) {
    return NextResponse.redirect(new URL("/iniciar-sesion", request.url));
  }

  // Si el usuario ya está autenticado, evita que acceda a iniciar sesión o registrarse.
  if (currentPath.startsWith("/iniciar-sesion") && user.ok === true) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (currentPath.startsWith("/registrarse") && user.ok === true) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Si el usuario está autenticado, verifica las restricciones de rol para ciertas rutas del dashboard.
  // if (user.ok === true) {
  //   // Se asume que el rol del usuario viene en user.data.rol
  //   const userRole = user.data.role.name;
    
  //   if (currentPath.startsWith("/dashboardAdmin/recursos") && userRole !== "Empleado") {
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }

  //   if (currentPath.startsWith("/dashboardAdmin/reservaciones") && userRole !== "Empleado") {
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }

  //   // /dashboard/mis-reservaciones -> solo Usuario
  //   if (currentPath.startsWith("/dashboard/mis-reservaciones") && userRole !== "Usuario") {
  //     return NextResponse.redirect(new URL("/dashboardAdmin", request.url));
  //   }

  //   // /dashboard/reservar -> solo Usuario
  //   if (currentPath.startsWith("/dashboard") && userRole !== "Usuario") {
  //     return NextResponse.redirect(new URL("/dashboardAdmin", request.url));
  //   }
  // }

  return NextResponse.next();
}
