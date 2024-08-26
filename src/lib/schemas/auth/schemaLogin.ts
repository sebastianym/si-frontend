import { z } from "zod";

const identifierSchema = z.string().min(3, { message: "El identificador debe tener por lo menos 3 caracteres" })
  .max(20, { message: "El identificador debe tener como maximo 20 caracteres" })
  .or(z.string().email({ message: "Ingresa una dirección valida de email" }));

export const schemaLogin = z.object({
	identifier: identifierSchema,
	password: z.string().min(6, { message: "La contraseña debe tener por lo menos 6 caracteres" })
	  .max(100, { message: "La contraseña debe tener entre 6 y 100 caracteres" }),
  });