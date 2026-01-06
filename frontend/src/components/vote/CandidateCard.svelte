<script lang="ts">
        import type { CandidateType } from "../../lib/types";
        import Frame from "../../assets/materials/frame.png";


        let {
                candidate,
                index,
                no,
                vote_candidate,
        }: {
                candidate: CandidateType;
                index: number;
                no: number;
                vote_candidate: (index: number) => void;
        } = $props();
</script>

<div class="w-full flex-1 h-full p-6 overflow-hidden">
        <div class="relative w-full h-full grid grid-rows-[1fr_auto]">
                <div class="relative">
                        <div class="absolute left-1/2 -translate-x-1/2 h-full aspect-square">
                                <img class="absolute w-full h-full" src={Frame} alt="frame">
                                <img class="absolute w-full h-full object-cover -z-1 duration-100 rounded-2xl" src={candidate.image} alt={candidate.president} />
                        </div>
                </div>
                <div class="w-full h-full p-4 z-1 flex flex-col">
                        <div class="flex-1 w-full flex flex-col gap-2 items-center py-4 overflow-hidden">
                                <p class="text-3xl font-bold drop-shadow-[0_1.2px_4px_#f00]">Paslon {no}</p>
                                <div class="w-full flex flex-col justify-end items-center text-center">
                                        <p class="text-2xl font-semibold drop-shadow-[0_1.2px_4px_#f00]">{candidate.president}</p>
                                        <p class="text-2xl font-semibold drop-shadow-[0_1.2px_4px_#f00]">{candidate.vice_president}</p>
                                </div>
                        </div>
                </div>
        </div>
</div>
