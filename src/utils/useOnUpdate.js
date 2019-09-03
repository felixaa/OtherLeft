import { usePrevious } from './usePrevious';

export function useOnUpdate(func, value) {
    const prevValue = usePrevious(value);
    func(prevValue);
}
