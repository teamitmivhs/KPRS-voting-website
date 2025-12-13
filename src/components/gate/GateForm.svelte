<script lang="ts">
      import { api, ApiError } from "../../lib/api";
      import { toasts } from "../../lib/toast";

      let isLoading = $state(false);
      
      let username = $state('');
      let token = $state('');

	async function handleLogin(event: Event) {
		event.preventDefault();
            if(isLoading) return;

            isLoading = true;
		const result = await api.getUserData(username, token);
            isLoading = false;

            if (result === undefined) {
                  toasts.add({
                        title: 'Login',
                        message: 'Login successful',
                        type: 'success',
                        duration: 2000
                  });

                  setTimeout(() => {
                        window.location.hash = '/vote';
                  }, 2000);
            }
		else if (result === ApiError.Unauthorized) {
                  toasts.add({
                        title: 'Wrong Token',
                        message: 'Token is not valid',
                        type: 'error',
                        duration: 5000
                  });
		}
            else if (result === ApiError.ServerError) {
                  toasts.add({
                        title: 'Server Error!',
                        message: 'Something went wrong',
                        type: 'error',
                        duration: 5000
                  });
            }
            else {
                  toasts.add({
                        title: 'Unknown Error!',
                        message: 'Something went wrong',
                        type: 'error',
                        duration: 5000
                  });
            }
	}
</script>

<form onsubmit={handleLogin} class="flex flex-col **:text-[#8a7143] gap-4 w-[90vw] md:w-full max-w-sm bg-white text-[#8a7143] p-8 rounded-2xl shadow-xl border border-[#8a7143]/10">
      <div class="flex flex-col">
            <label for="username" class="text-md font-semibold ml-1">Username</label>
            <input
                  type="text"
                  id="username"
                  bind:value={username}
                  placeholder="Enter your username"
                  class="w-full p-3 rounded-xl border-2 border-[#8a7143]/40 bg-gray-50 focus:outline-none focus:border-[#8a7143] focus:ring-2 focus:ring-[#8a7143]/20 transition-all placeholder:text-gray-400"
                  required
            />
      </div>

      <div class="flex flex-col">
            <label for="token" class="text-md font-semibold ml-1">Token</label>
            <input
                  type="password"
                  id="token"
                  bind:value={token}
                  placeholder="Enter your token"
                  class="w-full p-3 rounded-xl border-2 border-[#8a7143]/40 bg-gray-50 focus:outline-none focus:border-[#8a7143] focus:ring-2 focus:ring-[#8a7143]/20 transition-all placeholder:text-gray-400"
                  required
            />
      </div>

      <div class="flex justify-center">
            <button type="submit" disabled={isLoading} class="{isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} mt-4 bg-white text-[#8a7143] rounded-full px-6 py-3 text-xl font-semibold cursor-pointer duration-150 border border-2 border-[#8a7143] satisfying-button">
                  {isLoading ? 'Loading...' : 'Enter Gate'}
            </button>
      </div>
</form>