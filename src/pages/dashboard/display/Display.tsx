import type { GameDisplay } from "../../../api/models/game-display.model";
import { Button, buttonVariants } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../../../components/ui/card";
import defaultThumb from "../../../assets/default-game-thumbnail.svg";
import { DialogTrigger } from "../../../components/ui/dialog";
import { cn } from "cn";

export const Display = ({ game }: { game: GameDisplay }) => {
  return (
    <Card>
      <CardTitle>{game.name}</CardTitle>
      <CardContent>
        <img className="rounded-xl" src={game.thumbnail ?? defaultThumb} />
      </CardContent>
      <CardFooter className="flex gap-2">
        <DialogTrigger className={cn(buttonVariants(), "cursor-pointer")}>
          Criar sala
        </DialogTrigger>
        <Button variant={"outline"}>Entrar em sala</Button>
      </CardFooter>
    </Card>
  );
};
