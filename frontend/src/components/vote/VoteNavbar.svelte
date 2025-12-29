<script lang="ts">
      import profileIcon from "../../assets/icons/profile-icon.webp";
      import { userDataStore } from "../../lib/hooks/useUserdata";

      function handleLogoutClick() {
            window.location.hash = "/logout";
      }
</script>

<nav
      class="w-[90vw] max-w-[1000px] h-18 py-4 px-4 flex flex-row gap-4 justify-between items-center fixed top-4 left-1/2 -translate-x-1/2 transparent rounded-full border border-white z-100 bg-[#8a7143]"
>
      <div class="flex flex-row gap-2 justify-end items-center relative">
            <img src={profileIcon} alt="Profile" class="w-14 h-14 cursor-pointer" />
            <div class="flex flex-col gap-0">
                  <p class="text-xl font-semibold">{$userDataStore?.name}</p>
                  <p class="text-sm">{$userDataStore?.class}</p>
            </div>
      </div>

      <button onclick={handleLogoutClick} class="satisfying-button p-2 rounded-full navbar-link">Logout</button>
</nav>
