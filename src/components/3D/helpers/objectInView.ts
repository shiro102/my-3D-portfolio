import * as THREE from "three";

const _projScreenMatrix = new THREE.Matrix4();
const _frustum = new THREE.Frustum();
const _box = new THREE.Box3();

/** True when the object's world bounds intersect the camera frustum. */
export function isObjectInView(
  camera: THREE.Camera,
  object: THREE.Object3D
): boolean {
  _projScreenMatrix.multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse
  );
  _frustum.setFromProjectionMatrix(_projScreenMatrix);
  _box.setFromObject(object);
  return _frustum.intersectsBox(_box);
}

/** True when any target is at least partly in view. */
export function isAnyObjectInView(
  camera: THREE.Camera,
  objects: (THREE.Object3D | null | undefined)[]
): boolean {
  for (const obj of objects) {
    if (obj && isObjectInView(camera, obj)) return true;
  }
  return false;
}
