<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useElementBounding, useIntersectionObserver } from "@vueuse/core";
import Button from "primevue/button";
import { getGame } from "@/games/registry";
import { usePlayers } from "@/composables/use-players";
import { useGameOptions } from "@/composables/use-game-options";
import AppHeader from "@/components/AppHeader.vue";
import GameOptionsForm from "@/components/GameOptionsForm.vue";
import PlayerEditorDialog from "@/components/PlayerEditorDialog.vue";

const props = defineProps<{ gameId: string }>();
const router = useRouter();

const game = getGame(props.gameId);
if (!game) {
  void router.replace({ name: "home" });
}

const { players, selectedPlayers, addPlayer, toggleSelected, isSelected } = usePlayers();
// Always a valid ref so the template needn't null-check; keyed harmlessly when
// the game is missing (we've already redirected away in that case).
const optionValues = useGameOptions(game?.id ?? "none", game?.options ?? []);

const dialogOpen = ref(false);

// Scroll affordance: show a "more below" hint until the end of the content is in
// view. A sentinel + observer copes with any content height and resizes, and we
// measure the fixed start bar so the hint always floats just above it.
const startBar = ref<HTMLElement | null>(null);
const bottomSentinel = ref<HTMLElement | null>(null);
const atBottom = ref(true);
const { height: startBarHeight } = useElementBounding(startBar);

useIntersectionObserver(bottomSentinel, (entries) => {
  atBottom.value = entries[0]?.isIntersecting ?? true;
});

const showScrollHint = computed(() => !atBottom.value && startBarHeight.value > 0);

function scrollToBottom(): void {
  bottomSentinel.value?.scrollIntoView({ behavior: "smooth", block: "end" });
}

const enough = computed(() => !!game && selectedPlayers.value.length >= game.minPlayers);
const tooMany = computed(
  () => !!game && game.maxPlayers !== undefined && selectedPlayers.value.length > game.maxPlayers,
);
const canStart = computed(() => enough.value && !tooMany.value);

function start(): void {
  if (game && canStart.value) {
    void router.push({ name: "round", params: { gameId: game.id } });
  }
}
</script>

<template>
  <div v-if="game" class="flex flex-1 flex-col pb-28">
    <AppHeader :title="`${game.emoji} ${game.name}`" back />

    <section class="mb-6">
      <div class="mb-2 flex items-center justify-between">
        <h2 class="text-sm font-semibold uppercase tracking-wide text-[var(--mb-muted)]">
          Who's playing?
        </h2>
        <button
          type="button"
          class="flex items-center gap-1 text-sm text-[var(--mb-accent)]"
          @click="dialogOpen = true"
        >
          <i class="pi pi-plus text-xs" /> Add
        </button>
      </div>

      <ul v-if="players.length" class="flex flex-col gap-2">
        <li v-for="player in players" :key="player.id">
          <button
            type="button"
            class="flex w-full items-center gap-3 rounded-2xl p-3 text-left transition active:scale-[0.99]"
            :class="
              isSelected(player.id)
                ? 'bg-[var(--mb-surface-2)]'
                : 'bg-[var(--mb-surface)] opacity-60'
            "
            @click="toggleSelected(player.id)"
          >
            <span
              class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--mb-bg)] text-xl"
            >
              {{ player.emoji ?? "🙂" }}
            </span>
            <span class="min-w-0 flex-1 truncate font-medium">{{ player.name }}</span>
            <i
              class="pi text-lg"
              :class="
                isSelected(player.id)
                  ? 'pi-check-circle text-[var(--mb-accent)]'
                  : 'pi-circle text-[var(--mb-muted)]'
              "
            />
          </button>
        </li>
      </ul>

      <button
        v-else
        type="button"
        class="w-full rounded-2xl border border-dashed border-[var(--mb-surface-2)] p-6 text-center text-[var(--mb-muted)]"
        @click="dialogOpen = true"
      >
        Tap to add your first player
      </button>
    </section>

    <section v-if="game.options.length" class="mb-6">
      <h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--mb-muted)]">
        Options
      </h2>
      <GameOptionsForm v-model="optionValues" :options="game.options" />
    </section>

    <!-- Marks the end of the scrollable content for the "more below" hint. -->
    <div ref="bottomSentinel" aria-hidden="true" class="h-px w-full" />

    <!-- "More below" affordance: fades the content into the start bar and nudges
         with a bouncing chevron; vanishes once the bottom is in view. -->
    <Transition name="fade">
      <button
        v-if="showScrollHint"
        type="button"
        aria-label="Scroll down for more options"
        class="fixed inset-x-0 z-10 mx-auto flex max-w-md justify-center"
        :style="{ bottom: `${startBarHeight + 4}px` }"
        @click="scrollToBottom"
      >
        <span
          class="flex h-12 w-full items-end justify-center bg-gradient-to-t from-[var(--mb-bg)] via-[var(--mb-bg)] to-transparent"
        >
          <span
            class="mb-1 flex items-center gap-1 rounded-full bg-[var(--mb-surface-2)] px-3 py-1 text-xs font-medium text-[var(--mb-muted)] shadow-sm"
          >
            More options
            <i class="pi pi-chevron-down animate-bounce text-[0.65rem]" />
          </span>
        </span>
      </button>
    </Transition>

    <!-- Fixed start bar so it's always thumb-reachable. -->
    <div
      ref="startBar"
      class="fixed inset-x-0 bottom-0 mx-auto w-full max-w-md border-t border-[var(--mb-surface)] bg-[var(--mb-bg)] px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3"
    >
      <p v-if="!enough" class="mb-2 text-center text-sm text-[var(--mb-muted)]">
        Select at least {{ game.minPlayers }} players ({{ selectedPlayers.length }} selected)
      </p>
      <p v-else-if="tooMany" class="mb-2 text-center text-sm text-[var(--mb-muted)]">
        Too many — {{ game.name }} allows up to {{ game.maxPlayers }} players
      </p>
      <Button
        label="Start game"
        icon="pi pi-play"
        size="large"
        class="mb-3 w-full"
        :disabled="!canStart"
        @click="start"
      />
    </div>

    <PlayerEditorDialog v-model:visible="dialogOpen" @save="(d) => addPlayer(d.name, d.emoji)" />
  </div>
</template>
