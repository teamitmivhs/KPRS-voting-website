<script lang="ts">
        import type { CandidateType } from "../../lib/types";
        import Frame from "../../assets/materials/frame.webp";


        let {
                candidate,
                index,
                no,
                select_candidate,
        }: {
                candidate: CandidateType;
                index: number;
                no: number;
                select_candidate: (index: number) => void;
        } = $props();
</script>

<div class="w-[45vw] max-w-[550px] flex-1 aspect-square p-6 overflow-hidden ">
        <button class="relative w-full h-full grid grid-rows-[1fr_auto] cursor-pointer duration-200 hover:scale-105" type="button" onclick={() => select_candidate(index)}>
                <div class="relative">
                        <div class="absolute left-1/2 -translate-x-1/2 h-full aspect-square">
                                <img class="absolute w-full h-full" src={Frame} alt="frame">
                                <img class="absolute w-4/5 h-4/5 object-cover -z-1 duration-100 rounded-2xl left-[55%] top-1/2 -translate-1/2" src={candidate.image} alt={candidate.president} />
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
        </button>
</div>
