import { writable } from 'svelte/store';

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
            }
      };
}

export const toasts = createToastStore();
