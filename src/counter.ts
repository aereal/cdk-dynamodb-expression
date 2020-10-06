/**
 * @internal
 */
export type RefCounter = Generator<number, number, boolean>;

/**
 * @internal
 */
export function* createRefCounter(): RefCounter {
  let n = 0;
  while (true) {
    const shouldReset = yield n;
    if (shouldReset) {
      n = 0;
    } else {
      n++;
    }
  }
}

/**
 * @internal
 */
export const refCounter = createRefCounter();

/**
 * @internal
 */
export const namesRefCounter = createRefCounter();
