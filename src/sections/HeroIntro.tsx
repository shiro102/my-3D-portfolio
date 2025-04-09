import React, { useRef, useState } from "react";
import MyRoom from "@/components/MyRoom";
// import MyRoomAntique from "@/components/MyRoomAntique";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Center,
  OrbitControls,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "../components/Loading";
import LightHelper from "../components/LightHelper";
import CameraAnimator from "@/components/CameraAnimator";
import { OrbitControls as OrbitControlsProps } from 'three-stdlib';
import SteamRibbon from "@/components/SteamRibbon";

const HeroIntro = () => {
  const [animateCamera, setAnimateCamera] = useState(false);
  const controlsRef = useRef<OrbitControlsProps>(null);

  return (
    <div
      className="min-h-screen"
    >
      {/* Canvas  */}
      <div className="h-screen relative">
        {/* Button overlay */}
        <button
          className=" bg-blue-600 text-white px-4 py-2 rounded shadow absolute top-2/3 right-1/2 z-40 cursor-pointer hover:opacity-90"
          onClick={() => setAnimateCamera(true)}
        >
          Zoom In
        </button>

        <Canvas
          shadows
          camera={{ position: [3, 5, 5], fov: 50 }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.outputColorSpace = THREE.SRGBColorSpace; // updated from outputEncoding
          }}
        >
          {/* <Environment preset="sunset" background={false} far={100} /> */}

          {/* Lights */}
          <ambientLight intensity={1.3} color={0xffffff} />
          <LightHelper />

          <Suspense fallback={<CanvasLoader />}>
            <CameraAnimator trigger={animateCamera} controlsRef={controlsRef} />
            <Center>
              <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                <MyRoom />
                {/* <MyRoomAntique /> */}
              </group>
            </Center>
          </Suspense>

          {/* Soft contact shadow under the room */}
          <ContactShadows
            position={[0, -3.4, 0]}
            opacity={0.3}
            scale={10}
            blur={2}
            far={4.5}
          />

          {/* Cup's steam */}
          <SteamRibbon position= {[0.3, -0.47, -0.95]} />
          <OrbitControls ref={controlsRef} maxPolarAngle={Math.PI / 2} enableZoom={true} />
        </Canvas>
      </div>
    </div>
  );
};

export default HeroIntro;
