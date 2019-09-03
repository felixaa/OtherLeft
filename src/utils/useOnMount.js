import { useEffect } from "react";

export function useOnMount(f) {
  useEffect(f, []);
}
