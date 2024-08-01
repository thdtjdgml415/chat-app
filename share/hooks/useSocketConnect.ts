import { useEffect } from "react";
import { useWebSocketStore } from "../store/useWebsocketStore";

function useSocketConnect() {
  const { client, connect } = useWebSocketStore();

  useEffect(() => {
    if (client != null && client.connected)
      return; // 이미 연결된 상태라면 재연결 시도하지 않음
    else {
      console.log("Attempting to reconnect...");
      connect();
    }
  }, [client]);
}
export default useSocketConnect;
