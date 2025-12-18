import { writable } from "svelte/store";
import type { DetailVoteStatsType, VoteStatsType } from "../types";


function createDetailedVotesStore() {
      const { subscribe, set, update  } = writable<DetailVoteStatsType>([
            {
                  candidate_name: "Rasyad Rizky Ramadhan",
                  voter_name: "Ridwan Bagoes Setiawan"
            },
            {
                  candidate_name: "Andrea Farras",
                  voter_name: "Aldi Fadlurrahman"
            }
      ]);

      return {
            subscribe,
            set,
            update
      }
}


export const useDetailedVotesStats = createDetailedVotesStore();


function createVotesStore() {
      const { subscribe, set, update  } = writable<VoteStatsType>([
            {
                  candidate_name: "Rasyad Rizky Ramadhan",
                  vote_count: 20
            },
            {
                  candidate_name: "Andrea Farras",
                  vote_count: 30
            },
      ]);

      return {
            subscribe,
            set,
            update
      }
}


export const useVotesStats = createVotesStore();



