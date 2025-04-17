import React, { useRef, useState, useEffect } from "react";
import MyRoom from "@/components/3D/components/MyRoom";
// import MyRoomAntique from "@/components/MyRoomAntique";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Center,
  OrbitControls,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "../../3D/helpers/CanvasLoader";
import LightHelper from "../../3D/helpers/LightHelper";
import CameraAnimator from "@/components/3D/helpers/CameraAnimator";
import { OrbitControls as OrbitControlsProps } from "three-stdlib";
import SteamRibbon from "@/components/3D/components/SteamRibbon";
import { Leva, useControls } from "leva";
import { MyRoomHandle } from "@/components/3D/components/MyRoom";
// import { CameraToObjectRay } from "@/components/3D/helpers/CameraToObjectRay";
// import { ObjectCenterMarker } from "@/components/3D/helpers/ObjectCenterMarker";

const WorkRoom3D = () => {
  const [animateCamera, setAnimateCamera] = useState(false);
  const controlsRef = useRef<OrbitControlsProps>(null);
  const screenRef = useRef<MyRoomHandle>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const scaleLevel = 1 / 0.085;
  // 🛠️ Panel toggle
  const { showLightHelpers } = useControls("Helpers", {
    showLightHelpers: false,
  });
  const { zoom } = useControls("Camera", {
    zoom: { value: 50, min: 10, max: 100, step: 1 },
  });

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.fov = zoom;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [zoom]);

  // Compute the mesh ref from your MyRoom component once it's available
  // const screenMesh = screenRef.current?.screen;

  // Ref for screen mesh
  // const targetScreenRef = useMemo(() => {
  //   return screenMesh ? { current: screenMesh } : null;
  // }, [screenMesh]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-red-50 pt-5 relative">
      <div className="flex justify-center items-center text-4xl md:text-6xl font-bold">
        My Work Room
      </div>
      {/* Leva panel */}
      <div className="absolute top-48 right-10 z-50">
        <Leva titleBar={true} fill />
      </div>

      {/* Canvas  */}
      <div className="h-screen relative">
        <Canvas
          shadows
          camera={{
            position: [3.7 * scaleLevel, 3.5 * scaleLevel, 5 * scaleLevel],
            fov: zoom,
          }}
          onCreated={({ gl, camera }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.outputColorSpace = THREE.SRGBColorSpace; // updated from outputEncoding
            cameraRef.current = camera as THREE.PerspectiveCamera;
          }}
        >
          {/* <Environment preset="sunset" background={false} far={100} /> */}

          {/* Lighting */}
          <ambientLight intensity={1.1} color={0xffffff} />
          <LightHelper showHelpers={showLightHelpers} />

          {/* Main scene */}
          <Suspense fallback={<CanvasLoader />}>
            {/* Render debug components only when targetScreenRef is ready */}
            {/* {targetScreenRef && (
              <>
                <CameraToObjectRay targetRef={targetScreenRef} />
                <ObjectCenterMarker targetRef={targetScreenRef} />
              </>
            )} */}
            <CameraAnimator
              trigger={animateCamera}
              controlsRef={controlsRef}
              screenRef={screenRef}
            />
            <Center>
              <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                <MyRoom ref={screenRef} setCamera={setAnimateCamera} />
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
          <SteamRibbon
            position={[
              -0.11 * scaleLevel,
              -0.47 * scaleLevel,
              -1.04 * scaleLevel,
            ]}
          />

          {/* Rotation and Zoom controls */}
          <OrbitControls
            ref={controlsRef}
            maxPolarAngle={Math.PI / 2}
            enableZoom={true}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default WorkRoom3D;
