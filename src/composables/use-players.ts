import { computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
import type { Player } from "@/games/types";

// The roster and the "who's playing" tick state are the engine's only durable
// data. Both live in localStorage (via useLocalStorage, reactive + persisted)
// so they survive reloads and carry across games and rounds.
const players = useLocalStorage<Player[]>("magicbox.players", []);
const selectedIds = useLocalStorage<string[]>("magicbox.selectedPlayerIds", []);

function newId(): string {
  return crypto.randomUUID();
}

export function usePlayers() {
  const selectedPlayers = computed(() =>
    players.value.filter((p) => selectedIds.value.includes(p.id)),
  );

  function addPlayer(name: string, emoji?: string): Player {
    const trimmed = name.trim();
    const player: Player = emoji?.trim()
      ? { id: newId(), name: trimmed, emoji: emoji.trim() }
      : { id: newId(), name: trimmed };
    players.value = [...players.value, player];
    // A freshly added player joins the next game by default.
    selectedIds.value = [...selectedIds.value, player.id];
    return player;
  }

  function updatePlayer(id: string, name: string, emoji?: string): void {
    players.value = players.value.map((p) => {
      if (p.id !== id) {
        return p;
      }
      const trimmed = name.trim();
      return emoji?.trim() ? { id, name: trimmed, emoji: emoji.trim() } : { id, name: trimmed };
    });
  }

  function removePlayer(id: string): void {
    players.value = players.value.filter((p) => p.id !== id);
    selectedIds.value = selectedIds.value.filter((sid) => sid !== id);
  }

  function toggleSelected(id: string): void {
    selectedIds.value = selectedIds.value.includes(id)
      ? selectedIds.value.filter((sid) => sid !== id)
      : [...selectedIds.value, id];
  }

  function isSelected(id: string): boolean {
    return selectedIds.value.includes(id);
  }

  return {
    players,
    selectedPlayers,
    addPlayer,
    updatePlayer,
    removePlayer,
    toggleSelected,
    isSelected,
  };
}
