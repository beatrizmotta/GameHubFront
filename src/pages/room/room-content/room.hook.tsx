import { useMemo, useState } from "react";
import {
  GameMessageType,
  type GameMessage,
  type GameMessagePlayerJoinedContent,
  type GameMessagePlayerLeftResponse,
  type Player,
} from "../../../api/models/game-message-type.model";
import { useWebSocket } from "../../../hooks/use-websocket";
import { GMH_USER_ID_KEY } from "../../../constants";
import { useNavigate } from "react-router";
import { validateGameMessage } from "../utils";
import type { Client, IMessage, StompHeaders } from "@stomp/stompjs";
import type { GameMessageHandler } from "./game-message";

interface useRoomProps {
  roomId: string;
  playerId: string;
}
export const useRoom = ({ playerId, roomId }: useRoomProps) => {
  const [jogadores, setJogadores] = useState<Player[]>([]);
  const [roomOwnerId, setRoomOwnerId] = useState<string>("");

  const isUserRoomChief = useMemo(() => {
    console.log(playerId, roomOwnerId);
    return playerId === roomOwnerId;
  }, [playerId, roomOwnerId]);

  const navigate = useNavigate();

  const handler: GameMessageHandler<GameMessageType> = {
    [GameMessageType.PLAYER_JOINED]: (message: GameMessage) =>
      onPlayerJoin(
        (message as GameMessage<GameMessageType.PLAYER_JOINED>)
          .content as GameMessagePlayerJoinedContent["content"],
      ),
    [GameMessageType.PLAYER_LEFT]: (message: GameMessage) => {
      onPlayerLeft(message.content as GameMessagePlayerLeftResponse["content"]);
    },
    [GameMessageType.FORBIDDEN]: function (_message: GameMessage): void {
      throw new Error("Function not implemented.");
    },
    [GameMessageType.UPDATE]: function (_message: GameMessage): void {
      throw new Error("Function not implemented.");
    },
    [GameMessageType.CURRENT_PLAYERS]: function (_message: GameMessage): void {
      throw new Error("Function not implemented.");
    },
  };

  const updatePlayersList = (players: Player[]) => {
    setJogadores(players);
  };

  const onPlayerJoin = ({
    currentPlayers,
    roomOwnerId,
  }: GameMessagePlayerJoinedContent["content"]) => {
    updatePlayersList(currentPlayers);
    setRoomOwnerId(roomOwnerId);
  };

  const onPlayerLeft = ({
    playerId: leftPlayerId,
  }: GameMessagePlayerLeftResponse["content"]) => {
    const isCurrentPlayer = playerId === leftPlayerId;

    const currentPlayers = jogadores.filter((jogador) => {
      if (jogador.id !== leftPlayerId) {
        return jogador;
      }
    });

    updatePlayersList(currentPlayers);

    if (isCurrentPlayer) {
      navigate("/dashboard");
      localStorage.removeItem(GMH_USER_ID_KEY);
    }
  };

  const leaveRoom = () => {
    const client = clientRef.current;

    if (!client) return;

    client.publish({
      destination: `/app/room/${roomId}/room-updates`,
      body: JSON.stringify({
        type: GameMessageType.PLAYER_LEFT,
        content: {
          playerId: playerId,
        },
      }),
      headers: {
        playerId: playerId as string,
      },
    });
  };

  const removeUser = () => {};

  const defaultHeaders: StompHeaders = {
    playerId: playerId || "",
  };

  const handleRoomUpdate = (message: IMessage) => {
    try {
      const gameMessage = validateGameMessage(message);

      const type = gameMessage.type;

      const handlerFn = handler[type];
      handlerFn(gameMessage);
    } catch (e) {
      console.log(e);
    }
  };

  const subscribeToRoomUpdates = (client: Client) => {
    client.subscribe(
      `/room/${roomId}/room-updates`,
      (message) => {
        handleRoomUpdate(message);
      },
      defaultHeaders,
    );
  };

  const notifyJoin = (client: Client) => {
    client.publish({
      destination: `/app/room/${roomId}/room-updates`,
      body: JSON.stringify({
        type: GameMessageType.PLAYER_JOINED,
        content: {
          playerId: playerId,
        },
      }),
      headers: defaultHeaders,
    });
  };

  const { clientRef } = useWebSocket({
    config: {
      connectHeaders: defaultHeaders,
      onWebSocketClose: (e) => {
        console.log(e);
      },
      onWebSocketError: (e) => {
        console.log(e);
      },
      onStompError: (e) => {
        console.log(e);
      },
      onConnect: () => {
        const client = clientRef.current;

        if (!client) return;

        subscribeToRoomUpdates(client);
        notifyJoin(client);
        
      },
      onChangeState: (e) => {
        console.log("Stage chaning", e);
      },
      onDisconnect: () => {
        console.log("Desconectado");
      },
    },
  });

  return {
    jogadores,
    roomOwnerId,
    isUserRoomChief,
    leaveRoom,
    removeUser,
  };
};
