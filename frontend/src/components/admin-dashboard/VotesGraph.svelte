<script lang="ts">
        import Chart from "chart.js/auto";
        import { useNumOfVoters, useChartVotesStats, useChartVotesStatsEffect, useVoterTokenEffect } from "../../lib/hooks/useStats";
        import { onMount } from "svelte";
        import type { Campus } from "../../lib/types";
        import { cleanupLiveDashboard, connectingLiveDashboard } from "../../lib/livews";

        let voteStatsCanvasMM: HTMLCanvasElement | null;
        let votedByVoterStatsCanvasMM: HTMLCanvasElement | null;
        let voteStatsCanvasPD: HTMLCanvasElement | null;
        let votedByVoterStatsCanvasPD: HTMLCanvasElement | null;

        onMount(() => {
                connectingLiveDashboard();

                return () => {
                        cleanupLiveDashboard();
                }
        });

        $effect(() => {
                useChartVotesStatsEffect();
                useVoterTokenEffect();
        });

        $effect(() => {
                if (!voteStatsCanvasMM || !votedByVoterStatsCanvasMM || !voteStatsCanvasPD || !votedByVoterStatsCanvasPD) return;

                // Data
                let votedCount: {
                        [key in Campus]: number;
                } = {
                        MM: (Object.values($useChartVotesStats["MM"]).length > 0)?(Object.values($useChartVotesStats["MM"]).reduce((a,b) => a+b)):0,
                        PD: (Object.values($useChartVotesStats["PD"]).length > 0)?(Object.values($useChartVotesStats["PD"]).reduce((a,b) => a+b)):0,
                };
                console.debug(votedCount);

                let isAnyVoteData: {
                        [key in Campus]: boolean;
                } = {
                        MM: votedCount["MM"] != 0,
                        PD: votedCount["PD"] != 0,
                };

                // Chart Generation
                let chart1MM = new Chart(voteStatsCanvasMM, {
                        type: "pie",
                        data: {
                                labels: isAnyVoteData["MM"] ? Object.keys($useChartVotesStats["MM"]) : ["No Votes Data"],
                                datasets: [
                                        {
                                                data: isAnyVoteData["MM"] ? Object.values($useChartVotesStats["MM"]) : [1],
                                                backgroundColor: isAnyVoteData["MM"] ? ["#52ACFF", "#ACCC99"] : ["#333"],
                                        },
                                ],
                        },
                        options: {
                                plugins: {
                                        legend: {
                                                labels: {
                                                        color: "white",
                                                },
                                                onClick: !isAnyVoteData["MM"]
                                                        ? (e, legendItem, legend) => {
                                                                  e.native?.preventDefault();
                                                          }
                                                        : undefined,
                                        },
                                        tooltip: {
                                                enabled: isAnyVoteData["MM"],
                                        },
                                },
                        },
                });
                let chart2MM = new Chart(votedByVoterStatsCanvasMM, {
                        type: "pie",
                        data: {
                                labels: ["Voted", "Haven't Voted"],
                                datasets: [
                                        {
                                                data: [votedCount["MM"], $useNumOfVoters["MM"] - votedCount["MM"]],
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
                                                onClick: !isAnyVoteData["MM"]
                                                        ? (e, legendItem, legend) => {
                                                                  e.native?.preventDefault();
                                                          }
                                                        : undefined,
                                        },
                                },
                        },
                });
                let chart1PD = new Chart(voteStatsCanvasPD, {
                        type: "pie",
                        data: {
                                labels: isAnyVoteData["PD"] ? Object.keys($useChartVotesStats["PD"]) : ["No Votes Data"],
                                datasets: [
                                        {
                                                data: isAnyVoteData["PD"] ? Object.values($useChartVotesStats["PD"]) : [1],
                                                backgroundColor: isAnyVoteData["PD"] ? ["#52ACFF", "#ACCC99"] : ["#333"],
                                        },
                                ],
                        },
                        options: {
                                plugins: {
                                        legend: {
                                                labels: {
                                                        color: "white",
                                                },
                                                onClick: !isAnyVoteData["PD"]
                                                        ? (e, legendItem, legend) => {
                                                                  e.native?.preventDefault();
                                                          }
                                                        : undefined,
                                        },
                                        tooltip: {
                                                enabled: isAnyVoteData["PD"],
                                        },
                                },
                        },
                });

                let chart2PD = new Chart(votedByVoterStatsCanvasPD, {
                        type: "pie",
                        data: {
                                labels: ["Voted", "Haven't Voted"],
                                datasets: [
                                        {
                                                data: [votedCount["PD"], $useNumOfVoters["PD"] - votedCount["PD"]],
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
                                                onClick: !isAnyVoteData["PD"]
                                                        ? (e, legendItem, legend) => {
                                                                  e.native?.preventDefault();
                                                          }
                                                        : undefined,
                                        },
                                },
                        },
                });

                return () => {
                        chart1MM.destroy();
                        chart2MM.destroy();
                        chart1PD.destroy();
                        chart2PD.destroy();
                };
        });
</script>

<div class="w-full h-full flex flex-col md:flex-row gap-4 items-center">
        <div class="flex flex-col items-center gap-4 w-full h-full p-4 py-2">
                <p class="text-2xl font-semibold">Kampus MM</p>
                <div class="flex flex-col gap-4 items-center w-full *:w-full">
                        <div class="h-62 border border-white rounded-xl p-4 gap-2 flex flex-col justify-center items-center">
                                <canvas class="max-w-64" bind:this={voteStatsCanvasMM}></canvas>
                                <p class="w-full text-center font-thin text-md">Voter per Candidates</p>
                        </div>
                        <div class="h-62 border border-white rounded-xl p-4 gap-2 flex flex-col justify-center items-center">
                                <canvas class="max-w-64" bind:this={votedByVoterStatsCanvasMM}></canvas>
                                <p class="w-full text-center font-thin text-md">Number of Votes</p>
                        </div>
                </div>
        </div>
        <div class="flex flex-col items-center gap-4 w-full h-full p-4 py-2">
                <p class="text-2xl font-semibold">Kampus PD</p>
                <div class="flex flex-col gap-4 items-center w-full *:w-full">
                        <div class="h-62 border border-white rounded-xl p-4 gap-2 flex flex-col justify-center items-center">
                                <canvas class="max-w-64" bind:this={voteStatsCanvasPD}></canvas>
                                <p class="w-full text-center font-thin text-md">Voter per Candidates</p>
                        </div>
                        <div class="h-62 border border-white rounded-xl p-4 gap-2 flex flex-col justify-center items-center">
                                <canvas class="max-w-64" bind:this={votedByVoterStatsCanvasPD}></canvas>
                                <p class="w-full text-center font-thin text-md">Number of Votes</p>
                        </div>
                </div>
        </div>
</div>
