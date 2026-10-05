import useUser from "../../stores/useUserStore";
import { ProtectedRoute } from "../protected-route/ProtectedRoute";

export const Dashboard = () => {
  const { user } = useUser();

  return (
    <ProtectedRoute user={user}>
      <div>Dashviard</div>
    </ProtectedRoute>
  );
};
