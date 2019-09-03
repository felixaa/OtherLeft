import { usePrevious } from './usePrevious';

export function useWhenIncreases(func, value) {
  const prevValue = usePrevious(value);
  if (prevValue < value) func();
}
