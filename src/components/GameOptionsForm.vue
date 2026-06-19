<script setup lang="ts">
import InputNumber from "primevue/inputnumber";
import Select from "primevue/select";
import ToggleSwitch from "primevue/toggleswitch";
import type { GameOption, OptionValue, OptionValues } from "@/games/types";

const props = defineProps<{ options: GameOption[]; modelValue: OptionValues }>();
const emit = defineEmits<{ "update:modelValue": [OptionValues] }>();

function setValue(key: string, value: OptionValue): void {
  emit("update:modelValue", { ...props.modelValue, [key]: value });
}
</script>

<template>
  <ul class="flex flex-col gap-2">
    <li v-for="option in options" :key="option.key" class="rounded-2xl bg-[var(--mb-surface)] p-4">
      <!-- Label, with a small inline control (toggle) on the right. -->
      <div class="flex items-center gap-4">
        <div class="min-w-0 flex-1">
          <div class="font-medium">{{ option.label }}</div>
          <div v-if="option.help" class="mt-0.5 text-sm text-[var(--mb-muted)]">
            {{ option.help }}
          </div>
        </div>
        <ToggleSwitch
          v-if="option.kind === 'boolean'"
          :model-value="modelValue[option.key] as boolean"
          @update:model-value="setValue(option.key, $event)"
        />
      </div>

      <!-- Wide controls get their own full-width row so values never truncate. -->
      <Select
        v-if="option.kind === 'select'"
        :model-value="modelValue[option.key] as string"
        :options="option.choices"
        option-label="label"
        option-value="value"
        class="mt-3 w-full"
        @update:model-value="setValue(option.key, $event)"
      />

      <InputNumber
        v-else-if="option.kind === 'number'"
        :model-value="modelValue[option.key] as number"
        :min="option.min"
        :max="option.max"
        show-buttons
        button-layout="horizontal"
        class="mt-3 w-full"
        @update:model-value="setValue(option.key, $event)"
      />
    </li>
  </ul>
</template>
