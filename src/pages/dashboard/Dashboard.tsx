import useUser from "../../stores/useUserStore";
import { ProtectedRoute } from "../protected-route/ProtectedRoute";
import { GamesDisplay } from "./games-display/GamesDisplay";

export const Dashboard = () => {
  const { user } = useUser();

  return (
    <ProtectedRoute user={user}>
      <div className="bg-blue-100 flex h-full justify-center">
        <div className="w-[95%] max-w-[700px]">
          <GamesDisplay className="mt-10 p-5" />
        </div>
      </div>
    </ProtectedRoute>
  );
};
