<script lang="ts">
	import GateForm from "../components/gate/GateForm.svelte";
</script>

<div class="min-h-screen w-full px-4 flex flex-col justify-center items-center bg-[#8a7143] text-[#fdfaf5] gap-8">
    <div class="flex flex-col items-center gap-2">
        <h1 class="text-4xl font-bold">Voter Gate</h1>
        <p class="opacity-80 text-center">Enter your credentials to access the voting system</p>
    </div>

    <GateForm />
</div>
