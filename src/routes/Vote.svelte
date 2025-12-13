<script lang="ts">
      const candidates = [
            {
                  president: "Rasyad Rizky Ramadhan",
                  vice_president: "Aldi Fadlurrahmman",
                  image: "/src/assets/candidates/candidate-1.jpg",
            },
            {
                  president: "Andrea Farras",
                  vice_president: "Ghani Ilham",
                  image: "/src/assets/candidates/candidate-2.jpg",
            }
      ];
</script>

<div class="flex flex-col h-screen p-8 sm:p-18 gap-4">
      <div class="flex flex-col gap-0 w-full items-center">
            <h1 class="uppercase text-5xl font-thin italic">Use your <span class="font-bold">voice</span></h1>
            <p class="text-md font-normal">Gunakan suara-mu! Pilih yang menurut-mu terbaik!</p>
      </div>
      <div class="w-full lg:w-fit h-max sm:h-full flex-1 relative left-1/2 -translate-x-1/2 grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-4 place-items-start sm:place-content-center">
            {#each candidates as candidate, index}
                  <div class="h-[unset] lg:h-full w-full max-w-full p-6 aspect-2/3 overflow-hidden">
                        <div class="relative w-full h-full flex flex-col">
                              <img class="absolute w-full h-full object-cover z-0 duration-100 rounded-2xl" src={candidate.image} alt={candidate.president}  />
                              <div class="w-full h-full p-4 z-1 flex flex-col">
                                    <div class="w-full flex flex-row justify-start">
                                          <p class="text-5xl font-thin italic z-1">#{index + 1}</p>
                                    </div>
                                    <div class="flex-1"></div>
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
                                    <div class="h-8"></div>
                                    <div class="w-full h-16 flex flex-row gap-2 p-2 items-center justify-around border border-white rounded-2xl bg-[#8a7143]">
                                          <button class="rounded-2xl w-full h-full satisfying-button">Tim</button>
                                          <button class="rounded-2xl w-full h-full satisfying-button">Visi</button>
                                          <button class="rounded-2xl w-full h-full satisfying-button">Misi</button>
                                    </div>
                              </div>
                        </div>
                  </div>
            {/each}
      </div>
</div>
