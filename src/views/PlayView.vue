<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import { getGame } from "@/games/registry";
import { usePlayers } from "@/composables/use-players";
import { useGameOptions } from "@/composables/use-game-options";
import { pickOne } from "@/utils/random";
import type { Player, PromptCard, Round, SecretCard } from "@/games/types";
import SecretRevealFlow from "@/components/SecretRevealFlow.vue";
import PromptDeckFlow from "@/components/PromptDeckFlow.vue";

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
const round = ref<Round>({ kind: "secret", cards: [] });
const stage = ref<"reveal" | "done">("reveal");
const flowKey = ref(0);
// A randomly chosen player to kick things off (clue-giving / reading order).
const starter = ref<Player | null>(null);

// Narrow the round once here so the template stays simple.
const isPrompts = computed(() => round.value.kind === "prompts");
const secretCards = computed<SecretCard[]>(() =>
  round.value.kind === "secret" ? round.value.cards : [],
);
const promptCards = computed<PromptCard[]>(() =>
  round.value.kind === "prompts" ? round.value.prompts : [],
);

function deal(): void {
  if (!game || !optionValues) {
    return;
  }
  roundPlayers.value = [...selectedPlayers.value];
  round.value = game.createRound(roundPlayers.value, optionValues.value);
  starter.value = roundPlayers.value.length > 0 ? pickOne(roundPlayers.value) : null;
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

    <!-- Prompt-deck games: the group flips through shared cards together. -->
    <PromptDeckFlow
      v-if="isPrompts"
      :key="flowKey"
      :prompts="promptCards"
      :starter="starter"
      @shuffle="deal"
    />

    <!-- Secret games: pass-and-play reveal, then hand off to live discussion. -->
    <template v-else>
      <SecretRevealFlow
        v-if="stage === 'reveal'"
        :key="flowKey"
        :cards="secretCards"
        :players="roundPlayers"
        @done="stage = 'done'"
      />

      <div v-else class="flex flex-1 flex-col items-center justify-center gap-8 text-center">
        <div>
          <p class="text-6xl">🗣️</p>
          <h2 class="mt-4 text-2xl font-bold">Everyone's in!</h2>
          <p class="mt-2 text-[var(--mb-muted)]">
            Everyone has seen their card. Start the discussion! Tap below for a fresh round with the
            same players.
          </p>
        </div>
        <div v-if="starter" class="rounded-2xl bg-[var(--mb-surface)] px-6 py-4">
          <p class="text-sm uppercase tracking-wide text-[var(--mb-muted)]">First to speak</p>
          <p class="mt-1 text-2xl font-bold">
            <span v-if="starter.emoji" class="mr-1">{{ starter.emoji }}</span
            >{{ starter.name }}
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
    </template>
  </div>
</template>
