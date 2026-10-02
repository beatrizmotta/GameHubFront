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

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import AuthService from "../../api/services/auth.service";

import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { RiErrorWarningLine, RiMailCheckLine } from "@remixicon/react";
import {
  ChangePasswordForm,
  type changePasswordFormData,
} from "./change-password.schema";
import type { ChangePasswordRequest } from "../../api/models/password.model";
import { useParams } from "react-router";
import { PasswordInput } from "../../components/password-input/PasswordInput";

const SuccessAlert = () => {
  return (
    <Alert className="mb-3 bg-green-50">
      <RiMailCheckLine />
      <AlertTitle>Cheque seu e-mail!</AlertTitle>
      <AlertDescription>
        Enviamos um e-mail para você no endereço solicitado com instruções para
        mudar a sua senha.
      </AlertDescription>
    </Alert>
  );
};

const ErrorAlert = () => {
  return (
    <Alert className="mb-3" variant="destructive">
      <RiErrorWarningLine />
      <AlertTitle>Houve algo de errado</AlertTitle>
      <AlertDescription>
        Não conseguimos enivar o e-mail para você. Entre em contato conosco{" "}
        <a href="mailto:mbeamotta@gmail.com">via e-mail</a>.
      </AlertDescription>
    </Alert>
  );
};

export const ChangePassword = () => {
  const { resetToken } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<changePasswordFormData>({
    resolver: zodResolver(ChangePasswordForm),
  });

  const changePasswordMutation = useMutation({
    mutationFn: (request: ChangePasswordRequest) =>
      AuthService.changePassword(request),
  });

  const onSubmit = (data: changePasswordFormData) => {
    changePasswordMutation.mutate({
      resetToken: resetToken!,
      newPassword: data.password,
    });
  };

  return (
    <div className="bg-blue-100 flex justify-center h-full items-center">
      <Card className="w-[90%] md:w-[50%] max-w-225 h-fit">
        <CardHeader>
          <CardTitle>Insira sua nova senha</CardTitle>
          <CardDescription>
            Insira seu e-mail e sua nova senha para que possamos trocar.
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
                <FieldLabel htmlFor="password">Nova senha</FieldLabel>
                <PasswordInput id="password" {...register("password")} />
                {errors.email && <span>{errors.password?.message}</span>}
              </Field>
              <Field>
                <FieldLabel htmlFor="passwordConfirm">
                  Repita a senha
                </FieldLabel>
                <PasswordInput
                  id="passwordConfirm"
                  {...register("passwordConfirm")}
                />
                {errors.email && <span>{errors.passwordConfirm?.message}</span>}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex-col justify-center">
          {changePasswordMutation.isSuccess && <SuccessAlert />}
          {changePasswordMutation.isError && <ErrorAlert />}
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={
              changePasswordMutation.isSuccess ||
              changePasswordMutation.isPending
            }
          >
            Requisitar troca de senha
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
