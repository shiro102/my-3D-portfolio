import { useThree, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Line2 } from "three-stdlib"; // ✅ This is the right class!

interface CameraToObjectRayProps {
  targetRef: React.RefObject<THREE.Object3D>;
}

export const CameraToObjectRay: React.FC<CameraToObjectRayProps> = ({ targetRef }) => {
  const { camera } = useThree();
  const [points, setPoints] = useState<[THREE.Vector3, THREE.Vector3]>([
    camera.position.clone(),
    new THREE.Vector3(),
  ]);

  const lineRef = useRef<Line2 | null>(null); // ✅ Correct type

  useFrame(() => {
    if (!targetRef.current) return;

    const start = camera.position.clone();
    const end = new THREE.Vector3();
    targetRef.current.getWorldPosition(end);

    // update the line points
    setPoints([start, end]);
  });

  return (
    <Line
      ref={lineRef}
      points={points}
      color="red"
      lineWidth={2} // 👈 Line2 supports real thickness
      dashed={false}
    />
  );
};