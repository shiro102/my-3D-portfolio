import { DirectionalLightHelper, CameraHelper } from "three";
import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const LightHelper = () => {
  const lightRef = useRef<THREE.DirectionalLight>(null!);
  const bounceLightRef = useRef<THREE.DirectionalLight>(null!);
  const { scene } = useThree();

  useEffect(() => {
    if (lightRef.current) {
      const light = lightRef.current;

      // Visual helper for the light direction
      const dirHelper = new DirectionalLightHelper(light, 1);
      scene.add(dirHelper);

      // 🔍 Shadow camera helper
      const shadowCamHelper = new CameraHelper(light.shadow.camera);
      scene.add(shadowCamHelper);
      
      // 💬 Bounce light helper
      const bounceHelper = new DirectionalLightHelper(
        bounceLightRef.current,
        0.5
      );
      scene.add(bounceHelper);

      // Optional: Tweak shadow camera settings here too
      light.shadow.mapSize.width = 1024;
      light.shadow.mapSize.height = 1024;

      return () => {
        scene.remove(dirHelper);
        scene.remove(shadowCamHelper);
        scene.remove(bounceHelper);
      };
    }
  }, []);

  return (
    <>
      <directionalLight
        ref={lightRef}
        castShadow
        position={[-3, 2, -1]} // raise it higher for "sunlight"
        intensity={5}
        color={0xffffcc} // warm, natural tone
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-2}
        shadow-camera-right={2}
        shadow-camera-top={0.1}
        shadow-camera-bottom={-3}
        shadow-bias={-0.0001}
      />

      <directionalLight
        ref={bounceLightRef}
        position={[0, 3, 1]} // Approx where your window is
        intensity={2} // Softer light
        color={0xffffff}
      />
    </>
  );
};

export default LightHelper;
