<script lang="ts">
      import Chart from "chart.js/auto";
      import { useDetailedVotesStats, useVotesStats } from "../../lib/hooks/useStats";

      let detailedVotesData = $useDetailedVotesStats;
      let votesData = $useVotesStats;
      
      let numOfVoters = $state<number>(50);

      $effect(() => {
            let numOfVotes = Object.keys(detailedVotesData).length;
            new Chart(document.getElementById("votersChart")! as HTMLCanvasElement, {
                  type: "pie",
                  data: {
                        labels: votesData.map(voteData => voteData.candidate_name),
                        datasets: [
                              {
                                    data: votesData.map(voteData => voteData.vote_count),
                                    backgroundColor: ["#52ACFF", "#ACCC99"],
                              },
                        ],
                  },
                  options: {
                        plugins: {
                              legend: {
                                    labels: {
                                          color: "white",
                                    },
                              },
                        },
                  },
            });
            new Chart(document.getElementById("candidatesChart")! as HTMLCanvasElement, {
                  type: "pie",
                  data: {
                        labels: ["Votes", "Not Voted"],
                        datasets: [
                              {
                                    data: [numOfVotes, numOfVoters-numOfVotes],
                                    backgroundColor: ["#0055FF", "#FF0055"],
                              },
                        ],
                  },
                  options: {
                        plugins: {
                              legend: {
                                    labels: {
                                          color: "white",
                                    },
                              },
                        },
                  },
            });
      });
</script>

<div class="w-full h-full grid grid-cols-2 gap-4 items-center">
      <div class="flex flex-col items-center gap-4 w-full h-full p-12">
            <div class="w-1/2 aspect-square">
                  <canvas id="votersChart"></canvas>
            </div>
            <p class="w-full text-center text-xl font-semibold">Number of Voters</p>
      </div>
      <div class="flex flex-col items-center gap-4 w-full h-full p-12">
            <div class="w-1/2 aspect-square">
                  <canvas id="candidatesChart"></canvas>
            </div>
            <p class="w-full text-center text-xl font-semibold">Number of Candidates</p>
      </div>
</div>
