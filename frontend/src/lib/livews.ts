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
                                                res(socket);
                                        }
                                        socket.onclose = () => {
                                                res(null);
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
                await delay(10000);
                console.log("reconnecting..");
                connectingLiveDashboard();
                return;
        }

        // Standard event listeners
        // Listen for opening connection (connected connection)
        socket.addEventListener("open", (event) => {
                console.log("Connected to server");
        });

        // Listen for message from server
        socket.addEventListener("message", (event) => {
                console.log("Message from server:", event.data);
        });

        // Listen if there's an error
        socket.addEventListener("error", (error) => {
                console.error("WebSocket error:", error);
                if (socket) {
                        socket.close();
                }
        });

        // Listen if the connection is closed
        socket.addEventListener("close", () => {
                console.log("Connection closed");
                setTimeout(() => {
                        console.log("Reconnecting...");
                }, 1500);
                setTimeout(connectingLiveDashboard, 2000);
        });
}
