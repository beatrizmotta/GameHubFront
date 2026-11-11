import { Client, StompConfig } from "@stomp/stompjs";
import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";

interface useWebSocketProps {
  config: StompConfig;
}
export const useWebSocket = ({ config }: useWebSocketProps) => {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () =>
        new SockJS(import.meta.env.VITE_API_URL + "/gamehub"),
      reconnectDelay: 5000,
      ...config,
    });

    clientRef.current = client;

    void client.activate();

    return () => {
      clientRef.current = null;
      void client.deactivate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    clientRef,
  };
};
