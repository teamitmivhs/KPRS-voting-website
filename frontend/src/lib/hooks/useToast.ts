import { writable } from 'svelte/store';
import { ApiError } from "../types";

export type ToastType = 'success' | 'info' | 'error';

export interface ToastState {
      isVisible: boolean;
      title: string;
      message: string;
      type: ToastType;
}

const initialState: ToastState = {
      isVisible: false,
      title: '',
      message: '',
      type: 'info'
};

function createToastStore() {
      const { subscribe, set, update } = writable<ToastState>(initialState);
      let timeoutId: number | null = null;

      return {
            subscribe,
            add: (toast: { title: string; message: string; type: ToastType; duration?: number; }) => {
                  if (timeoutId) {
                        clearTimeout(timeoutId);
                        timeoutId = null;
                  }

                  set({
                        isVisible: true,
                        title: toast.title,
                        message: toast.message,
                        type: toast.type
                  });

                  const duration = toast.duration || 3000;
                  // Using window.setTimeout to avoid NodeJs.Timeout type issues if strictly typed environments
                  timeoutId = setTimeout(() => {
                        update(state => ({ ...state, isVisible: false }));
                        timeoutId = null;
                  }, duration) as unknown as number;
            },
            remove: () => {
                  if (timeoutId) {
                        clearTimeout(timeoutId);
                        timeoutId = null;
                  }
                  update(state => ({ ...state, isVisible: false }));
            },
            showAPI: (api_error: ApiError) => {
                  if (api_error === ApiError.Unauthorized) {
                        toasts.add({
                              title: "Akses tidak diterima",
                              message: "Akses tidak dikenali",
                              type: "error",
                              duration: 5000,
                        });
                  } else if (api_error === ApiError.NotFound) {
                        toasts.add({
                              title: "Pengguna Tidak Ditemukan",
                              message: "Pengguna tidak ditemukan",
                              type: "error",
                              duration: 5000,
                        });
                  } else if (api_error === ApiError.ServerError) {
                        toasts.add({
                              title: "Server Error!",
                              message: "Terjadi kesalahan pada server",
                              type: "error",
                              duration: 5000,
                        });
                  } else {
                        toasts.add({
                              title: "Terjadi kesalahan!",
                              message: "Terjadi kesalahan",
                              type: "error",
                              duration: 5000,
                        });
                  }
            }
      };
}

export const toasts = createToastStore();
