"use server";

import { loginUserService  } from "../../services/auth/loginUserService";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { config } from "@/lib/config/auth/cookieConfig";
import { schemaLogin } from "@/lib/schemas/auth/schemaLogin";


export async function loginUserAction(prevState: any, formData: FormData) {

	const validatedFields = schemaLogin.safeParse({
	  identifier: formData.get("identifier"),
	  password: formData.get("password"),
	});
  
	if (!validatedFields.success) {
	  return {
		...prevState,
		zodErrors: validatedFields.error.flatten().fieldErrors,
		message: "Faltan campos por completar. No se pudo iniciar sesión.",
	  };
	}
  
	const responseData = await loginUserService(validatedFields.data);
  
	if (!responseData) {
	  return {
		...prevState,
		strapiErrors: responseData.error,
		zodErrors: null,
		message: "Ocurrió un error. Por favor, intenta de nuevo.",
	  };
	}
  
	if (responseData.error) {
	  return {
		...prevState,
		strapiErrors: responseData.error,
		zodErrors: null,
		message: "Error al iniciar sesión.",
	  };
	}
  
	cookies().set("jwt", responseData.jwt, config);
	redirect("/dashboard");
  }
