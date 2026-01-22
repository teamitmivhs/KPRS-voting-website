<script lang="ts">
      import { api } from "../../lib/api";
      import { toasts } from "../../lib/hooks/useToast";
      import { userDataStore } from "../../lib/hooks/useUserdata";

      let isLoading = $state(false);

      let username = $state("");
      let token = $state("");

      async function handleLogin(event: Event) {
            event.preventDefault();
            if (isLoading) return;

            isLoading = true;
            const result = await api.getUserData(username, token);
            isLoading = false;

            if (typeof result == "object") {
                  toasts.add({
                        title: "Login",
                        message: "Login berhasil",
                        type: "success",
                        duration: 2000,
                  });

                  userDataStore.set(result);

                  setTimeout(() => {
                        window.location.hash = "/vote";
                  }, 2000);
            } else {
                  toasts.showAPI(result);
            }
      }
</script>

<form onsubmit={handleLogin} class="flex flex-col **:text-[#caa173] gap-4 w-[90vw] md:w-full max-w-sm bg-[#7b1226] shadow-[0_0_30px_2px_#892141] text-[#8a7143] p-8 rounded-2xl border border-[#8a7143]/10">
      <div class="flex flex-col">
            <label for="username" class="text-md font-semibold ml-1">Nama</label>
            <input
                  type="text"
                  id="username"
                  bind:value={username}
                  placeholder="Namanya jangan sampe salah!"
                  class="w-full p-3 rounded-xl border-2 border-[#8a7143]/40 focus:outline-none focus:border-[#8a7143] focus:ring-2 focus:ring-[#8a7143]/20 transition-all placeholder:text-gray-400"
                  required
            />
      </div>

      <div class="flex flex-col">
            <label for="token" class="text-md font-semibold ml-1">Token</label>
            <input
                  type="password"
                  id="token"
                  bind:value={token}
                  placeholder="Masukkan token kalian!"
                  class="w-full p-3 rounded-xl border-2 border-[#8a7143]/40 focus:outline-none focus:border-[#8a7143] focus:ring-2 focus:ring-[#8a7143]/20 transition-all placeholder:text-gray-400"
                  required
            />
      </div>

      <div class="flex justify-center">
            <button
                  type="submit"
                  disabled={isLoading}
                  class="{isLoading
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer'} mt-4 bg-[#892141] text-[#8a7143] rounded-full px-6 py-3 text-xl font-semibold cursor-pointer duration-150 border-2 border-[#8a7143] satisfying-button"
            >
                  {isLoading ? "Loading..." : "Enter Gate"}
            </button>
      </div>
</form>
