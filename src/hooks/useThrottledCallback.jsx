import { useCallback, useEffect, useRef } from "react";
import throttle from "lodash/throttle";

export function useThrottledCallback(callback, delay, deps) {
  const throttledCallback = useRef(
    throttle((...args) => callback(...args), delay)
  ).current;

  useEffect(() => {
    throttledCallback.cancel();
  }, [throttledCallback]);

  return useCallback(
    (...args) => {
      throttledCallback(...args);
    },
    [throttledCallback, ...deps]
  );
}
