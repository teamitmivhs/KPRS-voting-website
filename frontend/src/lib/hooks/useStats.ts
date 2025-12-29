import { writable } from "svelte/store";
import { ApiError, Campus, type DetailVoteStatsResponseType, type NumOfVotersType, type VoterTokenType, type VoteStatsResponseType } from "../types";
import { api } from "../api";
import { toasts } from "./useToast";


function createDetailedVotesStore() {
      const { subscribe, set, update  } = writable<DetailVoteStatsResponseType>({
            "Ridwan Bagoes Setiawan": "Rasyad Rizky Ramadhan",
            "Aldi Fadlurrahman": "Andrea Farras"
      });

      return {
            subscribe,
            set,
            update
      }
}


export const useDetailedVotesStats = createDetailedVotesStore();

export async function useDetailedVotesStatsEffect() {
      const result = await api.getDetailedVotes();
      if(typeof result == "object") {
            useDetailedVotesStats.set(result);
      }
      else {
            toasts.showAPI(result);
            if(result === ApiError.Unauthorized) {
                  window.location.hash = "/admin";
            }
      }
}


function createSimpleVotesStore() {
      const { subscribe, set, update  } = writable<VoteStatsResponseType>({
            MM: {},
            PD: {}
      });

      return {
            subscribe,
            set,
            update
      }
}


export const useSimpleVotesStats = createSimpleVotesStore();

export async function useSimpleVotesStatsEffect() {
      const result = await api.getSimpleVotes();
      if(typeof result == "object") {
            useSimpleVotesStats.set(result);
      }
      else {
            toasts.showAPI(result);
            if(result === ApiError.Unauthorized) {
                  window.location.hash = "/admin";
            }
      }
}


function createNumOfVotersStore() {
      const { subscribe, set, update  } = writable<NumOfVotersType>({
            MM: 0,
            PD: 0
      });

      return {
            subscribe,
            set,
            update
      }
}


export const useNumOfVoters = createNumOfVotersStore();


function createVoterTokenStore() {
      const { subscribe, set, update  } = writable<VoterTokenType>({
            MM: {},
            PD: {}
      });

      return {
            subscribe,
            set,
            update
      }
}


export const useVoterToken = createVoterTokenStore();

export async function useVoterTokenEffect() {
      const result = await api.getTokens();
      if(typeof result == "object") {
            let voter_token_result: VoterTokenType = {
                  MM: {},
                  PD: {}
            };

            let num_of_voters_result: NumOfVotersType = {
                  MM: 0,
                  PD: 0
            }

            Object.entries(result).forEach(([campus_name, voter_data]) => {
                  Object.entries(voter_data).forEach(([voter_name, voter_token]) => {
                        voter_token_result[campus_name as Campus][voter_name] = voter_token;
                  })

                  num_of_voters_result[campus_name as Campus] = Object.keys(voter_token_result[campus_name as Campus]).length;
            })

            
            useVoterToken.set(voter_token_result);
            useNumOfVoters.set(num_of_voters_result);
      }
      else {
            toasts.showAPI(result);
            if(result === ApiError.Unauthorized) {
                  window.location.hash = "/admin";
            }
      }
}
