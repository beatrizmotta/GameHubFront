export enum RoomType {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
}

export interface Room {
  id: string;
  type: RoomType;
  password?: string;
}

export interface CreateRoomRequest {
  playerName: string;
  password: string | null;
}

export interface CreateRoomResponse {
  roomId: string;
  playerId: string;
}

export interface JoinRoomRequest {
  name: string;
  password?: string;
}
