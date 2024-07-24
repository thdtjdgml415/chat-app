import { useCallback, useState } from "react";

// Part 1
const useToggle = (initialState: boolean = true) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle] as const;
};

// Part 5
export default useToggle;
