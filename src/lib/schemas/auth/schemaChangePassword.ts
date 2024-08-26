import { z } from "zod";

export const schemaChangePassword = z.object({
	originalPassword: z.string()
	.min(6, { message: "La contraseña debe tener por lo menos 6 caracteres" })
	.max(100, { message: "La contraseña debe tener entre 6 y 100 caracteres" }),

	newPassword: z.string()
	.min(6, { message: "La contraseña debe tener por lo menos 6 caracteres" })
	.max(100, { message: "La contraseña debe tener entre 6 y 100 caracteres" }),

	confirmPassword: z.string()
	.min(6, { message: "La contraseña debe tener por lo menos 6 caracteres" })
	.max(100, { message: "La contraseña debe tener entre 6 y 100 caracteres" })
});