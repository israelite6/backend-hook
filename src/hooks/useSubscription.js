import React from "react";
import useState from "./useState";
import useStorage from "./useStorage";

export const GQL = {
  CONNECTION_INIT: "connection_init",
  CONNECTION_ACK: "connection_ack",
  CONNECTION_ERROR: "connection_error",
  CONNECTION_KEEP_ALIVE: "ka",
  START: "start",
  STOP: "stop",
  CONNECTION_TERMINATE: "connection_terminate",
  DATA: "data",
  ERROR: "error",
  COMPLETE: "complete",
};

var socketLiveCounter = 0;
var socketLiveInterval = null;

export default function useSubscription({
  url,
  options,
  onMessage,
  onError,
  onConnectionStatus,
  onConnected,
  onLog,
  ...props
}) {
  const [state, setState] = useState({
    connected: false,
    websocket: null,
    id: [],
    interval: null,
  });
  const token = useStorage("token");

  const setWebsocket = () => {
    let webSocket = new WebSocket(url, ["graphql-ws", token.get()]);

    webSocket.onerror = (e) => {
      setTimeout(() => {
        attemptReconnection();
      }, 5000);
    };
    webSocket.onopen = function (event) {
      webSocket.send(
        JSON.stringify({
          type: GQL.CONNECTION_INIT,
          payload: options || {},
        })
      );

      socketLiveInterval = setInterval(() => {
        if (socketLiveCounter === 5) {
          attemptReconnection();
          socketLiveCounter = 0;
        } else {
          socketLiveCounter++;
        }
      }, 2000);
      setState({ webSocket, connected: true, id: [] });
    };
  };

  const stopWebSocket = (id) => {
    state.webSocket.send(
      JSON.stringify({
        type: GQL.STOP,
        id,
      })
    );
  };

  const closeWebSocket = () => {
    try {
      state.webSocket.send(
        JSON.stringify({
          type: GQL.CONNECTION_TERMINATE,
        })
      );
      setState({ connected: false });
      setTimeout(() => state.webSocket.close(), 1000);
    } catch (e) {}

    try {
      clearInterval(socketLiveInterval);
    } catch (e) {}
  };

  const restartWebSocket = () => {
    closeWebSocket();
    setTimeout(() => {
      setWebsocket();
    }, 3000);
  };

  const attemptReconnection = () => {
    restartWebSocket();
    console.log("attemptReconnection");
  };

  const runSubscription = ({ query, id, data, operationName }) => {
    setState({ id: state.id.push(id) });
    state.webSocket.send(
      JSON.stringify({
        type: GQL.START,
        id,
        payload: {
          query,
          variables: data || {},
          operationName,
        },
      })
    );
  };
  React.useEffect(() => {
    if (token.get()) {
      setWebsocket();
    }

    window.onbeforeunload = () => {
      try {
        state.webSocket.onclose = function () {}; // disable onclose handler first
        state.webSocket.close();
      } catch (e) {}
    };

    return () => {
      try {
        closeWebSocket();
      } catch (e) {}
    };
  }, []);
  React.useEffect(() => {
    if (state.connected) {
      state.webSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        socketLiveCounter = 0;
        if (onLog) {
          onLog(data);
        }

        switch (data.type) {
          case GQL.CONNECTION_ACK: {
            if (onConnected) {
              onConnected();
            }

            break;
          }
          case GQL.CONNECTION_ERROR: {
            if (onError) {
              onError(data);
            }

            break;
          }
          case GQL.CONNECTION_KEEP_ALIVE: {
            if (onConnectionStatus) {
              onConnectionStatus();
            }
            break;
          }
          case GQL.DATA: {
            if (onMessage) {
              onMessage(data);
            }

            break;
          }
          case GQL.COMPLETE: {
            break;
          }
        }
      };
    }
  }, [state.connected]);

  return {
    setWebsocket,
    isConnected: state.connected,
    webSocket: state.webSocket,
    runSubscription,
    stopWebSocket,
    closeWebSocket,
    restartWebSocket,
  };
}
