<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "primevue/button";
import type { Player, SecretCard } from "@/games/types";

const props = defineProps<{ cards: SecretCard[]; players: Player[] }>();
const emit = defineEmits<{ done: [] }>();

const index = ref(0);
const revealed = ref(false);

const byId = computed(() => new Map(props.players.map((p) => [p.id, p])));
const current = computed(() => props.cards[index.value]);
const currentPlayer = computed(() => {
  const card = current.value;
  return card ? byId.value.get(card.playerId) : undefined;
});
const isLast = computed(() => index.value >= props.cards.length - 1);

function reveal(): void {
  revealed.value = true;
}

function next(): void {
  revealed.value = false;
  if (isLast.value) {
    emit("done");
    return;
  }
  index.value += 1;
}
</script>

<template>
  <div v-if="current" class="mb-no-select flex flex-1 flex-col">
    <!-- Pass stage: hide the secret until the right person taps. -->
    <div
      v-if="!revealed"
      class="flex flex-1 flex-col items-center justify-center gap-8 text-center"
    >
      <div>
        <p class="text-sm uppercase tracking-wide text-[var(--mb-muted)]">Pass the phone to</p>
        <p class="mt-2 text-4xl font-bold">
          <span v-if="currentPlayer?.emoji" class="mr-1">{{ currentPlayer.emoji }}</span
          >{{ currentPlayer?.name }}
        </p>
        <p class="mt-3 text-sm text-[var(--mb-muted)]">
          Player {{ index + 1 }} of {{ cards.length }}
        </p>
      </div>
      <Button
        label="Reveal my word"
        icon="pi pi-eye"
        size="large"
        class="w-full max-w-xs"
        @click="reveal"
      />
    </div>

    <!-- Reveal stage: the secret card, only while held. -->
    <div v-else class="flex flex-1 flex-col items-center justify-center gap-8 text-center">
      <div
        class="flex max-h-[65vh] w-full max-w-xs flex-col items-center gap-3 overflow-y-auto rounded-3xl bg-[var(--mb-surface)] px-6 py-12"
        :style="{ boxShadow: `inset 0 0 0 2px ${current.accent ?? 'transparent'}` }"
      >
        <p
          class="text-4xl font-extrabold break-words"
          :style="{ color: current.accent ?? 'var(--mb-fg)' }"
        >
          {{ current.title }}
        </p>
        <p v-if="current.subtitle" class="text-base text-[var(--mb-muted)]">
          {{ current.subtitle }}
        </p>
      </div>
      <Button
        :label="isLast ? 'Hide & start playing' : 'Hide & pass on'"
        icon="pi pi-eye-slash"
        size="large"
        severity="secondary"
        class="w-full max-w-xs"
        @click="next"
      />
    </div>
  </div>
</template>
