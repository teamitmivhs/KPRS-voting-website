import { get } from "svelte/store";
import { useDetailedVotesStatsEffect, useSimpleVotesStatsEffect, useVoterTokenEffect, useVotesData } from "./hooks/useStats";
import { toasts } from "./hooks/useToast";
import type { Campus } from "./types";
import { await_for_with_default, delay } from "./util";

const BASE_URL = import.meta.env.VITE_WEBSOCKET_URL || "ws://localhost:8080/live";

let socket: WebSocket | null;
let ready_to_connect: boolean = true;

async function reconnect() {
        if (socket) {
                socket.close();
                socket = null;
        }
        toasts.add({
                title: "Disconnected!",
                message: "Disconnected to live votes data!",
                type: "error",
                duration: 2000
        });
        connectingLiveDashboard();
}

export async function connectingLiveDashboard() {
        if ((socket && socket.OPEN) || !ready_to_connect) return;

        // Create the socket instance with built-in websocket object
        socket = await await_for_with_default<WebSocket|null, null>(
                async () => {
                        if (!ready_to_connect) return new Promise((res) => res(null));

                        ready_to_connect = false;
                        return new Promise((res, _) => {
                                try {
                                        let socket = new WebSocket(BASE_URL);
                                        useDetailedVotesStatsEffect();
                                        useSimpleVotesStatsEffect();
                                        useVoterTokenEffect();
                                        socket.onopen = () => {
                                                console.info("Connected to live votes data!");
                                                toasts.add({
                                                        title: "Connected!",
                                                        message: "Connected to live votes data!",
                                                        type: "success",
                                                        duration: 2000
                                                });
                                                if (!ready_to_connect) {
                                                        res(socket);
                                                        ready_to_connect = true;
                                                }
                                        }
                                        socket.onerror = null;
                                }
                                catch {
                                        res(null);
                                }
                        })
                },
                5000,
                null
        );

        if (socket === null) {
                console.info("Reconnecting after 10s");
                await delay(10000);
                console.info("Reconnecting..");

                reconnect();
                return;
        }

        // Event listeners
        // Listen for message from server
        socket.onmessage = (event) => {
                const message: string = event.data;
                console.debug("Data from server:", message);

                const category_seperated = message.split("-");
                const category = category_seperated.at(0);
                const action_seperated = (category_seperated.at(1) ?? ":").split(":");
                const action = action_seperated.at(0);
                const votes_data = (action_seperated.at(1) ?? ",").split(",");
                const campus = votes_data.at(0);
                const voter = votes_data.at(1) ?? "";
                const candidate = votes_data.at(2) ?? "";

                // If the category is 'v' means about votes data
                if (category == "v") {
                        // If the action is 'c' means about creating data
                        if (action == "c") {
                                console.debug(`${voter} just votes ${candidate}!`);
                                // Insert the new data
                                let new_data = get(useVotesData);
                                new_data[campus as Campus].push({
                                        voter_name: voter,
                                        candidate_name: candidate,
                                });
                                useVotesData.set(new_data);
                        }
                        // If the action is 'd' means about deleting data
                        else if (action == "d") {
                                console.debug(`${voter} just unvote ${candidate}!`);
                                // Delete the data
                                let new_data = get(useVotesData);
                                new_data[campus as Campus].filter((data) => data.voter_name != voter);
                                useVotesData.set(new_data);
                        }
                }
        };

        // Listen if there's an error
        socket.onerror = (error) => {
                console.error("WebSocket error:", error);
                reconnect();
        };

        // Listen if the connection is closed
        socket.onclose = () => {
                console.info("Connection closed");
                console.info("Reconnecting...");
                reconnect();
        };
}

export async function cleanupLiveDashboard() {
        if (socket) {
                socket.close();
                socket = null;
        }
}
