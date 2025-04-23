"use client"
import React, { useRef, useState, useEffect } from "react";
import MyRoom from "@/components/3D/components/MyRoom";
// import MyRoomAntique from "@/components/MyRoomAntique";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "../../3D/helpers/CanvasLoader";
import LightHelper from "../../3D/helpers/LightHelper";
import CameraAnimator from "@/components/3D/helpers/CameraAnimator";
import { OrbitControls as OrbitControlsProps } from "three-stdlib";
import SteamRibbon from "@/components/3D/components/SteamRibbon";
import { Leva, useControls, button } from "leva";
import { MyRoomHandle } from "@/components/3D/components/MyRoom";
import { useDarkMode } from "../context/DarkModeContext";
import { useTranslation } from "react-i18next";

// import { CameraToObjectRay } from "@/components/3D/helpers/CameraToObjectRay";
// import { ObjectCenterMarker } from "@/components/3D/helpers/ObjectCenterMarker";

const WorkRoom3D = () => {
  const [animateCamera, setAnimateCamera] = useState(false);
  const controlsRef = useRef<OrbitControlsProps>(null);
  const screenRef = useRef<MyRoomHandle>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const scaleLevel = 1 / 0.085;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const { toggleDarkMode } = useDarkMode();
  const { t } = useTranslation("");

  // 🛠️ Panel toggle
  const { zoom } = useControls(
    "Zoom",
    {
      zoom: { value: isMobile? 70: 60, min: 10, max: 100, step: 1, label: "Camera FOV" },
    },
    {
      collapsed: isMobile,
    }
  );

  const { showLightHelpers } = useControls(
    "Helpers",
    {
      "View Laptop": button(() => setAnimateCamera(true)),
      "Toggle Dark Mode": button(() => toggleDarkMode()),
      showLightHelpers: {
        value: false,
        label: "Show Light Rays",
      },
    },
    {
      collapsed: isMobile,
    }
  );

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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-red-50 pt-5 relative dark:from-[#171d2d] dark:to-[#040211] dark:text-white -mt-1">
      <div className="flex justify-center items-center text-4xl md:text-6xl font-bold">
        {t("workroom3D-header")}
      </div>
      {/* Leva panel */}
      <div className="absolute top-23 left-5 z-40">
        <Leva titleBar={true} fill />
      </div>

      {/* Canvas  */}
      <div className="h-[calc(100vh-60px)] relative z-0">
        <Canvas
          shadows
          camera={{
            position: [3.5 * scaleLevel, 3.8 * scaleLevel, 2.9 * scaleLevel],
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
              setCamera={setAnimateCamera}
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
            position={[0, -35, 0]} // or even -16
            opacity={0.3}
            scale={80} // match X/Z of model size
            blur={1.5}
            far={60} // must cover model height
          />

          {/* Cup's steam */}
          <SteamRibbon
            position={[
              -0.07 * scaleLevel,
              -0.52 * scaleLevel,
              -0.79 * scaleLevel,
            ]}
          />

          {/* Rotation and Zoom controls */}
          <OrbitControls
            ref={controlsRef}
            maxPolarAngle={Math.PI / 2}
            enableZoom={false}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default WorkRoom3D;
