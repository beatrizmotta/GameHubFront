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
import {
  ForgotPasswordForm,
  type forgotPasswordFormData,
} from "./forgot-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import AuthService from "../../api/services/auth.service";
import type { RecoverPasswordRequest } from "../../api/models/password.model";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../components/ui/alert";
import { RiErrorWarningLine, RiMailCheckLine } from "@remixicon/react";

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
        Não conseguimos enivar o e-mail para você. Entre em contato conosco <a href="mailto:mbeamotta@gmail.com">via e-mail</a>.
      </AlertDescription>
    </Alert>
  );
};

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordForm),
  });

  const recoverPasswordMutation = useMutation({
    mutationFn: (request: RecoverPasswordRequest) =>
      AuthService.requestPasswordChangeToken(request),
  });

  const onSubmit = (data: forgotPasswordFormData) => {
    recoverPasswordMutation.mutate({
      email: data.email,
    });
  };

  return (
    <div className="bg-blue-100 flex justify-center h-full items-center">
      <Card className="w-[90%] md:w-[50%] max-w-225 h-fit">
        <CardHeader>
          <CardTitle>Recupere sua senha</CardTitle>
          <CardDescription>
            Insira seus dados que possamos entrar em contato com você via e-mail
            e você possa trocar sua senha.
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
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex-col justify-center">
          {recoverPasswordMutation.isSuccess && <SuccessAlert />}
          {recoverPasswordMutation.isError && <ErrorAlert />}
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={
              recoverPasswordMutation.isSuccess ||
              recoverPasswordMutation.isPending
            }
          >
            Requisitar troca de senha
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
