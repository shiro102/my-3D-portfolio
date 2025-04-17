import { DirectionalLightHelper, CameraHelper } from "three";
import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const LightHelper = ({ showHelpers = false }: { showHelpers?: boolean }) => {
  const lightRef = useRef<THREE.DirectionalLight>(null!);
  const bounceLightRef = useRef<THREE.DirectionalLight>(null!);
  const { scene } = useThree();
  const scaleLevel = 1/0.085

  useEffect(() => {
    if (!showHelpers || !lightRef.current) return;

    const light = lightRef.current;
    const dirHelper = new DirectionalLightHelper(light, 1);
    const shadowCamHelper = new CameraHelper(light.shadow.camera);
    const bounceHelper = new DirectionalLightHelper(
      bounceLightRef.current,
      0.5
    );

    scene.add(dirHelper);
    scene.add(shadowCamHelper);
    scene.add(bounceHelper);

    return () => {
      scene.remove(dirHelper);
      scene.remove(shadowCamHelper);
      scene.remove(bounceHelper);
    };
  }, [showHelpers]);

  return (
    <>
      <directionalLight
        ref={lightRef}
        castShadow
        position={[-3 * scaleLevel, 1.5 * scaleLevel, -1 * scaleLevel]}
        intensity={6}
        color={0xffffcc}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5 * scaleLevel}
        shadow-camera-far={20 * scaleLevel}
        shadow-camera-left={-3 * scaleLevel}
        shadow-camera-right={2 * scaleLevel}
        shadow-camera-top={0.1 * scaleLevel}
        shadow-camera-bottom={-3 * scaleLevel}
        shadow-bias={-0.0001}
      />

      <directionalLight
        ref={bounceLightRef}
        position={[0 * scaleLevel, 3 * scaleLevel, 1 * scaleLevel]}
        intensity={2.5}
        color={0xffffff}
      />
    </>
  );
};

export default LightHelper;