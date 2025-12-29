<script lang="ts">
      import { ApiError, Campus } from "../../lib/types";
      import { toasts } from "../../lib/hooks/useToast";
      import { api } from "../../lib/api";

      let isLoading = $state(false);

      let admin_id = $state("");
      let password = $state("");

      async function handleLogin(event: Event) {
            event.preventDefault();
            if (isLoading) return;

            isLoading = true;
            const result = await api.adminLogin(admin_id, password);
            isLoading = false;

            if (result === undefined) {
                  toasts.add({
                        title: "Login",
                        message: "Login berhasil",
                        type: "success",
                        duration: 2000,
                  });

                  setTimeout(() => {
                        window.location.hash = "/admin/dashboard";
                  }, 2000);
            } else if (result === ApiError.Unauthorized) {
                  toasts.add({
                        title: "Password Tidak Valid",
                        message: "Password tidak valid",
                        type: "error",
                        duration: 5000,
                  });
            } else if (result === ApiError.NotFound) {
                  toasts.add({
                        title: "Password Tidak Valid",
                        message: "Password tidak valid",
                        type: "error",
                        duration: 5000,
                  });
            } else if (result === ApiError.ServerError) {
                  toasts.add({
                        title: "Server Error!",
                        message: "Terjadi kesalahan pada server",
                        type: "error",
                        duration: 5000,
                  });
            } else {
                  toasts.add({
                        title: "Terjadi kesalahan!",
                        message: "Terjadi kesalahan",
                        type: "error",
                        duration: 5000,
                  });
            }
      }
</script>

<form onsubmit={handleLogin} class="flex flex-col **:text-[#8a7143] gap-4 w-[90vw] md:w-full max-w-sm bg-white text-[#8a7143] p-8 rounded-2xl shadow-xl border border-[#8a7143]/10">
      <div class="flex flex-col">
            <label for="admin_id" class="text-md font-semibold ml-1">Admin ID</label>
            <input
                  type="text"
                  id="admin_id"
                  bind:value={admin_id}
                  placeholder="Enter your admin ID"
                  class="w-full p-3 rounded-xl border-2 border-[#8a7143]/40 bg-gray-50 focus:outline-none focus:border-[#8a7143] focus:ring-2 focus:ring-[#8a7143]/20 transition-all placeholder:text-gray-400"
                  required
            />
      </div>

      <div class="flex flex-col">
            <label for="password" class="text-md font-semibold ml-1">Admin Password</label>
            <input
                  type="password"
                  id="password"
                  bind:value={password}
                  placeholder="Enter your admin password"
                  class="w-full p-3 rounded-xl border-2 border-[#8a7143]/40 bg-gray-50 focus:outline-none focus:border-[#8a7143] focus:ring-2 focus:ring-[#8a7143]/20 transition-all placeholder:text-gray-400"
                  required
            />
      </div>

      <div class="flex justify-center">
            <button
                  type="submit"
                  disabled={isLoading}
                  class="{isLoading
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer'} mt-4 bg-white text-[#8a7143] rounded-full px-6 py-3 text-xl font-semibold cursor-pointer duration-150 border-2 border-[#8a7143] satisfying-button"
            >
                  {isLoading ? "Loading..." : "Enter Dashboard"}
            </button>
      </div>
</form>
