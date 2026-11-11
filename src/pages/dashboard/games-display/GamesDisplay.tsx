import type { GameDisplay } from "../../../api/models/game-display.model";
import { Card } from "../../../components/ui/card";
import {
  Dialog,
} from "../../../components/ui/dialog";
import { CreateRoomDialog } from "../create-room-dialog/CreateRoomDialog";
import { Display } from "../display/Display";

const GAMES: GameDisplay[] = [
  {
    name: "Flip7",
    href: "/flip7",
  },
  {
    name: "Uno",
    href: "/uno",
  },
];

interface GamesDisplayProps {
  className?: string;
}
export const GamesDisplay = ({ className }: GamesDisplayProps) => {
  return (
    <Dialog>
      <Card className={className}>
        <h2 className="text-start">Jogos disponíveis</h2>

        <div className="flex flex-col gap-5">
          {GAMES.map((game) => {
            return <Display game={game} />;
          })}
        </div>
      </Card>
      <CreateRoomDialog />
    </Dialog>
  );
};
