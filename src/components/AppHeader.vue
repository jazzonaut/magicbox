<script setup lang="ts">
import { useRouter } from "vue-router";

defineProps<{ title: string; back?: boolean }>();

const router = useRouter();

function goBack(): void {
  if (window.history.state?.back) {
    router.back();
  } else {
    void router.push({ name: "home" });
  }
}
</script>

<template>
  <header class="flex items-center gap-2 pt-[max(env(safe-area-inset-top),1rem)] pb-3">
    <button
      v-if="back"
      type="button"
      aria-label="Back"
      class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl text-[var(--mb-muted)] active:bg-[var(--mb-surface)]"
      @click="goBack"
    >
      <i class="pi pi-chevron-left" />
    </button>
    <h1 class="flex-1 truncate text-xl font-bold">{{ title }}</h1>
    <slot name="action" />
  </header>
</template>
