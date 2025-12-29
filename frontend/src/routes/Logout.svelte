<script lang="ts">
      import { api } from "../lib/api";
      import { toasts } from "../lib/hooks/useToast";

      api.logout().catch(() => {
            toasts.add({
                  title: "Gagal!",
                  message: "Terjadi kesalahan saat logout!",
                  type: "error"
            });
      }).finally(() => {
            window.location.hash = "/gate";
      });
</script>