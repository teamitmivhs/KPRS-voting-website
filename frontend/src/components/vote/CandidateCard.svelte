<script lang="ts">
      import type { CandidateType } from "../../lib/types";

      type CandidateState = "TIM" | "VISI" | "MISI";

      let {
            candidate,
            index,
            no,
            current_candidate_state = $bindable(),
            vote_candidate,
      }: {
            candidate: CandidateType;
            index: number;
            no: number;
            current_candidate_state: CandidateState[];
            vote_candidate: (index: number) => void;
      } = $props();
</script>

<div class="w-full flex-1 aspect-2/3 p-6 overflow-hidden">
      <div class="relative w-full h-full flex flex-col">
            <img class="absolute w-full h-full object-cover z-0 duration-100 rounded-2xl brightness-50" src={candidate.image} alt={candidate.president} />
            <div class="w-full h-full p-4 z-1 flex flex-col">
                  <div class="w-full flex flex-row justify-between">
                        <p class="text-5xl font-thin italic z-1">#{no}</p>
                        <button class="bg-[#8a7143] z-1 px-6 py-2 rounded-2xl border border-white cursor-pointer duration-200 hover:scale-110 active:scale-100" onclick={() => vote_candidate(index)}
                              >VOTE !</button
                        >
                  </div>
                  <div class="flex-1 w-full flex flex-row items-end py-4 overflow-hidden">
                        {#if current_candidate_state[index] == "TIM"}
                              <div class="w-full flex flex-col justify-end">
                                    <div>
                                          <p class="text-md font-light">Ketua:</p>
                                          <p class="text-3xl font-semibold">{candidate.president}</p>
                                    </div>
                                    <div>
                                          <p class="text-md font-light">Wakil Ketua:</p>
                                          <p class="text-3xl font-semibold">{candidate.vice_president}</p>
                                    </div>
                              </div>
                        {:else if current_candidate_state[index] == "VISI"}
                              <div class="w-full flex flex-col justify-end">
                                    <div>
                                          <p class="text-4xl font-light">Visi:</p>
                                          <p class="font-semibold wrap-break-word">{candidate.visi}</p>
                                    </div>
                              </div>
                        {:else if current_candidate_state[index] == "MISI"}
                              <div class="w-full flex flex-col justify-end">
                                    <div>
                                          <p class="text-4xl font-light">Misi:</p>
                                          <ol class="list-decimal">
                                                {#each candidate.misi as misi, index}
                                                      <li class="font-semibold wrap-break-word">{index + 1}. {misi}</li>
                                                {/each}
                                          </ol>
                                    </div>
                              </div>
                        {/if}
                  </div>
                  <div class="w-full h-16 flex flex-row gap-2 p-2 items-center justify-around border border-white rounded-2xl bg-[#8a7143]">
                        <button
                              class="rounded-2xl w-full max-w-62 h-12 satisfying-button {current_candidate_state[index] == 'TIM' ? 'active' : ''}"
                              onclick={() => (current_candidate_state[index] = "TIM")}>Tim</button
                        >
                        <button
                              class="rounded-2xl w-full max-w-62 h-12 satisfying-button {current_candidate_state[index] == 'VISI' ? 'active' : ''}"
                              onclick={() => (current_candidate_state[index] = "VISI")}>Visi</button
                        >
                        <button
                              class="rounded-2xl w-full max-w-62 h-12 satisfying-button {current_candidate_state[index] == 'MISI' ? 'active' : ''}"
                              onclick={() => (current_candidate_state[index] = "MISI")}>Misi</button
                        >
                  </div>
            </div>
      </div>
</div>
