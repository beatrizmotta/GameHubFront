import type { IMessage } from "@stomp/stompjs";
import {
  GameMessageType,
  type GameMessage,
} from "../../api/models/game-message-type.model";

export const buildRoomLink = (id: string) => {
  return (window.location, origin + "/room/join/" + id);
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isGameMessageType = (value: unknown): value is GameMessageType =>
  Object.values(GameMessageType).some((type) => type === value);

export const validateGameMessage = (message: IMessage): GameMessage => {
  if (!message.body.trim()) {
    throw new Error("Mensagem sem body");
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(message.body);
  } catch {
    throw new Error("Body da mensagem não tem JSON válido");
  }

  if (
    !isRecord(parsed) ||
    !isGameMessageType(parsed.type) ||
    !isRecord(parsed.content)
  ) {
    throw new Error("Não é GameMessage");
  }

  return {
    content: parsed.content,
    type: parsed.type,
  } as GameMessage;
};
