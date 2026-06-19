/** Pick a uniformly random element from a non-empty array. */
export function pickOne<T>(items: readonly T[]): T {
  const item = items[Math.floor(Math.random() * items.length)];
  if (item === undefined) {
    throw new Error("pickOne: cannot pick from an empty array");
  }
  return item;
}

/** Random integer in [min, max] inclusive. */
export function randomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}
