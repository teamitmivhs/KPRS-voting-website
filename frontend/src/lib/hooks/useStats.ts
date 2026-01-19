import { writable } from "svelte/store";
import { ApiError, Campus, type DetailVoteStatsResponseType, type VotesStatsType, type NumOfVotersType, type VoterTokenType, type VoteStatsResponseType, type VotesType } from "../types";
import { api } from "../api";
import { toasts } from "./useToast";

function createChartVotesStore() {
        const { subscribe, set, update } = writable<VoteStatsResponseType>({
                MM: {},
                PD: {},
        });

        return {
                subscribe,
                set,
                update,
        };
}

export const useChartVotesStats = createChartVotesStore();

export async function useChartVotesStatsEffect() {
        const result = await api.getSimpleVotes();
        if (typeof result == "object") {
                useChartVotesStats.set(result);
        } else {
                toasts.showAPI(result);
                if (result === ApiError.Unauthorized) {
                        window.location.hash = "/admin";
                }
        }
}

function createNumOfVotersStore() {
        const { subscribe, set, update } = writable<NumOfVotersType>({
                MM: 0,
                PD: 0,
        });

        return {
                subscribe,
                set,
                update,
        };
}

export const useNumOfVoters = createNumOfVotersStore();

function createVoterTokenStore() {
        const { subscribe, set, update } = writable<VoterTokenType>({
                MM: {},
                PD: {},
        });

        return {
                subscribe,
                set,
                update,
        };
}

export const useVoterToken = createVoterTokenStore();

export async function useVoterTokenEffect() {
        const result = await api.getTokens();
        if (typeof result == "object") {
                let voter_token_result: VoterTokenType = {
                        MM: {},
                        PD: {},
                };

                let num_of_voters_result: NumOfVotersType = {
                        MM: 0,
                        PD: 0,
                };

                Object.entries(result).forEach(([campus_name, voter_data]) => {
                        Object.entries(voter_data).forEach(([voter_name, voter_token]) => {
                                voter_token_result[campus_name as Campus][voter_name] = voter_token;
                        });

                        num_of_voters_result[campus_name as Campus] = Object.keys(voter_token_result[campus_name as Campus]).length;
                });

                useVoterToken.set(voter_token_result);
                useNumOfVoters.set(num_of_voters_result);
        } else {
                toasts.showAPI(result);
                if (result === ApiError.Unauthorized) {
                        window.location.hash = "/admin";
                }
        }
}

function createVotesDataStore() {
        let data: VotesStatsType = {
                MM: [],
                PD: [],
        };
        const { subscribe, set, update } = writable<VotesStatsType>(data);

        return {
                subscribe,
                set,
                update
        };
}

export const useVotesData = createVotesDataStore();

export async function useVotesDataEffect() {
        const result = await api.getDetailedVotes();
        if (typeof result == "object") {
                let votesDataResult: VotesStatsType = {
                        MM: [],
                        PD: [],
                };

                Object.keys(result).forEach((campusName) => {
                        Object.entries(result[campusName as Campus]).forEach(([voterName, candidateName]) => {
                                votesDataResult[campusName as Campus].push({
                                        voter_name: voterName,
                                        candidate_name: candidateName,
                                });
                        });
                });

                useVotesData.set(votesDataResult);
        } else {
                toasts.showAPI(result);
                if (result === ApiError.Unauthorized) {
                        window.location.hash = "/admin";
                }
        }
}
