"use server";

import { z } from "zod";
import { loginUserService, registerUserService } from "../services/auth-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const config = {
	maxAge: 60 * 60 * 24 * 7, // 1 week
	path: "/",
	domain: process.env.HOST ?? "localhost",
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
};

const schemaRegister = z.object({
	firstName: z.string().min(3, { message: "Los nombres deben tener entre 3 y 50 caracteres" }).max(50),
	lastName: z.string().min(3, { message: "Los apellidos deben tener entre 3 y 50 caracteres" }).max(50),
	username: z.string().min(3, { message: "Usuario debe tener entre 3 y 20 caracteres" }).max(20),
	password: z.string().min(6, { message: "Contraseña debe tener entre 6 y 100 caracteres" }).max(100),
	email: z.string().email({ message: "Ingresa un correo electrónico válido" }),
});

export async function registerUserAction(prevState: any, formData: FormData) {
	const validatedFields = schemaRegister.safeParse({
		firstName: formData.get("firstName") as string,
		lastName: formData.get("lastName") as string,
		username: formData.get("username") as string,
		password: formData.get("password") as string,
		email: formData.get("email") as string,
	});

	if (!validatedFields.success) {
		return {
			...prevState,
			zodErrors: validatedFields.error.flatten().fieldErrors,
			strapiErrors: null,
			message: "Missing Fields. Failed to Register.",
		};
	}

	const responseData = await registerUserService(validatedFields.data);

	if (!responseData) {
		return {
			...prevState,
			strapiErrors: null,
			zodErrors: null,
			message: "Ops! Something went wrong. Please try again.",
		};
	}

	if (responseData.error) {
		return {
			...prevState,
			strapiErrors: responseData.error,
			zodErrors: null,
			message: "Failed to Register.",
		};
	}

	cookies().set("jwt", responseData.jwt, config);
	redirect("/dashboard");
}

const identifierSchema = z.string().min(3, { message: "Identifier must have at least 3 or more characters" })
  .max(20, { message: "Identifier must be between 3 and 20 characters" })
  .or(z.string().email({ message: "Please enter a valid email address" }));

  const schemaLogin = z.object({
	identifier: identifierSchema,
	password: z.string().min(6, { message: "Password must have at least 6 or more characters" })
	  .max(100, { message: "Password must be between 6 and 100 characters" }),
  });

export async function loginUserAction(prevState: any, formData: FormData) {

	const validatedFields = schemaLogin.safeParse({
	  identifier: formData.get("identifier"),
	  password: formData.get("password"),
	});
  
	if (!validatedFields.success) {
	  return {
		...prevState,
		zodErrors: validatedFields.error.flatten().fieldErrors,
		message: "Missing Fields. Failed to Login.",
	  };
	}
  
	const responseData = await loginUserService(validatedFields.data);

	console.log("responseData", responseData);
  
	if (!responseData) {
	  return {
		...prevState,
		strapiErrors: responseData.error,
		zodErrors: null,
		message: "Ops! Something went wrong. Please try again.",
	  };
	}
  
	if (responseData.error) {
	  return {
		...prevState,
		strapiErrors: responseData.error,
		zodErrors: null,
		message: "Failed to Login.",
	  };
	}
  
	cookies().set("jwt", responseData.jwt, config);
  
	redirect("/dashboard");
  }

  export async function logoutAction() {
	cookies().set("jwt", "", { ...config, maxAge: 0 });
	redirect("/");
  }