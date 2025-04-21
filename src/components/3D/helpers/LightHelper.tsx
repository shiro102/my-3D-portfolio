import { DirectionalLightHelper, CameraHelper } from "three";
import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const LightHelper = ({ showHelpers = false }: { showHelpers?: boolean }) => {
  const lightRef = useRef<THREE.DirectionalLight>(null!);
  const anotherLightRef = useRef<THREE.DirectionalLight>(null!);
  const bounceLightRef = useRef<THREE.DirectionalLight>(null!);
  const { scene } = useThree();
  const scaleLevel = 1 / 0.085;

  useEffect(() => {
    if (!showHelpers || !lightRef.current) return;

    const light = lightRef.current;
    const dirHelper = new DirectionalLightHelper(light, 1);
    const anotherLight = anotherLightRef.current;
    const anotherDirHelper = new DirectionalLightHelper(anotherLight, 1);
    const shadowCamHelper = new CameraHelper(light.shadow.camera);
    const anotherShadowCamHelper = new CameraHelper(light.shadow.camera);

    const bounceHelper = new DirectionalLightHelper(
      bounceLightRef.current,
      0.5
    );

    scene.add(dirHelper);
    scene.add(shadowCamHelper);
    scene.add(anotherDirHelper);
    scene.add(anotherShadowCamHelper);
    scene.add(bounceHelper);

    return () => {
      scene.remove(dirHelper);
      scene.remove(shadowCamHelper);
      scene.remove(bounceHelper);
      scene.remove(anotherDirHelper);
      scene.remove(anotherShadowCamHelper);
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

      <directionalLight
        ref={anotherLightRef}
        castShadow
        position={[0, 10, 5]} // light above and in front
        intensity={0.8}
        color={0xffffcc}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.001}
      />
    </>
  );
};

export default LightHelper;
