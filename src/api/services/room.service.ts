import type { AxiosResponse } from "axios";
import base from "../base";
import type {
  CreateRoomRequest,
  CreateRoomResponse,
  JoinRoomRequest,
  RoomType,
} from "../models/room.model";

const RESOURCE = "/rooms";

class RoomService {
  static async create(
    request: CreateRoomRequest,
  ): Promise<AxiosResponse<CreateRoomResponse>> {
    return await base.post(RESOURCE + "/create", request);
  }

  static async getRoomType(roomId: string): Promise<AxiosResponse<RoomType>> {
    return await base.get(RESOURCE + "/room/type" + `/${roomId}`);
  }

  static async registerMeInRoom(
    roomId: string,
    request: JoinRoomRequest,
  ): Promise<AxiosResponse<string>> {
    return await base.post(RESOURCE + "/room/join" + `/${roomId}`, request);
  }
}

export default RoomService;
