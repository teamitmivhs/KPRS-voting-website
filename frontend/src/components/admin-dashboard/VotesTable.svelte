<script lang="ts">
      import { type GetVotesResponseType } from "../../lib/types";

      let votesData = $state<GetVotesResponseType>({
            MM: [
                  {
                        candidate_name: "Rasyad Rizky Ramadhan",
                        voter_name: "Ridwan Bagoes Setiawan"
                  },
                  {
                        candidate_name: "Rasyad Rizky Ramadhan",
                        voter_name: "Aldi Fadlurrahman"
                  },
            ],
            PD: [
                  {
                        candidate_name: "Rasyad Rizky Ramadhan",
                        voter_name: "Ridwan Bagoes Setiawan"
                  },
                  {
                        candidate_name: "Rasyad Rizky Ramadhan",
                        voter_name: "Aldi Fadlurrahman"
                  },
            ]
      });

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
      {#each votesData.MM as voteData, index}
            <div class="p-2">
                  <div>{index+1}</div>
                  <div>{voteData.voter_name}</div>
                  <div>{voteData.candidate_name}</div>
            </div>
      {/each}
</div>