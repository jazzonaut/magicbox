<script setup lang="ts">
// The whole app is a single full-height column. Views own their own headers so
// the chrome stays minimal and each screen fills the phone.
</script>

<template>
  <div
    class="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-4 pb-[env(safe-area-inset-bottom)]"
  >
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
