<script setup lang="ts">
import { ref, watch } from "vue";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import type { Player } from "@/games/types";

const props = defineProps<{ visible: boolean; player?: Player | null }>();
const emit = defineEmits<{
  "update:visible": [boolean];
  save: [{ name: string; emoji?: string }];
}>();

const EMOJI_CHOICES = [
  "😀",
  "😎",
  "🤓",
  "🥳",
  "😈",
  "👻",
  "🤖",
  "👽",
  "🦊",
  "🐼",
  "🐸",
  "🦄",
  "🐯",
  "🐙",
  "🦁",
  "🐵",
  "🦖",
  "🌟",
  "🔥",
  "⚡",
];

const name = ref("");
const emoji = ref<string | undefined>(undefined);

// Reset the form whenever the dialog opens (for add) or targets a player (edit).
watch(
  () => props.visible,
  (open) => {
    if (open) {
      name.value = props.player?.name ?? "";
      emoji.value = props.player?.emoji;
    }
  },
);

function close(): void {
  emit("update:visible", false);
}

function save(): void {
  if (!name.value.trim()) {
    return;
  }
  emit("save", emoji.value ? { name: name.value, emoji: emoji.value } : { name: name.value });
  close();
}
</script>

<template>
  <Dialog
    :visible="visible"
    modal
    dismissable-mask
    :header="player ? 'Edit player' : 'Add player'"
    :style="{ width: '20rem' }"
    @update:visible="emit('update:visible', $event)"
  >
    <div class="flex flex-col gap-4">
      <div>
        <label class="mb-1 block text-sm text-[var(--mb-muted)]">Name</label>
        <InputText
          v-model="name"
          class="w-full"
          autofocus
          placeholder="e.g. Mum"
          @keyup.enter="save"
        />
      </div>

      <div>
        <label class="mb-1 block text-sm text-[var(--mb-muted)]">Emoji (optional)</label>
        <div class="grid grid-cols-8 gap-1">
          <button
            v-for="choice in EMOJI_CHOICES"
            :key="choice"
            type="button"
            class="grid aspect-square place-items-center rounded-lg text-xl transition active:scale-90"
            :class="emoji === choice ? 'bg-[var(--mb-accent)]' : 'bg-[var(--mb-surface-2)]'"
            @click="emoji = emoji === choice ? undefined : choice"
          >
            {{ choice }}
          </button>
        </div>
      </div>
    </div>

    <template #footer>
      <Button label="Cancel" text severity="secondary" @click="close" />
      <Button label="Save" :disabled="!name.trim()" @click="save" />
    </template>
  </Dialog>
</template>
