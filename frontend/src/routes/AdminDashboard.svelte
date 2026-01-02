<script lang="ts">
      import VotesGraph from "../components/admin-dashboard/VotesGraph.svelte";
      import VotesTable from "../components/admin-dashboard/VotesTable.svelte";
</script>

<div class="h-flex flex-col items-center p-8">
      <div class="w-full h-full flex flex-col items-center bg-slate-800 p-4 rounded-2xl border border-white">
            <h1 class="text-4xl font-semibold uppercase">Admin Dashboard</h1>
            <p class="text-lg font-thin">Welcome to the admin dashboard!</p>
      </div>
      <div class="w-full h-full text-center flex flex-col mt-4 bg-slate-800 p-4 rounded-2xl border border-white">
            <h1 class="text-3xl">Votes Statistics</h1>
            <p class="font-thin">Let's see which candidate has the most votes!</p>
            <VotesGraph />
      </div>
      <div class="w-full h-full text-center flex flex-col mt-4 bg-slate-800 p-4 rounded-2xl border border-white">
            <h1 class="text-3xl">Table Votes</h1>
            <p class="font-thin">Here's the table to know who votes which</p>
            <VotesTable />
      </div>
</div>
