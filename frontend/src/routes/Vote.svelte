<script lang="ts">
      import CandidateCard from "../components/vote/CandidateCard.svelte";
      import VoteNavbar from "../components/vote/VoteNavbar.svelte";
      import { api } from "../lib/api";
      import { toasts } from "../lib/hooks/useToast";
      import { ApiError, Campus, type CandidateType } from "../lib/types";
      import { userDataStore } from "../lib/hooks/useUserdata";
      import { candidateDataStore } from "../lib/hooks/useCandidateData";


      type CandidateState = "TIM" | "VISI" | "MISI";

      let current_candidate_state = $state<CandidateState[]>(["TIM", "TIM", "TIM", "TIM"]);
      let is_voting = $state<boolean>(false);

      async function vote_candidate(index: number) {
            if($candidateDataStore == null) return;

            is_voting = true;
            let result = await api.vote($candidateDataStore[index].president);
            if (result === undefined) {
                  toasts.add({
                        title: "Sukses!",
                        message: "Terima kasih telah melakukan voting!",
                        type: "success",
                  });
                  window.location.hash = "/logout";
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
            is_voting = false;
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
      });

</script>

<VoteNavbar />
<div class="fixed top-4 left-4 -rotate-45 -translate-x-1/2 -translate-y-1/2 -z-10 bg-[#5e4c2c] w-[1200px] h-[500px]"></div>
{#if authorized && $userDataStore != null}
      <div class="flex flex-col w-screen h-full max-h-screen p-4 mt-24 sm:p-18 md:gap-4">
            <div class="flex flex-col gap-0 w-full items-center">
                  <h1 class="uppercase text-5xl font-thin italic">Use your <span class="font-bold">voice</span></h1>
                  <p class="text-md font-normal">Gunakan suara-mu! Pilih yang menurut-mu terbaik!</p>
            </div>
            <div
                  class="w-full max-w-full h-full max-h-[calc(100vh-18rem)] flex-1 relative left-1/2 -translate-x-1/2 flex flex-col md:flex-row gap-4 {is_voting
                        ? 'opacity-50 pointer-events-none'
                        : ''}"
            >
                  {#if $candidateDataStore != null}
                        {#each $candidateDataStore.filter((candidate) => candidate.campus === $userDataStore.campus) as candidate, index}
                              <CandidateCard {candidate} index={$candidateDataStore.indexOf(candidate)} no={index + 1} bind:current_candidate_state {vote_candidate} />
                        {/each}
                  {/if}
            </div>
      </div>
{:else}
      <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100 flex flex-col h-full w-full items-center justify-center">
            <p class="opacity-50 text-3xl font-semibold">Loading...</p>
      </div>
{/if}
userDataStore
