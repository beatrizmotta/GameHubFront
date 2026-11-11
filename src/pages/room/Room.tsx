import { Navigate, useParams } from "react-router";
import { getCurrentPlayer } from "../../utils/player.utils";
import { RoomContent } from "./room-content/Room";

export const Room = () => {
  const { id: roomId } = useParams();
  const playerId = getCurrentPlayer();

  if (!roomId || !playerId) {
    return <Navigate to="/" />;
  }

  return <RoomContent roomId={roomId} playerId={playerId} />;
};
