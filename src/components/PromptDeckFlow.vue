<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "primevue/button";
import type { PromptCard } from "@/games/types";

const props = defineProps<{ prompts: PromptCard[] }>();
const emit = defineEmits<{ shuffle: [] }>();

const index = ref(0);

const current = computed(() => props.prompts[index.value]);
const atStart = computed(() => index.value === 0);
const atEnd = computed(() => index.value >= props.prompts.length - 1);

function next(): void {
  if (!atEnd.value) {
    index.value += 1;
  }
}

function previous(): void {
  if (!atStart.value) {
    index.value -= 1;
  }
}
</script>

<template>
  <div class="mb-no-select flex flex-1 flex-col">
    <!-- The prompt, large and centred. -->
    <div class="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <p class="text-2xl font-bold leading-snug break-words">{{ current?.text }}</p>
      <p class="text-sm text-[var(--mb-muted)]">{{ index + 1 }} / {{ prompts.length }}</p>
    </div>

    <!-- Navigation pinned near the thumb. -->
    <div class="flex flex-col gap-3 pb-2">
      <div class="flex gap-3">
        <Button
          label="Back"
          icon="pi pi-chevron-left"
          severity="secondary"
          size="large"
          class="flex-1"
          :disabled="atStart"
          @click="previous"
        />
        <Button
          label="Next"
          icon="pi pi-chevron-right"
          icon-pos="right"
          size="large"
          class="flex-1"
          :disabled="atEnd"
          @click="next"
        />
      </div>
      <Button
        :label="atEnd ? 'Shuffle & go again' : 'Shuffle deck'"
        icon="pi pi-refresh"
        severity="secondary"
        text
        class="w-full"
        @click="emit('shuffle')"
      />
    </div>
  </div>
</template>
