// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-nocheck

// import React, { useRef } from 'react'
// import { useGLTF } from '@react-three/drei'

// const MyRoomAntique = ({ texture, ...rest }: { texture?: string }) => {
//   const { nodes, materials } = useGLTF('/models/tiny_isometric_room.glb')
//   return (
//     <group {...rest} dispose={null}>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.bed_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[-199, 100, 90]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.mattress_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[-199, 100, 90]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.desk_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[200, -20, -250]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.pouf_legs_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[-40, 100, -180]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.pouf_seat_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[-40, 125, -180]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.cupboards_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[100, 520, -300]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.book_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[-270, 474, -260]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.shoe_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[-60, 0, -50]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.wardrobe_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[299, 100, -199]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.room_lowpoly_room_material_0.geometry}
//         material={materials.room_material}
//         position={[0, 300, 0]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.blanket_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[0, 0.959, 0]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.pillow_big_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.pillow_03_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.pillow_02_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.pillow_01_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.plant_big_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[32, 180, -233]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.laptop_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[-240, 180, -260]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.sock_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[158.6, 78.06, -165.9]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.box_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[-240, 0, -240]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.toy_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[-245.706, 100.171, -196.972]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.plant_small_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[-315, 200, -39]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.fan_02_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[-153, 200, -320]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.timer_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[-319, 215, 29]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.photos_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[-99.538, 488.523, -295.392]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.shutter_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[0, 287, 0]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.window_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[0, 300, 0]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.fan_01_lowpoly_equipment_material_0.geometry}
//         material={materials.equipment_material}
//         position={[-153, 200, -320]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.ray_lowpoly_ray_material_0.geometry}
//         material={materials.ray_material}
//         position={[0, 300, 0]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={100}
//       />
//     </group>
//   )
// }

// useGLTF.preload('/models/tiny_isometric_room.glb')

// export default MyRoomAntique