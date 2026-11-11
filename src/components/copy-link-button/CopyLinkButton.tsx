import { useState } from "react";
import { Button } from "../ui/button";
import { buildRoomLink } from "../../pages/room/utils";
import { Spinner } from "../ui/spinner";

interface CopyLinkButtonProps {
  roomId: string;
}
export const CopyLinkButton = ({ roomId }: CopyLinkButtonProps) => {
  const [copyButtonLoading, setCopyButtonLoading] = useState(false);
  const copyLinkToClipboard = (id: string) => {
    const roomLink = buildRoomLink(id);
    console.log(import.meta.env.BASE_URL);
    console.log(roomLink);

    navigator.clipboard.writeText(roomLink);

    setTimeout(() => {
      setCopyButtonLoading(false);
    }, 200);
  };
  return (
    <Button
      onClick={() => copyLinkToClipboard(roomId)}
      disabled={copyButtonLoading}
    >
      {copyButtonLoading && <Spinner />}
      Copiar link
    </Button>
  );
};
