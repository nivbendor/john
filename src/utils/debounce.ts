export const debounce = (callback, wait) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
}