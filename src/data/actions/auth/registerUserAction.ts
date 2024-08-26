"use server";

import { registerUserService } from "@/data/services/auth/registerUserService";
import { config } from "@/lib/config/auth/cookieConfig";
import { schemaRegister } from "@/lib/schemas/auth/schemaRegister";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
			message: "Falta completar campos. No se pudo registrar.",
		};
	}

	const responseData = await registerUserService(validatedFields.data);

	if (!responseData) {
		return {
			...prevState,
			strapiErrors: null,
			zodErrors: null,
			message: "Ocurrió un error. Por favor, intenta de nuevo.",
		};
	}

	if (responseData.error) {
		return {
			...prevState,
			strapiErrors: responseData.error,
			zodErrors: null,
			message: "Error al registrar.",
		};
	}

	cookies().set("jwt", responseData.jwt, config);
	redirect("/dashboard");
}