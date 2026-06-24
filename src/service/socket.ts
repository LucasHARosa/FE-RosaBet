export type SocketEvents = "highlights" | "events_sports" | "events_sports_markets" | "properties";

const URL = process.env.NEXT_PUBLIC_SOCKET_URL;

export function createWebSocket(channel: SocketEvents): WebSocket {
  return new WebSocket(`${URL}?channel=${channel}`);
}

export function onOpen(ws: WebSocket, params?: { [key: string]: string }[], callback?: () => void) {
  ws.onopen = () => {
    params?.forEach((param) => {
      for (const key in param) {
        if (param.hasOwnProperty(key)) {
          ws.send(`insert|${key}|${param[key]}`);
          console.log(`insert|${key}|${param[key]}`);
        }
      }
    });
    ws.send("OK");
    callback && callback();
  };
}

export function handleAction(
  ws: WebSocket,
  action: SocketTypes,
  filter: { [key: string]: string },
) {
  for (const key in filter) {
    if (filter.hasOwnProperty(key)) {
      ws.send(`${action}|${key}|${filter[key]}`);
      console.log(`${action}|${key}|${filter[key]}`);
    }
  }
  ws.send("OK");
}

export function onMessage(ws: WebSocket, callback: (data: string) => void) {
  ws.onmessage = (event) => {
    callback(event.data);
  };
}

export function onError(ws: WebSocket, callback?: (error: Event) => void) {
  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
    callback && callback(error);
  };
}

export function onClose(ws: WebSocket, callback?: () => void) {
  ws.onclose = () => {
    console.log("WebSocket connection closed");
    callback && callback();
  };
}

export function send(ws: WebSocket, message: string) {
  ws.send(message);
}

export function closeWS(ws: WebSocket) {
  ws.close();
}

export type SocketTypes = "insert" | "update" | "delete";
