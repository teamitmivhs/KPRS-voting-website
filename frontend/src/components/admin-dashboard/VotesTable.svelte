<script lang="ts">
      import { useVotesData, useVotesDataEffect } from "../../lib/hooks/useStats";

      $effect(() => {
            useVotesDataEffect();
      })
</script>

<div class="grid grid-flow-row *:grid *:grid-cols-3 *:place-items-center">
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
            <div class="p-2">
                  <div>{index+1}</div>
                  <div>{voteData.voter_name}</div>
                  <div>{voteData.candidate_name}</div>
            </div>
      {/each}
      {#each $useVotesData.PD as voteData, index}
            <div class="p-2">
                  <div>{index+1}</div>
                  <div>{voteData.voter_name}</div>
                  <div>{voteData.candidate_name}</div>
            </div>
      {/each}
</div>