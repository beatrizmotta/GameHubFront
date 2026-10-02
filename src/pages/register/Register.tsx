import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useForm } from "react-hook-form";
import { FieldGroup, FieldLabel, Field } from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { RegisterForm, type registerUserFormData } from "./register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { useMutation } from "@tanstack/react-query";
import AuthService from "../../api/services/auth.service";
import type { RegisterRequest } from "../../api/models/register.models";
import { PasswordInput } from "../../components/password-input/PasswordInput";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerUserFormData>({
    resolver: zodResolver(RegisterForm),
  });

  const registerMutation = useMutation({
    mutationFn: (request: RegisterRequest) => AuthService.register(request),
  });

  const onSubmit = (data: registerUserFormData) => {
    registerMutation.mutate({
      fullName: data.username,
      password: data.password,
      email: data.email,
    });
  };

  return (
    <div className="bg-blue-100 flex justify-center h-full items-center">
      <Card className="w-[90%] md:w-[50%] max-w-225 h-fit">
        <CardHeader>
          <CardTitle>Se inscreva</CardTitle>
          <CardDescription>
            Insira seus dados para criar uma conta no GameHub.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Nome</FieldLabel>
                <Input type="text" id="username" {...register("username")} />
                {errors.username && <span>{errors.username.message}</span>}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input type="email" id="email" {...register("email")} />
                {errors.email && <span>{errors.email.message}</span>}
              </Field>
              <Field>
                <FieldLabel htmlFor="newPassword">Senha</FieldLabel>
                <PasswordInput
                  id="newPassword"
                  {...register("password")}
                />
                {errors.password && <span>{errors.password.message}</span>}
              </Field>
              <Field>
                <FieldLabel htmlFor="passwordConfirm">
                  Confirme sua senha
                </FieldLabel>
                <PasswordInput
                id="passwordConfirm"
                {...register("passwordConfirm")}
                />
                {errors.passwordConfirm && (
                  <span>{errors.passwordConfirm.message}</span>
                )}
              </Field>
            </FieldGroup>
            {registerMutation.isSuccess && (
              <Alert>
                <AlertTitle>Conta criada corretamente!</AlertTitle>
                <AlertDescription>
                  Cheque sua caixa de e-mail para verificar sua conta.
                </AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex-col justify-center">
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={registerMutation.isSuccess || registerMutation.isPending}
          >
            Se inscreva
          </Button>
          <a href="/login" className="hover:underline">
            Já tem uma conta? Logue por aqui.
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
