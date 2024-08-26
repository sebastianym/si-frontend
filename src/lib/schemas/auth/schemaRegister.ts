import { z } from "zod";

export const schemaRegister = z.object({
	firstName: z.string().min(3, { message: "Los nombres deben tener entre 3 y 50 caracteres" }).max(50),
	lastName: z.string().min(3, { message: "Los apellidos deben tener entre 3 y 50 caracteres" }).max(50),
	username: z.string().min(3, { message: "Usuario debe tener entre 3 y 20 caracteres" }).max(20),
	password: z.string().min(6, { message: "Contraseña debe tener entre 6 y 100 caracteres" }).max(100),
	email: z.string().email({ message: "Ingresa un correo electrónico válido" }),
});
