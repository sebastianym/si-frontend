import { changePasswordService } from "@/data/services/auth/changePasswordService";
import { schemaChangePassword } from "@/lib/schemas/auth/schemaChangePassword";

export async function changePasswordAction(prevState: any, formData: FormData) {
	
	const validatedFields = schemaChangePassword.safeParse({
		originalPassword: formData.get("originalPassword") as string,
		newPassword: formData.get("newPassword") as string,
		confirmPassword: formData.get("confirmPassword") as string,
	});

	if (!validatedFields.success) {
		return {
			...prevState,
			zodErrors: validatedFields.error.flatten().fieldErrors,
			strapiErrors: null,
			message: "Falta completar campos. No se pudo registrar.",
		};
	}

	const responseData = await changePasswordService(validatedFields.data);

	if (!true) {
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
			message: "Error al cambiar la contraseña.",
		};
	}

}