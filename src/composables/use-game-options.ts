import { computed } from "vue";
import type { WritableComputedRef } from "vue";
import { useLocalStorage } from "@vueuse/core";
import type { GameOption, OptionValues } from "@/games/types";

// Per-game option values, remembered between sessions. On first use the stored
// object is seeded from each option's declared default; later it's merged over
// defaults so newly-added options appear without wiping the user's choices.

function defaultsFor(options: GameOption[]): OptionValues {
  const values: OptionValues = {};
  for (const option of options) {
    values[option.key] = option.default;
  }
  return values;
}

export function useGameOptions(
  gameId: string,
  options: GameOption[],
): WritableComputedRef<OptionValues> {
  const defaults = defaultsFor(options);
  const stored = useLocalStorage<OptionValues>(`magicbox.options.${gameId}`, defaults, {
    mergeDefaults: true,
  });

  // Expose a view limited to the options this game currently declares, so stale
  // keys from removed options don't leak into createRound.
  return computed<OptionValues>({
    get() {
      const view: OptionValues = {};
      for (const option of options) {
        view[option.key] = stored.value[option.key] ?? option.default;
      }
      return view;
    },
    set(next) {
      stored.value = { ...stored.value, ...next };
    },
  });
}
