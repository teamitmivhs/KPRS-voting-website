<script lang="ts">
    import { toasts } from '../../lib/hooks/useToast';

    function getToastColor(type: string) {
        switch (type) {
            case 'success':
                return 'bg-green-500 border-green-600 text-white shadow-green-500/20';
            case 'error':
                return 'bg-red-500 border-red-600 text-white shadow-red-500/20';
            case 'info':
                return 'bg-blue-500 border-blue-600 text-white shadow-blue-500/20';
            default:
                return 'bg-gray-800 border-gray-700 text-white';
        }
    }
</script>

<div class="fixed top-4 right-4 z-50 flex duration-1000 {($toasts.isVisible ? 'translate-y-0 opacity-100' : '-translate-y-[150%] opacity-0')} pointer-events-none">
    <div
        class="pointer-events-auto min-w-[300px] max-w-sm rounded-lg border p-4 shadow-lg backdrop-blur-md {getToastColor($toasts.type)}"
    >
        <div class="flex items-start justify-between">
            <div>
                <h3 class="font-bold text-sm tracking-wide">{$toasts.title}</h3>
                <p class="text-sm opacity-90 mt-1">{$toasts.message}</p>
            </div>
            <button
                on:click={() => toasts.remove()}
                class="ml-4 text-white hover:text-gray-200 transition-colors"
                aria-label="Close"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    </div>
</div>
