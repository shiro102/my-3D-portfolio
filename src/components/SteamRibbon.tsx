import { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { TextureLoader } from 'three'

interface SteamRibbonProps {
    position?: [number, number, number]
  }

export default function SteamRibbon({ position = [0, 0, 0] }: SteamRibbonProps) {
  const group = useRef<THREE.Group>(null!)
  const smokeTexture = useLoader(TextureLoader, '/textures/smoke.png')

  const planes = useMemo(() => Array.from({ length: 15 }), [])
  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    planes.forEach((_, i) => {
      const progress = i / planes.length
      const y = progress * 0.25
      const strength = Math.sin(progress * Math.PI) // 👈 Max in middle

      const x = Math.sin(t * 0.5 + i) * 0.04 * strength
      const z = Math.cos(t * 0.3 + i) * 0.05 * strength

      const scale = 0.3 * (1 - progress/2)

      const obj = group.current.children[i] as THREE.Mesh
      obj.position.set(x, y, z)
      obj.scale.set(scale, scale, scale)

      if (obj.material instanceof THREE.MeshStandardMaterial) {
        obj.material.opacity = 0.3 * (1 - progress)
      }
    })
  })

  return (
    <group ref={group} position={position}>
      {planes.map((_, i) => (
        <mesh key={i}>
          <planeGeometry args={[0.5, 1]} />
          <meshStandardMaterial
            color="white"
            emissive="white"         // ✅ boosts brightness!
            emissiveIntensity={1.5}  // tweak this to go whiter
            map={smokeTexture}
            transparent
            depthWrite={false}
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}