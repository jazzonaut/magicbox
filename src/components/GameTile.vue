<script setup lang="ts">
import type { GameDefinition } from "@/games/types";

defineProps<{ game: GameDefinition }>();
</script>

<template>
  <button
    type="button"
    class="mb-no-select flex w-full items-center gap-4 rounded-2xl bg-[var(--mb-surface)] p-4 text-left transition active:scale-[0.98] active:bg-[var(--mb-surface-2)]"
  >
    <span
      class="grid h-14 w-14 shrink-0 place-items-center self-start rounded-xl bg-[var(--mb-surface-2)] text-3xl"
    >
      {{ game.emoji }}
    </span>
    <span class="min-w-0 flex-1">
      <span class="block text-lg font-semibold">{{ game.name }}</span>
      <span class="mt-0.5 block text-sm text-[var(--mb-muted)]">{{ game.description }}</span>
    </span>
    <i class="pi pi-chevron-right shrink-0 self-center text-[var(--mb-muted)]" />
  </button>
</template>
