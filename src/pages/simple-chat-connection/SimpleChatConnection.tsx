import { Button } from "../../components/ui/button";
import { Field } from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import useUser from "../../stores/useUserStore";
import { ProtectedRoute } from "../protected-route/ProtectedRoute";
import { useState } from "react";
import { Textarea } from "../../components/ui/textarea";
import { Client } from "@stomp/stompjs";
import { EScreenState } from "../chat/types";

interface ChatMessage {
  username: string;
  message: string;
}

interface SimpleChatConnectionProps {
  clientConnection: React.RefObject<Client | null>;
  screenState: EScreenState;
}
export const SimpleChatConnection = ({
  clientConnection,
  screenState,
}: SimpleChatConnectionProps) => {
  const { user } = useUser();

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const [messages] = useState<ChatMessage[]>([]);

  const sendMessageToTopic = (message: ChatMessage) => {
    const client = clientConnection.current;
    if (!client) return;

    client.publish({
      destination: "/app/topic",
      body: JSON.stringify(message),
    });
  };

  const connectAsync = async () => {
    try {
      console.log(import.meta.env.BASE_URL);
      const client = clientConnection.current;
      if (!client) return;
      void client.activate();
    } catch {
      //
    }
  };

  if (screenState === EScreenState.START) {
    return (
      <ProtectedRoute user={user}>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            connectAsync();
          }}
        >
          <Field>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              placeholder="Seu nomeee"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Field>
          <Button disabled={!username} type="submit">
            Conectar
          </Button>
        </form>
      </ProtectedRoute>
    );
  } else {
    return (
      <ProtectedRoute user={user}>
        <div>
          <div className="text-start">
            <b>Status</b>: conectado
          </div>
          <div className="text-start max-h-100 overflow-scroll overflow-x-hidden">
            {messages.map((msg) => {
              return (
                <div className="my-5">
                  <b>{msg.username}: </b> {msg.message}
                </div>
              );
            })}
          </div>
          <form
            className="mt-5"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessageToTopic({
                username,
                message,
              });
            }}
          >
            <Textarea
              onChange={(element) => {
                setMessage(element.target.value);
              }}
              className="h-20 resize-none"
              placeholder="Escreva sua mensagem aqui"
            />
            <Button disabled={!message} type="submit">
              Enviar
            </Button>
          </form>
        </div>
      </ProtectedRoute>
    );
  }
};
