import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { InstancedMesh } from 'three'
import * as THREE from 'three'

const NUM_PARTICLES = 40

export default function SteamParticles() {
  const meshRef = useRef<InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const timeOffsets = useMemo(() => Array.from({ length: NUM_PARTICLES }, () => Math.random() * 10), [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    for (let i = 0; i < NUM_PARTICLES; i++) {
      const progress = (t * 0.2 + timeOffsets[i]) % 1 // loops over time (0 to 1)
      const y = progress * 2.5 // vertical stretch
      const x = Math.sin(t * 0.5 + i) * 0.1 * (1 - progress) // gentle horizontal wave
      const z = Math.cos(t * 0.3 + i) * 0.1 * (1 - progress)

      dummy.position.set(x, y, z)
      dummy.scale.set(0.1, 0.4 * (1 - progress), 0.1) // long thin particles that shrink
      dummy.rotation.set(0, 0, Math.sin(t + i)) // little tilt
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, NUM_PARTICLES]}>
      {/* A vertical plane instead of a sphere */}
      <planeGeometry args={[0.2, 0.6]} />
      <meshStandardMaterial
        color="white"
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </instancedMesh>
  )
}