<script>
      import Router from "svelte-spa-router";
      import Gate from "./routes/Gate.svelte";
      import Vote from "./routes/Vote.svelte";
      import ToastContainer from "./components/common/ToastContainer.svelte";
      import Logout from "./routes/Logout.svelte";
      import AdminGate from "./routes/AdminGate.svelte";
      import AdminDashboard from "./routes/AdminDashboard.svelte";
      import Thanks from "./routes/Thanks.svelte";

      const routes = {
            "/": Gate,
            "/vote": Vote,
            "/logout": Logout,
            "/thanks": Thanks,
            "/admin": AdminGate,
            "/admin/dashboard": AdminDashboard,
      };
</script>

<svelte:head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Funnel+Sans:ital,wght@0,300..800;1,300..800&family=Saira:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
</svelte:head>

<Router {routes} />
<ToastContainer />
