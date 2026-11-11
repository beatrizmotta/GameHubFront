import { Client } from "@stomp/stompjs";
import { createContext, useContext } from "react";
import SockJS from "sockjs-client";

const WebSocketContext = createContext<Client | null>(null);

interface WebSocketProviderProps {
  children: React.ReactNode | React.ReactNode[];
}
export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const client = new Client({
    webSocketFactory: () => {
      return new SockJS(import.meta.env.VITE_API_URL + "/gamehub");
    },
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("Connectado");
    },
    onWebSocketClose: () => {
      console.log("Websocket desconectado");
    },
    onStompError: (frame) => {
      console.log("Erro ao conectar", frame.headers, frame.body);
    },
  });

  return (
    <WebSocketContext.Provider value={client}>
      {children}
    </WebSocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWebSocket = () => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error("useWebSocket deve ser usado dentro do WebSocketProvider");
  }
};
