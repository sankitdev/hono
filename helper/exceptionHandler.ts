export const exceptionHandler =
  (fn) =>
  async (...args) =>
    await Promise.resolve(fn(...args)).catch((error) => {
      throw new Error(error.message);
    });
