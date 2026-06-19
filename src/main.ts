import Aura from "@primeuix/themes/aura";
import PrimeVue from "primevue/config";
import { createApp } from "vue";
import App from "@/App.vue";
import { router } from "@/router";
import "primeicons/primeicons.css";
import "@/styles/theme.css";

createApp(App)
  .use(router)
  // darkModeSelector matches the `data-theme` attribute so PrimeVue flips with
  // Tailwind's `dark:` variant; cssLayer slots PrimeVue under Tailwind's
  // utilities in the layer order pinned in theme.css.
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '[data-theme="dark"]',
        cssLayer: { name: "primevue", order: "theme, base, primevue" },
      },
    },
  })
  .mount("#app");
