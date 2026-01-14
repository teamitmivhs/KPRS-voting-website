<script lang="ts">
        import CandidateCard from "../components/vote/CandidateCard.svelte";
        import CandidateInfo from "../components/vote/CandidateInfo.svelte";
        import VoteNavbar from "../components/vote/VoteNavbar.svelte";
        import { api } from "../lib/api";
        import { toasts } from "../lib/hooks/useToast";
        import { ApiError } from "../lib/types";
        import { userDataStore } from "../lib/hooks/useUserdata";
        import { candidateDataStore, useCandidateDataEffect } from "../lib/hooks/useCandidateData";

        type CandidateState = "TIM" | "VISI" | "MISI";

        let selectedCandidateIndex = $state<number | null>(null);
        let isVoting = $state<boolean>(false);

        async function vote_candidate(index: number) {
                if ($candidateDataStore == null) return;

                isVoting = true;
                let result = await api.vote($candidateDataStore[index].president);
                if (result === undefined) {
                        window.location.hash = "/thanks";
                } else {
                        switch (result) {
                                case ApiError.Unauthorized:
                                        toasts.add({
                                                title: "Akses ditolak!",
                                                message: "Anda tidak memiliki akses untuk melakukan voting!",
                                                type: "error",
                                        });
                                        break;
                                case ApiError.Conflict:
                                        toasts.add({
                                                title: "Gagal!",
                                                message: "Anda sudah melakukan voting!",
                                                type: "error",
                                        });
                                        window.location.hash = "/logout";
                                        break;
                                default:
                                        toasts.add({
                                                title: "Terjadi kesalahan",
                                                message: "Terjadi kesalahan saat melakukan voting!",
                                                type: "error",
                                        });
                                        break;
                        }
                }
                isVoting = false;
        }

        let authorized = $state<boolean>(false);
        $effect(() => {
                api.check().then((result) => {
                        if (result === ApiError.Unauthorized) {
                                toasts.add({
                                        title: "Akses ditolak!",
                                        message: "Anda tidak memiliki akses untuk melakukan voting!",
                                        type: "error",
                                });
                                window.location.hash = "/logout";
                        } else {
                                authorized = true;
                        }
                });
                useCandidateDataEffect();
        });

        function select_candidate(index: number|null) {
                selectedCandidateIndex = index;
        }
</script>

<VoteNavbar />
<div class="fixed top-4 left-4 -rotate-45 -translate-x-1/2 -translate-y-1/2 -z-10 bg-[#5e4c2c] w-[1200px] h-[500px]"></div>
{#if authorized && $userDataStore != null}
        {#if $candidateDataStore != null}
                <div class={`absolute flex flex-col w-screen h-screen p-4 mt-24 sm:p-18 md:gap-4`}>
                        <div class="w-full max-w-full h-full max-h-[calc(100vh-18rem)] flex-1 relative left-1/2 -translate-x-1/2 flex flex-col md:flex-row gap-4 {isVoting ? 'opacity-50 pointer-events-none' : ''}">
                                {#each $candidateDataStore.filter((candidate) => candidate.campus === $userDataStore.campus) as candidate, index}
                                        <div class={`w-full h-full duration-250 ${selectedCandidateIndex === null ? "" : "pointer-events-none opacity-0"}`}>
                                                <CandidateCard {candidate} index={$candidateDataStore.indexOf(candidate)} no={index + 1} {select_candidate} />
                                        </div>
                                        <div class={`absolute top-0 left-0 w-full h-full duration-250 ${selectedCandidateIndex == index ? "opacity-100" : "pointer-events-none opacity-0"}`}>
                                                <CandidateInfo {candidate} {index} no={index+1} back_action={() => select_candidate(null)} vote_action={vote_candidate} />
                                        </div>
                                {/each}
                        </div>
                </div>
        {/if}
{:else}
        <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100 flex flex-col h-full w-full items-center justify-center">
                <p class="opacity-50 text-3xl font-semibold">Loading...</p>
        </div>
{/if}
