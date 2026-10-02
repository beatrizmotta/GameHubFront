import * as z from "zod";

export const ForgotPasswordForm = z.object({
  email: z.email("Valor deve ser um e-mail").nonempty("Preencha este campo."),
});

export type forgotPasswordFormData = z.infer<typeof ForgotPasswordForm>;
