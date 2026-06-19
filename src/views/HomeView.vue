<script setup lang="ts">
import { useRouter } from "vue-router";
import { games } from "@/games/registry";
import { usePlayers } from "@/composables/use-players";
import GameTile from "@/components/GameTile.vue";

const router = useRouter();
const { players } = usePlayers();

function openGame(id: string): void {
  void router.push({ name: "setup", params: { gameId: id } });
}
</script>

<template>
  <div class="flex flex-1 flex-col">
    <header
      class="flex items-center justify-between pt-[max(env(safe-area-inset-top),1.5rem)] pb-5"
    >
      <div>
        <h1 class="text-3xl font-extrabold">🎲 MagicBox</h1>
        <p class="text-sm text-[var(--mb-muted)]">Pick a game to play</p>
      </div>
      <RouterLink
        :to="{ name: 'players' }"
        class="flex items-center gap-2 rounded-full bg-[var(--mb-surface)] px-4 py-2 text-sm active:bg-[var(--mb-surface-2)]"
      >
        <i class="pi pi-users" />
        <span>{{ players.length }}</span>
      </RouterLink>
    </header>

    <ul class="flex flex-col gap-3">
      <li v-for="game in games" :key="game.id">
        <GameTile :game="game" @click="openGame(game.id)" />
      </li>
    </ul>
  </div>
</template>
