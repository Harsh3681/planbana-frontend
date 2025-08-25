import { Canvas } from '@react-three/fiber';
import { Float, Text3D, Center, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';

function TravelIcon({ position, color, children }: { position: [number, number, number], color: string, children: React.ReactNode }) {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, 0.8, 0.2]} />
        <meshStandardMaterial color={color} />
        {children}
      </mesh>
    </Float>
  );
}

function Airplane({ position }: { position: [number, number, number] }) {
  const airplaneRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (airplaneRef.current) {
      airplaneRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2;
      airplaneRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={airplaneRef} position={position}>
      <mesh>
        <boxGeometry args={[1.2, 0.1, 0.3]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      <mesh position={[0, 0, 0.2]}>
        <boxGeometry args={[0.3, 0.05, 0.8]} />
        <meshStandardMaterial color="#1e40af" />
      </mesh>
    </group>
  );
}

function Temple({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        {/* Base */}
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[1, 0.2, 1]} />
          <meshStandardMaterial color="#8b5a2b" />
        </mesh>
        {/* Main structure */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#d4af37" />
        </mesh>
        {/* Dome */}
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.3, 8, 6]} />
          <meshStandardMaterial color="#ffd700" />
        </mesh>
      </group>
    </Float>
  );
}

function Mountain({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position}>
        <mesh>
          <coneGeometry args={[0.8, 1.5, 4]} />
          <meshStandardMaterial color="#4ade80" />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <coneGeometry args={[0.3, 0.5, 4]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </Float>
  );
}

export default function FloatingTravelIcons() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Travel Icons */}
        <Airplane position={[-3, 2, 0]} />
        <Temple position={[3, 1, -1]} />
        <Mountain position={[-2, -1, 1]} />
        
        <TravelIcon position={[2, -2, 0]} color="#ff6b35">
          <mesh position={[0, 0, 0.2]}>
            <torusGeometry args={[0.2, 0.05, 8, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </TravelIcon>
        
        <TravelIcon position={[-1, 2.5, -1]} color="#4ade80">
          <mesh position={[0, 0, 0.2]}>
            <sphereGeometry args={[0.15, 8, 6]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </TravelIcon>
      </Canvas>
    </div>
  );
}
