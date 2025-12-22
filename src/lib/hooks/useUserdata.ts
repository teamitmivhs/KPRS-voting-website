import { writable } from "svelte/store";
import type { UserData } from "../types";

const STORAGE_KEY = 'kprs_userdata';

export function createUserDataStore() {
      // 1. Try to load initial state from localStorage
      let initialValue: UserData | null = null;

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

      const store = writable<UserData | null>(initialValue);

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

export const userDataStore = createUserDataStore();