<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import { usePlayers } from "@/composables/use-players";
import type { Player } from "@/games/types";
import AppHeader from "@/components/AppHeader.vue";
import PlayerEditorDialog from "@/components/PlayerEditorDialog.vue";

const { players, addPlayer, updatePlayer, removePlayer } = usePlayers();

const dialogOpen = ref(false);
const editing = ref<Player | null>(null);

function openAdd(): void {
  editing.value = null;
  dialogOpen.value = true;
}

function openEdit(player: Player): void {
  editing.value = player;
  dialogOpen.value = true;
}

function onSave(data: { name: string; emoji?: string }): void {
  if (editing.value) {
    updatePlayer(editing.value.id, data.name, data.emoji);
  } else {
    addPlayer(data.name, data.emoji);
  }
}
</script>

<template>
  <div class="flex flex-1 flex-col">
    <AppHeader title="Players" back />

    <ul v-if="players.length" class="flex flex-col gap-2">
      <li
        v-for="player in players"
        :key="player.id"
        class="flex items-center gap-3 rounded-2xl bg-[var(--mb-surface)] p-3"
      >
        <span
          class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--mb-surface-2)] text-xl"
        >
          {{ player.emoji ?? "🙂" }}
        </span>
        <span class="min-w-0 flex-1 truncate font-medium">{{ player.name }}</span>
        <button
          type="button"
          aria-label="Edit"
          class="grid h-9 w-9 place-items-center rounded-full text-[var(--mb-muted)] active:bg-[var(--mb-surface-2)]"
          @click="openEdit(player)"
        >
          <i class="pi pi-pencil" />
        </button>
        <button
          type="button"
          aria-label="Remove"
          class="grid h-9 w-9 place-items-center rounded-full text-[var(--mb-muted)] active:bg-[var(--mb-surface-2)]"
          @click="removePlayer(player.id)"
        >
          <i class="pi pi-trash" />
        </button>
      </li>
    </ul>

    <p v-else class="mt-10 text-center text-[var(--mb-muted)]">
      No players yet. Add the people you play with.
    </p>

    <Button
      label="Add player"
      icon="pi pi-plus"
      class="mt-6 w-full"
      size="large"
      @click="openAdd"
    />

    <PlayerEditorDialog v-model:visible="dialogOpen" :player="editing" @save="onSave" />
  </div>
</template>
