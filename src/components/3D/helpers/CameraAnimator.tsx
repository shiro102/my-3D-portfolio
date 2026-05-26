// components/CameraAnimator.tsx
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import gsap from "gsap";
import { OrbitControls as OrbitControlsProps } from "three-stdlib";
import * as THREE from "three";
import { MyRoomHandle } from "../components/MyRoom";

interface CameraAnimatorProps {
  trigger: boolean;
  resetCount: number;
  initialCameraPosition: THREE.Vector3;
  initialControlsTarget: THREE.Vector3;
  setCamera: React.Dispatch<React.SetStateAction<boolean>>;
  controlsRef: React.RefObject<OrbitControlsProps | null>;
  screenRef: React.RefObject<MyRoomHandle | null>;
  setFinishedCameraAnimating: React.Dispatch<React.SetStateAction<boolean>>;
}

const CameraAnimator = ({
  trigger,
  resetCount,
  initialCameraPosition,
  initialControlsTarget,
  setCamera,
  controlsRef,
  screenRef,
  setFinishedCameraAnimating,
}: CameraAnimatorProps) => {
  const { camera, invalidate } = useThree();
  const scaleLevel = 1 / 0.085;

  useEffect(() => {
    if (!trigger || !controlsRef.current) return;

    const controls = controlsRef.current;
    setFinishedCameraAnimating(false);
    invalidate();

    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(controls.target);

    gsap.to(camera.position, {
      duration: 2,
      x: -0.3 * scaleLevel,
      y: 0.2 * scaleLevel,
      z: -1.3 * scaleLevel,
      ease: "power2.out",
      onUpdate: () => {
        if (screenRef.current?.screen?.position) {
          const pos = screenRef.current.screen.getWorldPosition(
            new THREE.Vector3()
          );
          controls.target.copy(pos);
          controls.update();
        }
        invalidate();
      },
      onComplete: () => {
        gsap.to(camera.position, {
          duration: 2,
          x: -0.55 * scaleLevel,
          y: -0.45 * scaleLevel,
          z: -1.2 * scaleLevel,
          ease: "power2.out",
          onUpdate: () => {
            if (screenRef.current?.screen?.position) {
              const pos = screenRef.current.screen.getWorldPosition(
                new THREE.Vector3()
              );
              controls.target.copy(pos);
              controls.update();
            }
            invalidate();
          },
          onComplete: () => {
            setCamera(false);
            setFinishedCameraAnimating(true);
          },
        });
      },
    });
  }, [
    trigger,
    camera,
    invalidate,
    controlsRef,
    screenRef,
    setCamera,
    setFinishedCameraAnimating,
    scaleLevel,
  ]);

  useEffect(() => {
    if (resetCount === 0 || !controlsRef.current) return;

    const controls = controlsRef.current;
    setCamera(false);
    setFinishedCameraAnimating(false);
    invalidate();

    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(controls.target);

    gsap.to(camera.position, {
      duration: 2,
      x: initialCameraPosition.x,
      y: initialCameraPosition.y,
      z: initialCameraPosition.z,
      ease: "power2.out",
      onUpdate: () => invalidate(),
      onComplete: () => invalidate(),
    });

    gsap.to(controls.target, {
      duration: 2,
      x: initialControlsTarget.x,
      y: initialControlsTarget.y,
      z: initialControlsTarget.z,
      ease: "power2.out",
      onUpdate: () => {
        controls.update();
        invalidate();
      },
      onComplete: () => invalidate(),
    });
  }, [
    resetCount,
    camera,
    invalidate,
    controlsRef,
    initialCameraPosition,
    initialControlsTarget,
    setCamera,
    setFinishedCameraAnimating,
  ]);

  return null;
};

export default CameraAnimator;
