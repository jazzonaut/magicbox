<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import { getGame } from "@/games/registry";
import { usePlayers } from "@/composables/use-players";
import { useGameOptions } from "@/composables/use-game-options";
import type { Player, Round } from "@/games/types";
import SecretRevealFlow from "@/components/SecretRevealFlow.vue";

const props = defineProps<{ gameId: string }>();
const router = useRouter();

const game = getGame(props.gameId);
const { selectedPlayers } = usePlayers();

// Guard against deep-links / reloads with no valid setup.
if (!game || selectedPlayers.value.length < (game?.minPlayers ?? 0)) {
  void router.replace(
    game ? { name: "setup", params: { gameId: props.gameId } } : { name: "home" },
  );
}

const optionValues = game ? useGameOptions(game.id, game.options) : null;

// Snapshot the players for this round so roster edits mid-round can't shift the
// deal. Re-snapshotted only on "New round".
const roundPlayers = ref<Player[]>([]);
const round = ref<Round>({ cards: [] });
const stage = ref<"reveal" | "done">("reveal");
const flowKey = ref(0);

function deal(): void {
  if (!game || !optionValues) {
    return;
  }
  roundPlayers.value = [...selectedPlayers.value];
  round.value = game.createRound(roundPlayers.value, optionValues.value);
  stage.value = "reveal";
  flowKey.value += 1;
}

function newRound(): void {
  deal();
}

function backToSetup(): void {
  void router.push({ name: "setup", params: { gameId: props.gameId } });
}

// Leave the game entirely, back to the picker.
function exit(): void {
  void router.push({ name: "home" });
}

if (game) {
  deal();
}
</script>

<template>
  <div v-if="game" class="flex flex-1 flex-col">
    <!-- Persistent bar so the game can always be left mid-round. -->
    <header class="flex items-center justify-between pt-[max(env(safe-area-inset-top),1rem)] pb-3">
      <span class="truncate text-sm font-medium text-[var(--mb-muted)]">
        {{ game.emoji }} {{ game.name }}
      </span>
      <button
        type="button"
        aria-label="Close game"
        class="flex h-10 w-10 items-center justify-center rounded-full text-xl text-[var(--mb-muted)] active:bg-[var(--mb-surface)]"
        @click="exit"
      >
        <i class="pi pi-times" />
      </button>
    </header>

    <!-- Reveal sequence -->
    <SecretRevealFlow
      v-if="stage === 'reveal'"
      :key="flowKey"
      :cards="round.cards"
      :players="roundPlayers"
      @done="stage = 'done'"
    />

    <!-- Everyone has seen their word: hand-off to live discussion. -->
    <div v-else class="flex flex-1 flex-col items-center justify-center gap-8 text-center">
      <div>
        <p class="text-6xl">🗣️</p>
        <h2 class="mt-4 text-2xl font-bold">Everyone's in!</h2>
        <p class="mt-2 text-[var(--mb-muted)]">
          Start discussing and find the impostor. Tap below for a fresh round with the same players.
        </p>
      </div>
      <div class="flex w-full max-w-xs flex-col gap-3">
        <Button
          label="New round"
          icon="pi pi-refresh"
          size="large"
          class="w-full"
          @click="newRound"
        />
        <Button
          label="Back to setup"
          icon="pi pi-cog"
          severity="secondary"
          text
          class="w-full"
          @click="backToSetup"
        />
      </div>
    </div>
  </div>
</template>
