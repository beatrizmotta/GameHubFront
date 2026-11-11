import { Navigate, useNavigate, useParams } from "react-router";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import RoomService from "../../api/services/room.service";
import { useState } from "react";
import { Label } from "../../components/ui/label";
import { Field, FieldError, FieldGroup } from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { RoomType } from "../../api/models/room.model";
import { PasswordInput } from "../../components/password-input/PasswordInput";
import { Button } from "../../components/ui/button";
import { saveCurrentPlayer } from "../../utils/player.utils";

export const WaitingRoom = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { data: roomType } = useQuery({
    queryKey: ["roomType", id],
    queryFn: () => RoomService.getRoomType(id!),
    enabled: !!id,
    select: (data) => {
      return data.data;
    },
  });

  const joinRoomMutation = useMutation({
    mutationFn: (id: string) =>
      RoomService.registerMeInRoom(id, {
        name: username,
        password: password,
      }),
    onSuccess: (data) => {
      saveCurrentPlayer(data.data);
      navigate(`../${id}`);
    },
  });

  if (!id) {
    return <Navigate to="/" />;
  }

  const joinRoom = () => {
    joinRoomMutation.mutateAsync(id);
  };

  return (
    <div className="bg-blue-100 h-full flex flex-col items-center">
      <Card className="w-[90%] mt-15">
        <CardHeader>
          <CardTitle className="text-2xl">Entrar</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <Label>Nome de usuário</Label>
              <Input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Field>
            {roomType === RoomType.PRIVATE && (
              <Field>
                <Label>Senha da sala</Label>
                <PasswordInput onChange={(e) => setPassword(e.target.value)} />
              </Field>
            )}
            <FieldError
              errors={[
                joinRoomMutation.error
                  ? { message: "Não foi possível logar!" }
                  : undefined,
              ]}
            ></FieldError>
          </FieldGroup>
          <CardFooter>
            <CardAction>
              <Button disabled={joinRoomMutation.isPending} onClick={joinRoom}>
                Entrar na sala
              </Button>
            </CardAction>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};
