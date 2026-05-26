"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

/** Ensures at least one frame renders after the Canvas mounts (demand frameloop). */
export function InitialInvalidate() {
  const { invalidate } = useThree();
  useEffect(() => {
    invalidate();
  }, [invalidate]);
  return null;
}

/** Re-render when a value outside the Canvas tree changes (e.g. Leva FOV). */
export function InvalidateOnChange({ deps }: { deps: readonly unknown[] }) {
  const { invalidate } = useThree();
  useEffect(() => {
    invalidate();
    // deps are spread intentionally — caller passes reactive values (e.g. zoom)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invalidate, ...deps]);
  return null;
}
