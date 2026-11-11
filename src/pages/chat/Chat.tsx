import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { SimpleChatConnection } from "../simple-chat-connection/SimpleChatConnection";
import { useEffect, useRef, useState } from "react";
import { EScreenState } from "./types";

export const Chat = () => {
  /**
   *
   * Conexão deve acontecer aqui
   *
   */

  const [screenState, changeScreenState] = useState<EScreenState>(
    EScreenState.START,
  );

  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const webSocketConnection = new Client({
      webSocketFactory: () => {
        return new SockJS(import.meta.env.VITE_API_URL + "/gamehub");
      },
      onConnect: () => {
        webSocketConnection.subscribe("/topic/message", (msg) => {
          console.log("Msg: ", msg);
        });
        changeScreenState(EScreenState.CHAT);
        console.log("Acabei de conectar");
      },
      onStompError: () => {
        console.log("Errp ao conectar");
      },
      onDisconnect: () => {
        console.log("Acabei de desconectar");
      },
    });

    webSocketConnection.activate();
    clientRef.current = webSocketConnection;

    return () => {
      webSocketConnection.deactivate();
      clientRef.current = null;
    };
  }, []);

  return (
    <div className="bg-blue-200 h-full flex justify-center">
      <div className="w-[90%] bg-white rounded-lg p-10 mt-15">
        <SimpleChatConnection
          clientConnection={clientRef}
          screenState={screenState}
        />
      </div>
    </div>
  );
};
