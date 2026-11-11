export enum GameMessageType {
  FORBIDDEN = "FORBIDDEN",
  UPDATE = "UPDATE",
  PLAYER_JOINED = "PLAYER_JOINED",
  CURRENT_PLAYERS = "CURRENT_PLAYERS",
  PLAYER_LEFT = "PLAYER_LEFT",
}

export interface GameMessage<T extends GameMessageType = GameMessageType> {
  type: T;
  content: object;
}

export interface Player {
  id: string;
  name: string;
}

export interface GameMessagePlayerJoinedContent extends GameMessage {
  content: { currentPlayers: Player[]; roomOwnerId: string };
}

export interface GameMessagePlayerJoinedRequest extends GameMessage {
  content: {
    playerId: string;
    name: string;
  };
}

export interface GameMessagePlayerLeftResponse extends GameMessage {
  content: {
    playerId: string;
  };
}
