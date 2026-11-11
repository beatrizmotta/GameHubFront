import { useRef, useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { cn } from "cn";
import { Field, FieldGroup } from "../../../components/ui/field";
import { PasswordInput } from "../../../components/password-input/PasswordInput";
import { useMutation } from "@tanstack/react-query";
import RoomService from "../../../api/services/room.service";
import type { CreateRoomRequest } from "../../../api/models/room.model";
import { useNavigate } from "react-router";
import { saveCurrentPlayer } from "../../../utils/player.utils";
import { Input } from "../../../components/ui/input";

interface OptionProps {
  title: string;
  value: string;
  description: string;
  selected: boolean;
}
const Option = (props: OptionProps) => {
  return (
    <>
      <RadioGroupItem
        className={"hidden"}
        value={props.value}
        id={props.value}
      />
      <Label
        htmlFor={props.value}
        className={"hover:cursor-pointer w-full hover:bg-[]"}
      >
        <Card
          className={cn(
            "w-full",
            props.selected && "outline-2 outline-solid outline-blue-300",
          )}
        >
          <CardHeader>
            <CardTitle className="text-center">{props.title}</CardTitle>
          </CardHeader>
          <CardContent className="font-normal">{props.description}</CardContent>
        </Card>
      </Label>
    </>
  );
};

type RoomType = "private" | "public";
type CreateRoomState = "type_selection" | "password_definition";

export const CreateRoomDialog = () => {
  const [roomType, setRoomType] = useState<RoomType | null>(null);
  const [username, setUsername] = useState("");

  const [createRoomState, setCreateRoomState] =
    useState<CreateRoomState>("type_selection");

  const navigate = useNavigate();

  const createRoomMutation = useMutation({
    mutationFn: (request: CreateRoomRequest) => RoomService.create(request),
    onSuccess: (response) => {
      const { roomId, playerId } = response.data;
      saveCurrentPlayer(playerId);
      navigate(`/room/${roomId}`);
    },
  });

  const passwordInput = useRef<HTMLInputElement>(null);

  const getPassword = () => {
    if (!passwordInput.current) return null;

    const password = passwordInput.current.value;
    return password;
  };

  const createRoom = () => {
    const password = getPassword();

    localStorage.setItem("name", username);

    createRoomMutation.mutateAsync({
      password,
      playerName: username,
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className={"text-center"}>Criar sala</DialogTitle>
        {createRoomState === "type_selection" ? (
          <RadioGroup
            onChange={(e) => {
              const input = e.target as HTMLInputElement;
              setRoomType(input.value as RoomType);
            }}
          >
            <Option
              title={"Sala privada"}
              value={"private"}
              description={"Apenas pessoas com a senha podem entrar"}
              selected={"private" === roomType}
            />
            <Option
              title={"Sala pública"}
              value={"public"}
              description={"Qualquer pessoa com o link pode entrar"}
              selected={"public" === roomType}
            />
          </RadioGroup>
        ) : (
          <div>
            <FieldGroup>
              <Field>
                <Label>Nome de usuário</Label>
                <Input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Field>
              <Field>
                <Label>Senha</Label>
                <PasswordInput
                  ref={passwordInput}
                  id="password"
                  placeholder="Escolha sua senha"
                />
              </Field>
            </FieldGroup>
          </div>
        )}
      </DialogHeader>
      <DialogFooter>
        <Button
          onClick={() => {
            if (
              createRoomState === "type_selection" &&
              roomType === "private"
            ) {
              setCreateRoomState("password_definition");
            } else {
              createRoom();
            }
          }}
          disabled={!roomType}
          className={"w-full"}
        >
          Criar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
