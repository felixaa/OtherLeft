import { useEffect } from 'react';

export const useWhenFalse = (func, value) => {
  const effect = () => {
    if (!value) func();
  };
  useEffect(effect, [value]);
};
