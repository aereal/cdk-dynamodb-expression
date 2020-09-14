function* createRefCounter(): Generator<number, number, boolean> {
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
