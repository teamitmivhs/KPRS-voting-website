import { writable } from "svelte/store";
import { ApiError, type CandidateType } from "../types";
import { api } from "../api";
import { toasts } from "./useToast";


const STORAGE_KEY = "kprs_candidatedata";

function createCandidateDataStore() {
      // 1. Try to load initial state from localStorage
            let initialValue: CandidateType[] | null = null;
      
            // Check for window/localStorage first to avoid errors in non-browser environments
            if (typeof localStorage !== 'undefined') {
                  const stored = localStorage.getItem(STORAGE_KEY);
                  if (stored) {
                        try {
                              initialValue = JSON.parse(stored);
                        } catch (error) {
                              console.error("Failed to parse stored user data:", error);
                              localStorage.removeItem(STORAGE_KEY);
                        }
                  }
            }
      
            const store = writable<CandidateType[] | null>(initialValue);
      
            // 2. Subscribe to changes and save to localStorage
            store.subscribe((value) => {
                  if (typeof localStorage !== 'undefined') {
                        if (value) {
                              localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
                        } else {
                              localStorage.removeItem(STORAGE_KEY);
                        }
                  }
            });
      
            return {
                  subscribe: store.subscribe,
                  set: store.set,
                  update: store.update
            };
}

export const candidateDataStore = createCandidateDataStore();


export async function useCandidateDataEffect() {
      let result = await api.getCandidateData()
      if(typeof result == "object") {
            candidateDataStore.set(result);
      }
      else {
            toasts.showAPI(result);
            if(result === ApiError.Unauthorized) {
                  window.location.hash = "/admin";
            }
      }
}