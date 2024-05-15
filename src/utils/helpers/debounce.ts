export default function debounce<T extends unknown[]>(
  fn: (...args: T) => Promise<void>, // Now accepts async functions
  delay: number,
): (...args: T) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    timeoutId = setTimeout(async () => {
      try {
        await fn(...args);
      } catch (error) {
        // Add your desired error handling logic here
        console.error("Error in debounced function:", error);
      } finally {
        timeoutId = null; // Clear timeoutId after completion/error
      }
    }, delay);
  };
}
