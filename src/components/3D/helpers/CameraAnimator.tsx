// components/CameraAnimator.tsx
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import gsap from "gsap";
import { OrbitControls as OrbitControlsProps } from "three-stdlib";

interface CameraAnimatorProps {
  trigger: boolean;
  controlsRef: React.RefObject<OrbitControlsProps | null>;
}

const CameraAnimator = ({ trigger, controlsRef }: CameraAnimatorProps) => {
  const { camera } = useThree();

  useEffect(() => {
    if (trigger && controlsRef.current) {
      const controls = controlsRef.current;

      gsap.to(camera.position, {
        duration: 2,
        x: 0,
        y: 0,
        z: -2,
        ease: "power2.out",
        onUpdate: () => {
          controls.target.set(-0.25, -0.5, -0.6);
          controls.update(); // keep controls in sync during animation
        },
        onComplete: () => {
          gsap.to(camera.position, {
            duration: 2,
            x: -0.15,
            y: -0.6,
            z: -0.9,
            ease: "power2.out",
            // onUpdate: () => {
            //   controls.target.set(-0.25, -0.5, -1);
            //   controls.update(); // keep controls in sync during animation
            // },
          });
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
