/**
 * @internal
 */
export type RefCounter = Generator<number, never, never>;

/**
 * @internal
 */
export function* createRefCounter(): RefCounter {
  let n = 0;
  while (true) {
    yield n;
    n++;
  }
}
