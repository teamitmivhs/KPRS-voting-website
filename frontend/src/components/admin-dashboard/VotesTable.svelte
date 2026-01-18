<script lang="ts">
      import { useVotesData, useVotesDataEffect } from "../../lib/hooks/useStats";

      $effect(() => {
            useVotesDataEffect();
      })
</script>

<div class="flex flex-col md:flex-row items-strecth *:h-full *:w-full">
        <div class="flex flex-col p-4 space-y-4">
                <h3 class="font-bold w-full text-center px-4 py-2 text-2xl">Kampus MM</h3>
                <div class="border border-white flex flex-col rounded-2xl">
                        <div class="grid grid-rows-12 overflow-y-auto *:grid *:grid-cols-[24px_1fr_1fr] *:place-items-center">
                                <div class="font-semibold border-b border-white p-4">
                                        <div>
                                                No.
                                        </div>
                                        <div>
                                                Voter
                                        </div>
                                        <div>
                                                Candidate
                                        </div>
                                </div>
                                {#each $useVotesData.MM as voteData, index}
                                <div class="px-4 py-2 text-sm font-thin">
                                        <div class="w-full text-center">{index+1}</div>
                                        <div>{voteData.voter_name}</div>
                                        <div>{voteData.candidate_name}</div>
                                </div>
                                {/each}
                        </div>
                </div>
        </div>
        <div class="flex flex-col p-4 space-y-4">
                <h3 class="font-bold w-full text-center px-4 py-2 text-2xl">Kampus PD</h3>
                <div class="border border-white flex flex-col rounded-2xl">
                        <div class="grid grid-rows-12 *:grid *:grid-cols-[24px_1fr_1fr] *:place-items-center">
                                <div class="font-semibold border-b border-white p-4">
                                        <div>
                                                No.
                                        </div>
                                        <div>
                                                Voter
                                        </div>
                                        <div>
                                                Candidate
                                        </div>
                                </div>
                                {#each $useVotesData.PD as voteData, index}
                                <div class="px-4 py-2 text-sm font-thin">
                                        <div class="w-full text-center">{index+1}</div>
                                        <div>{voteData.voter_name}</div>
                                        <div>{voteData.candidate_name}</div>
                                </div>
                                {/each}
                        </div>
                </div>
        </div>
</div>
