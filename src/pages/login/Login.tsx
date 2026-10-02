import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "../../components/ui/card";
import { Field, FieldGroup, FieldLabel } from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { LoginForm, type loginUserFormData } from "./login.schema";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { PasswordInput } from "../../components/password-input/PasswordInput";
import { Button } from "../../components/ui/button";
import type { LoginRequest } from "../../api/models/login.model";
import AuthService from "../../api/services/auth.service";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserFormData>({
    resolver: zodResolver(LoginForm),
  });

  const loginMutation = useMutation({
    mutationFn: (request: LoginRequest) => AuthService.login(request),
  });

  const onSubmit = (data: loginUserFormData) => {
    loginMutation.mutate({
      password: data.password,
      email: data.email,
    });
  };

  return (
    <div className="bg-blue-100 flex justify-center h-full items-center">
      <Card className="w-[90%] md:w-[50%] max-w-225 h-fit">
        <CardHeader>
          <CardTitle>Logue</CardTitle>
          <CardDescription>
            Insira seus dados para entrar na sua conta no GameHub.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input type="email" id="email" {...register("email")} />
                {errors.email && <span>{errors.email.message}</span>}
              </Field>
              <Field>
                <FieldLabel htmlFor="newPassword">Senha</FieldLabel>
                <PasswordInput id="newPassword" {...register("password")} />
                {errors.password && <span>{errors.password.message}</span>}
                <a href="forgot-password" className="hover:underline text-start">Esqueci minha senha</a>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex-col justify-center">
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={loginMutation.isSuccess || loginMutation.isPending}
          >
            Login 
          </Button>
          <a href="/register" className="hover:underline">
            Ainda não tem uma conta? Se inscreva aqui
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};
