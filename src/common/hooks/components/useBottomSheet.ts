import { useCallback, useState } from "react";

export function useBottomSheet(initialVisible = false) {
  const [visible, setVisible] = useState(initialVisible);
  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

  return { visible, open, close, setVisible };
}