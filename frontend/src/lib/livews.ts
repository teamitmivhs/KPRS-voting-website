import { await_for_with_default, delay } from "./util";

const BASE_URL = import.meta.env.VITE_WEBSOCKET_URL || "ws://localhost:8080/live";

let socket: WebSocket | null;
let ready_to_connect: boolean = true;

export async function connectingLiveDashboard() {
        if ((socket && socket.OPEN) || !ready_to_connect) return;

        // Create the socket instance with built-in websocket object
        ready_to_connect = false;
        socket = await await_for_with_default<WebSocket|null, null>(
                async () => {
                        return new Promise((res, _) => {
                                try {
                                        let socket = new WebSocket(BASE_URL)
                                        socket.onopen = () => {
                                                console.log("Connected to live votes data!");
                                                if (!ready_to_connect) {
                                                        res(socket);
                                                }
                                        }
                                }
                                catch {
                                        res(null);
                                }
                        })
                },
                5000,
                null
        );
        ready_to_connect = true;

        if (socket === null) {
                console.log("Reconnecting after 10s");
                await delay(10000);
                console.log("Reconnecting..");
                connectingLiveDashboard();
                return;
        }

        // Event listeners
        // Listen for message from server
        socket.onmessage = (event) => {
                console.log("Message from server:", event.data);
        };

        // Listen if there's an error
        socket.onerror = (error) => {
                console.error("WebSocket error:", error);
                if (socket) {
                        socket.close();
                }
        };

        // Listen if the connection is closed
        socket.onclose = () => {
                console.log("Connection closed");
                console.log("Reconnecting...");
                if (socket) {
                        socket.close();
                        socket = null;
                }
                connectingLiveDashboard();
        };
}
