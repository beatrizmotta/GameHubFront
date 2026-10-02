import * as z from "zod";

export const RegisterForm = z
  .object({
    username: z.string().nonempty("Preencha este camopo."),
    email: z.email("Valor deve ser um e-mail").nonempty("Preencha este campo."),
    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres.")
      .nonempty("Preencha este campo."),
    passwordConfirm: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres.")
      .nonempty("Preencha este campo."),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    { error: "As senhas devem coincidir.", path: ["passwordConfirm"] },
  );

export type registerUserFormData = z.infer<typeof RegisterForm>;
