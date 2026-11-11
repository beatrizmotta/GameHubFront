import type {
  GameMessage,
  GameMessageType,
} from "../../../api/models/game-message-type.model";

export type GameMessageHandler<T extends GameMessageType> = Record<
  T,
  (message: GameMessage) => void
>;
