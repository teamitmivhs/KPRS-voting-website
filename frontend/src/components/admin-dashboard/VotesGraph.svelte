<script lang="ts">
        import Chart from "chart.js/auto";
        import { useNumOfVoters, useChartVotesPDStats, useChartVotesMMStats, useChartVotesStatsEffect, useVoterTokenEffect } from "../../lib/hooks/useStats";
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
                if (!voteStatsCanvasMM || !votedByVoterStatsCanvasMM) return;

                // Data
                let votedCount: number = (Object.values($useChartVotesMMStats).length > 0)?(Object.values($useChartVotesMMStats).reduce((a,b) => a+b)):0;
                let isAnyVoteData: boolean = votedCount != 0;

                // Chart Generation
                let chart1MM = new Chart(voteStatsCanvasMM, {
                        type: "pie",
                        data: {
                                labels: isAnyVoteData ? Object.keys($useChartVotesMMStats) : ["No Votes Data"],
                                datasets: [
                                        {
                                                data: isAnyVoteData ? Object.values($useChartVotesMMStats) : [1],
                                                backgroundColor: isAnyVoteData ? ["#52ACFF", "#ACCC99"] : ["#333"],
                                        },
                                ],
                        },
                        options: {
                                plugins: {
                                        legend: {
                                                labels: {
                                                        color: "white",
                                                },
                                                onClick: !isAnyVoteData
                                                        ? (e, legendItem, legend) => {
                                                                  e.native?.preventDefault();
                                                          }
                                                        : undefined,
                                        },
                                        tooltip: {
                                                enabled: isAnyVoteData,
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
                                                data: [votedCount, $useNumOfVoters["MM"] - votedCount],
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
                                                onClick: !isAnyVoteData
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
                };
        });
        $effect(() => {
                if (!voteStatsCanvasPD || !votedByVoterStatsCanvasPD) return;

                // Data
                let votedCount: number = (Object.values($useChartVotesPDStats).length > 0)?(Object.values($useChartVotesPDStats).reduce((a,b) => a+b)):0;
                let isAnyVoteData: boolean = votedCount != 0;

                let chart1PD = new Chart(voteStatsCanvasPD, {
                        type: "pie",
                        data: {
                                labels: isAnyVoteData ? Object.keys($useChartVotesPDStats) : ["No Votes Data"],
                                datasets: [
                                        {
                                                data: isAnyVoteData ? Object.values($useChartVotesPDStats) : [1],
                                                backgroundColor: isAnyVoteData ? ["#52ACFF", "#ACCC99"] : ["#333"],
                                        },
                                ],
                        },
                        options: {
                                plugins: {
                                        legend: {
                                                labels: {
                                                        color: "white",
                                                },
                                                onClick: !isAnyVoteData
                                                        ? (e, legendItem, legend) => {
                                                                  e.native?.preventDefault();
                                                          }
                                                        : undefined,
                                        },
                                        tooltip: {
                                                enabled: isAnyVoteData,
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
                                                data: [votedCount, $useNumOfVoters["PD"] - votedCount],
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
                                                onClick: !isAnyVoteData
                                                        ? (e, legendItem, legend) => {
                                                                  e.native?.preventDefault();
                                                          }
                                                        : undefined,
                                        },
                                },
                        },
                });

                return () => {
                        chart1PD.destroy();
                        chart2PD.destroy();
                };
        })
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
