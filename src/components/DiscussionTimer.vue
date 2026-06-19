<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import Button from "primevue/button";

// A simple discussion countdown. Auto-starts so the group can just talk; can be
// paused, resumed and reset. Counts down once and announces when time is up.
const props = defineProps<{ seconds: number }>();

const remaining = ref(props.seconds);
const running = ref(true);
let handle: ReturnType<typeof setInterval> | undefined;

const finished = computed(() => remaining.value <= 0);

const display = computed(() => {
  const total = Math.max(0, remaining.value);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
});

function stop(): void {
  if (handle !== undefined) {
    clearInterval(handle);
    handle = undefined;
  }
}

function tick(): void {
  remaining.value -= 1;
  if (remaining.value <= 0) {
    remaining.value = 0;
    running.value = false;
    stop();
    // A gentle nudge on phones that support it.
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate([120, 60, 120]);
    }
  }
}

function start(): void {
  stop();
  handle = setInterval(tick, 1000);
}

// Drive the interval from `running`, and (re)start cleanly if the duration prop
// changes — e.g. a fresh round with a different timer setting.
watch(
  running,
  (isRunning) => {
    if (isRunning && !finished.value) {
      start();
    } else {
      stop();
    }
  },
  { immediate: true },
);

watch(
  () => props.seconds,
  (next) => {
    remaining.value = next;
    running.value = true;
  },
);

function toggle(): void {
  if (finished.value) {
    return;
  }
  running.value = !running.value;
}

function reset(): void {
  remaining.value = props.seconds;
  running.value = true;
}

onBeforeUnmount(stop);
</script>

<template>
  <div
    class="flex w-full max-w-xs flex-col items-center gap-3 rounded-2xl bg-[var(--mb-surface)] px-6 py-4"
  >
    <p class="text-5xl font-bold tabular-nums" :class="finished ? 'text-[var(--p-red-400)]' : ''">
      {{ display }}
    </p>
    <p v-if="finished" class="text-sm font-medium text-[var(--p-red-400)]">Time's up!</p>
    <div class="flex gap-2">
      <Button
        v-if="!finished"
        :label="running ? 'Pause' : 'Resume'"
        :icon="running ? 'pi pi-pause' : 'pi pi-play'"
        severity="secondary"
        size="small"
        @click="toggle"
      />
      <Button
        label="Reset"
        icon="pi pi-replay"
        severity="secondary"
        text
        size="small"
        @click="reset"
      />
    </div>
  </div>
</template>
