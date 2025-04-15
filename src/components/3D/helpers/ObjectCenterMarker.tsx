import { useEffect, useState } from "react";
import * as THREE from "three";

interface ObjectCenterMarkerProps {
  targetRef: React.RefObject<THREE.Object3D>;
}

export const ObjectCenterMarker: React.FC<ObjectCenterMarkerProps> = ({
  targetRef,
}) => {
  const [position, setPosition] = useState<THREE.Vector3 | null>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    const box = new THREE.Box3().setFromObject(targetRef.current);
    const center = new THREE.Vector3();
    box.getCenter(center);

    setPosition(center);
  }, [targetRef]);

  if (!position) return null;

  return (
    <mesh position={position}>
      <sphereGeometry args={[0.015, 16, 16]} />
      <meshBasicMaterial color="lime" />
    </mesh>
  );
};