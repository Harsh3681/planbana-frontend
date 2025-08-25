import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Text, Float, OrbitControls } from '@react-three/drei';
import { useRef, useState } from 'react';
import { Mesh } from 'three';
import * as THREE from 'three';

function Globe() {
  const globeRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.005;
      if (hovered) {
        globeRef.current.scale.setScalar(1.1);
      } else {
        globeRef.current.scale.setScalar(1);
      }
    }
  });

  // Create texture for globe with a subtle pattern
  const globeGeometry = new THREE.SphereGeometry(1, 32, 32);
  
  return (
    <group>
      <mesh 
        ref={globeRef}
        geometry={globeGeometry}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color="#4338ca" 
          transparent 
          opacity={0.8}
          wireframe={false}
        />
      </mesh>
      
      {/* India location markers */}
      <LocationMarker position={[0.2, 0.3, 0.9]} label="Mumbai" color="#ff6b35" />
      <LocationMarker position={[0.1, 0.1, 0.95]} label="Bangalore" color="#4ade80" />
      <LocationMarker position={[-0.1, 0.4, 0.85]} label="Delhi" color="#fbbf24" />
      <LocationMarker position={[0.3, 0.2, 0.88]} label="Chennai" color="#f87171" />
      
      {/* Orbital rings */}
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 4]}>
        <torusGeometry args={[1.3, 0.01, 8, 64]} />
        <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
      </mesh>
      
      <mesh rotation={[Math.PI / 2, Math.PI / 4, 0]}>
        <torusGeometry args={[1.4, 0.01, 8, 64]} />
        <meshStandardMaterial color="#60a5fa" opacity={0.2} transparent />
      </mesh>
    </group>
  );
}

function LocationMarker({ position, label, color }: { 
  position: [number, number, number], 
  label: string, 
  color: string 
}) {
  const markerRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (markerRef.current) {
      markerRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.2);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={1}>
      <group position={position}>
        <mesh ref={markerRef}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
        </mesh>
        <Text
          position={[0, 0.1, 0]}
          fontSize={0.05}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const radius = 2 + Math.random() * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#60a5fa" transparent opacity={0.6} />
    </points>
  );
}

export default function InteractiveGlobe({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4338ca" />
        
        <Globe />
        <ParticleField />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={2 * Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
