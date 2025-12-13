<script lang="ts">
      import { api, ApiError } from "../lib/api";
      import { toasts } from "../lib/toast";

      const candidates = [
            {
                  president: "Rasyad Rizky Ramadhan",
                  vice_president: "Aldi Fadlurrahmman",
                  image: "/src/assets/candidates/candidate-1.jpg",
                  visi: "lorem ipsum dolor sit amet consectetur adipisicing elit",
                  misi: [
                        "lorem ipsum dolor sit amet consectetur adipisicing elit",
                        "lorem ipsum dolor sit amet consectetur adipisicing elit",
                        "lorem ipsum dolor sit amet consectetur adipisicing elit"
                  ]
            },
            {
                  president: "Andrea Farras",
                  vice_president: "Ghani Ilham",
                  image: "/src/assets/candidates/candidate-2.jpg",
                  visi: "lorem ipsum dolor sit amet consectetur adipisicing elit",
                  misi: [
                        "lorem ipsum dolor sit amet consectetur adipisicing elit",
                        "lorem ipsum dolor sit amet consectetur adipisicing elit",
                        "lorem ipsum dolor sit amet consectetur adipisicing elit"
                  ]
            }
      ];

      type CandidateState = "TIM" | "VISI" | "MISI";
      
      let current_candidate_state = $state<CandidateState[]>([
            "TIM",
            "TIM",
            "TIM"
      ]);
      let is_voting = $state<boolean>(false);

      async function vote_candidate(index: number) {
            is_voting = true;
            let result = await api.vote(candidates[index].president);
            if (result === undefined) {
                  toasts.add({
                        title: "Sukses!",
                        message: "Terima kasih telah melakukan voting!",
                        type: "success"
                  });
                  window.location.hash = "/logout";
            }
            else {
                  switch (result) {
                        case ApiError.Unauthorized:
                              toasts.add({
                                    title: "Akses ditolak!",
                                    message: "Anda tidak memiliki akses untuk melakukan voting!",
                                    type: "error"
                              });
                              break;
                        case ApiError.Conflict:
                              toasts.add({
                                    title: "Gagal!",
                                    message: "Anda sudah melakukan voting!",
                                    type: "error"
                              });
                              window.location.hash = "/logout"
                              break;
                        default:
                              toasts.add({
                                    title: "Terjadi kesalahan",
                                    message: "Terjadi kesalahan saat melakukan voting!",
                                    type: "error"
                              });
                              break;
                  }
            }
            is_voting = false;
      }
</script>

<div class="flex flex-col w-screen h-screen p-8 sm:p-18 gap-4">
      <div class="flex flex-col gap-0 w-full items-center">
            <h1 class="uppercase text-5xl font-thin italic">Use your <span class="font-bold">voice</span></h1>
            <p class="text-md font-normal">Gunakan suara-mu! Pilih yang menurut-mu terbaik!</p>
      </div>
      <div class="w-full max-w-full h-full flex-1 relative left-1/2 -translate-x-1/2 flex flex-col md:flex-row gap-4">
            {#each candidates as candidate, index}
                  <div class="w-full flex-1 aspect-2/3 p-6 overflow-hidden">
                        <div class="relative w-full h-full flex flex-col">
                              <img class="absolute w-full h-full object-cover z-0 duration-100 rounded-2xl brightness-50" src={candidate.image} alt={candidate.president}  />
                              <div class="w-full h-full p-4 z-1 flex flex-col">
                                    <div class="w-full flex flex-row justify-between">
                                          <p class="text-5xl font-thin italic z-1">#{index + 1}</p>
                                          <button class="bg-[#8a7143] z-1 px-6 py-2 rounded-2xl border border-white cursor-pointer duration-200 hover:scale-110 active:scale-100" onclick={() => vote_candidate(index)}>VOTE !</button>
                                    </div>
                                    <div class="flex-1 w-full flex flex-row items-end py-4 overflow-hidden">
                                          {#if current_candidate_state[index] == 'TIM'}
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
                                          {:else if current_candidate_state[index] == 'VISI'}
                                                <div class="w-full flex flex-col justify-end">
                                                      <div>
                                                            <p class="text-md font-light">Visi:</p>
                                                            <p class="font-semibold wrap-break-word">{candidate.visi}</p>
                                                      </div>
                                                </div>
                                          {:else if current_candidate_state[index] == 'MISI'}
                                                <div class="w-full flex flex-col justify-end">
                                                      <div>
                                                            <p class="text-md font-light">Misi:</p>
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
                                          <button class="rounded-2xl px-8 py-2 satisfying-button {current_candidate_state[index] == 'TIM' ? 'active' : ''}" onclick={() => current_candidate_state[index] = 'TIM'}>Tim</button>
                                          <button class="rounded-2xl px-8 py-2 satisfying-button {current_candidate_state[index] == 'VISI' ? 'active' : ''}" onclick={() => current_candidate_state[index] = 'VISI'}>Visi</button>
                                          <button class="rounded-2xl px-8 py-2 satisfying-button {current_candidate_state[index] == 'MISI' ? 'active' : ''}" onclick={() => current_candidate_state[index] = 'MISI'}>Misi</button>
                                    </div>
                              </div>
                        </div>
                  </div>
            {/each}
      </div>
</div>
