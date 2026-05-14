import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const Mascot = () => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame(() => {
    if (!groupRef.current) return;

    timeRef.current += 0.01;

    groupRef.current.position.y = Math.sin(timeRef.current * 1.4) * 0.05;
    groupRef.current.rotation.x = Math.sin(timeRef.current * 0.45) * 0.03;
    groupRef.current.rotation.y = Math.sin(timeRef.current * 0.35) * 0.05;
  });

  return (
    <group ref={groupRef} scale={0.88}>
      <RoundedBox args={[2, 2, 2]} radius={0.14} smoothness={6}>
        <meshStandardMaterial
          color="#121212"
          roughness={0.92}
          metalness={0.08}
        />
      </RoundedBox>

      <RoundedBox
        args={[1.55, 1.55, 0.05]}
        radius={0.08}
        smoothness={4}
        position={[0, 0, 1.02]}
      >
        <meshStandardMaterial
          color="#1d1d1d"
          roughness={0.88}
          metalness={0.05}
        />
      </RoundedBox>

      <mesh position={[-0.34, 0.18, 1.08]}>
        <sphereGeometry args={[0.09, 32, 32]} />
        <meshStandardMaterial color="#050505" roughness={0.12} />
      </mesh>

      <mesh position={[0.34, 0.18, 1.08]}>
        <sphereGeometry args={[0.09, 32, 32]} />
        <meshStandardMaterial color="#050505" roughness={0.12} />
      </mesh>

      <mesh position={[0, -0.16, 1.1]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.18, 0.02, 16, 100, Math.PI]} />
        <meshStandardMaterial color="#050505" roughness={0.18} />
      </mesh>
    </group>
  );
};

const BlackboxMascot3D = () => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 38 }}>
      <ambientLight intensity={0.9} />

      <directionalLight position={[4, 5, 5]} intensity={1.6} />
      <directionalLight position={[-4, -2, 3]} intensity={0.5} />

      <pointLight position={[0, 2, 4]} intensity={0.5} color="#7dd3fc" />

      <Mascot />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.55, 0]}>
        <circleGeometry args={[1.4, 64]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.12} />
      </mesh>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        rotateSpeed={0.8}
      />

      <Environment preset="city" />
    </Canvas>
  );
};

export default BlackboxMascot3D;
