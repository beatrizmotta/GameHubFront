import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { RiMoreLine } from "@remixicon/react";
import { Button } from "../../../components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "../../../components/ui/item";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { ButtonGroup } from "../../../components/ui/button-group";
import { CopyLinkButton } from "../../../components/copy-link-button/CopyLinkButton";
import { useRoom } from "./room.hook";

interface HeaderProps {
  game: string;
}
const Header = ({ game }: HeaderProps) => {
  const accentColor = "#194C95";

  return (
    <div className={`font-[Figtree] font-bold text-[${accentColor}] py-7`}>
      <div className="text-5xl">{game} </div>
      <div className="text-2xl">Aguardando início do jogo...</div>
    </div>
  );
};

interface RoomContentProps {
  roomId: string;
  playerId: string;
}
export const RoomContent = ({ roomId, playerId }: RoomContentProps) => {
  const { jogadores, isUserRoomChief, removeUser, leaveRoom } = useRoom({
    playerId,
    roomId,
  });

  return (
    <div className="bg-blue-100 h-full flex flex-col items-center">
      <Header game="Flip 7" />
      <Card className="w-[90%] p-5">
        <CardHeader className="flex justify-between">
          <CardTitle className="text-start text-xl">Jogadores</CardTitle>
          <ButtonGroup>
            <CopyLinkButton roomId={roomId} />
            <Button variant={"destructive"} onClick={leaveRoom}>
              Sair
            </Button>
          </ButtonGroup>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 p-0">
          {jogadores.map((jogador) => {
            const isItMe = jogador.id === playerId;

            return (
              <Item variant={"outline"} className="flex">
                <ItemMedia>
                  <Avatar className={"size-10"}>
                    <AvatarFallback>{jogador.name[0]}</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>
                    {jogador.name} {isItMe ? "(Eu)" : ""}{" "}
                  </ItemTitle>
                </ItemContent>
                {!isItMe && (
                  <ItemActions>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button size="icon" variant={"secondary"}>
                            <RiMoreLine />
                          </Button>
                        }
                      />
                      <DropdownMenuContent>
                        <DropdownMenuGroup
                          className={"[&_[role=menuitem]]:cursor-pointer"}
                        >
                          <DropdownMenuItem disabled>
                            Adicionar como amigo
                          </DropdownMenuItem>
                          {isUserRoomChief && (
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={removeUser}
                            >
                              Remover da sala
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </ItemActions>
                )}
              </Item>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
