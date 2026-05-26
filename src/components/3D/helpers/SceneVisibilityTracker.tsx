"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MyRoomHandle } from "@/components/3D/components/MyRoom";
import { isAnyObjectInView, isObjectInView } from "./objectInView";

export interface SceneVisibility {
  cupInView: boolean;
  wallDecorInView: boolean;
}

interface SceneVisibilityTrackerProps {
  roomRef: React.RefObject<MyRoomHandle | null>;
  onVisibilityChange: (visibility: SceneVisibility) => void;
}

export default function SceneVisibilityTracker({
  roomRef,
  onVisibilityChange,
}: SceneVisibilityTrackerProps) {
  const { invalidate } = useThree();
  const lastCup = useRef(true);
  const lastWall = useRef(false);

  useFrame(({ camera }) => {
    const room = roomRef.current;
    if (!room) return;

    const cupInView = room.cup
      ? isObjectInView(camera, room.cup)
      : false;
    const wallDecorInView = isAnyObjectInView(camera, room.wallDecor);

    const cupChanged = cupInView !== lastCup.current;
    const wallChanged = wallDecorInView !== lastWall.current;

    if (cupChanged || wallChanged) {
      lastCup.current = cupInView;
      lastWall.current = wallDecorInView;
      onVisibilityChange({ cupInView, wallDecorInView });
      invalidate();
    }
  });

  return null;
}
