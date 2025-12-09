<script lang="ts">
	let username = '';
	let token = '';

	function handleLogin(event: Event) {
		event.preventDefault();
		console.log('Login attempt', { username, token });
		// Add actual login logic here later
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
            <button type="submit" class="mt-4 bg-white text-[#8a7143] rounded-full px-6 py-3 text-xl font-semibold cursor-pointer duration-150 border border-2 border-[#8a7143] satisfying-button">
                  Enter Gate
            </button>
      </div>
</form>