// components/CameraAnimator.tsx
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import gsap from "gsap";
import { OrbitControls as OrbitControlsProps } from "three-stdlib";
import * as THREE from "three";
import { MyRoomHandle } from "../components/MyRoom";

interface CameraAnimatorProps {
  trigger: boolean;
  setCamera: React.Dispatch<React.SetStateAction<boolean>>;
  controlsRef: React.RefObject<OrbitControlsProps | null>;
  screenRef: React.RefObject<MyRoomHandle | null>;
  setFinishedCameraAnimating: React.Dispatch<React.SetStateAction<boolean>>;
}

const CameraAnimator = ({ trigger, setCamera, controlsRef, screenRef, setFinishedCameraAnimating }: CameraAnimatorProps) => {
  const { camera } = useThree();
  const scaleLevel = 1/0.085

  useEffect(() => {
    if (trigger && controlsRef.current) {
      const controls = controlsRef.current;

      gsap.to(camera.position, {
        duration: 2,
        x: -0.30 * scaleLevel,
        y: 0.2 * scaleLevel,
        z: -1.3 * scaleLevel,
        ease: "power2.out",
        onUpdate: () => {
          if (screenRef.current?.screen?.position) {
            const pos = screenRef.current.screen.getWorldPosition(new THREE.Vector3());
            controls.target.copy(pos);
            controls.update();
          }
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
                const pos = screenRef.current.screen.getWorldPosition(new THREE.Vector3());
                controls.target.copy(pos);
                controls.update();
              }
            },
          });

          setCamera(false)
          setFinishedCameraAnimating(true)
          //   const target = { ...controls.target }; // current target
          //   gsap.to(target, {
          //     duration: 1.5,
          //     x: -0.25,
          //     y: -0.6,
          //     z: -0.5,
          //     ease: "power2.out",
          //     onUpdate: () => {
          //       controls.target.set(target.x, target.y, target.z);
          //       controls.update();
          //     },
          //   });
        },
      });
    }
  }, [trigger, camera]);

  return null;
};

export default CameraAnimator;
