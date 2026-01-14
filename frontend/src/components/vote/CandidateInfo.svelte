<script lang="ts">
    import type { CandidateType } from "../../lib/types";
    import Frame from "../../assets/materials/frame.png";

        let {
                candidate,
                index,
                no,
                back_action,
                vote_action
        }: {
                candidate: CandidateType;
                index: number;
                no: number;
                back_action: () => void;
                vote_action: (index: number) => Promise<void>;
        } = $props();
</script>

<div class="px-12 w-full h-full flex flex-col md:flex-row justify-center items-center gap-48">
        <div class="relative w-min flex justify-center items-center p-10">
                <div class="relative w-78 aspect-square">
                        <img class="absolute w-full aspect-square" src={Frame} alt="frame">
                        <img class="absolute w-3/4 aspect-square object-cover -z-1 duration-100 rounded-2xl left-1/2 top-1/2 -translate-1/2" src={candidate.image} alt={candidate.president} />
                </div>
        </div>
        <div class="relative text-center md:text-left w-full flex flex-col justify-center">
                <h1 class="drop-shadow-[0_1.2px_4px_#f00]">Paslon {no}</h1>
                <h1 class="text-3xl font-semibold drop-shadow-[0_1.2px_4px_#f00]">{candidate.president}</h1>
                <p class="text-2xl drop-shadow-[0_1.2px_4px_#f00]">{candidate.vice_president}</p>
                <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 translate-y-full flex flex-row gap-4">
                        <button class="w-34 py-3 bg-black rounded-3xl border border-white cursor-pointer hover:bg-white" onclick={() => vote_action(index)}>Vote</button>
                        <button class="w-34 py-3 bg-white text-black rounded-3xl border border-white cursor-pointer" onclick={back_action}>Back</button>
                </div>
        </div>
</div>
<div class="relative w-full h-full flex flex-row gap-18 justify-center">
        <div class="text-center flex-1 bg-black/75 rounded-3xl p-12 space-y-8">
                <h1 class="text-center w-full text-3xl font-semibold drop-shadow-[0_1.2px_4px_#f00]">Vision</h1>
                <p>{candidate.vision}</p>
        </div>
        <div class="flex-1 bg-black/75 rounded-3xl p-12 space-y-8">
                <h1 class="text-center w-full text-3xl font-semibold drop-shadow-[0_1.2px_4px_#f00]">Mission</h1>
                <ul class="flex flex-col text-left space-y-4 list-disc font-thin">
                        {#each candidate.misions as mission}
                                <li>{mission}</li>
                        {/each}
                </ul>
        </div>
</div>
