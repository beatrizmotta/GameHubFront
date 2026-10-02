import * as z from "zod";

export const LoginForm = z.object({
  email: z.email("Valor deve ser um e-mail").nonempty("Preencha este campo."),
  password: z.string().nonempty("Preencha este campo."),
});

export type loginUserFormData = z.infer<typeof LoginForm>;
