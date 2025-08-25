import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Ring } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh, Group } from 'three';
import * as THREE from 'three';

function FloatingGeometry({ position, geometry, color, speed = 1 }: {
  position: [number, number, number];
  geometry: 'sphere' | 'torus' | 'box' | 'tetrahedron';
  color: string;
  speed?: number;
}) {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005 * speed;
      meshRef.current.rotation.y += 0.008 * speed;
      meshRef.current.position.x += Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.001;
      meshRef.current.position.y += Math.cos(state.clock.elapsedTime * speed * 0.3) * 0.001;
    }
  });

  const renderGeometry = () => {
    switch (geometry) {
      case 'sphere':
        return <sphereGeometry args={[0.1, 8, 8]} />;
      case 'torus':
        return <torusGeometry args={[0.08, 0.03, 8, 16]} />;
      case 'box':
        return <boxGeometry args={[0.12, 0.12, 0.12]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[0.1]} />;
      default:
        return <sphereGeometry args={[0.1, 8, 8]} />;
    }
  };

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {renderGeometry()}
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.4}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
}

function WaveField() {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const waves = [];
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 2;
    const radius = 3 + Math.random() * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = Math.random() * 4 - 2;
    
    waves.push(
      <Ring
        key={i}
        position={[x, y, z]}
        args={[0.1, 0.2, 16]}
        rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
      >
        <meshStandardMaterial 
          color="#60a5fa" 
          transparent 
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </Ring>
    );
  }

  return <group ref={groupRef}>{waves}</group>;
}

function ParticleCloud() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 150;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    // Random position in a sphere
    const radius = 3 + Math.random() * 4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
    
    // Random colors (travel theme)
    const colorPalette = [
      [0.23, 0.51, 0.98], // Blue
      [1, 0.42, 0.21],    // Orange
      [0.27, 0.72, 0.31], // Green
      [1, 0.73, 0.15],    // Yellow
      [0.55, 0.36, 0.87]  // Purple
    ];
    
    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i * 3] = color[0];
    colors[i * 3 + 1] = color[1];
    colors[i * 3 + 2] = color[2];
  }
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
      pointsRef.current.rotation.x += 0.0003;
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
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.03} 
        vertexColors 
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function AnimatedBackground({ intensity = 'medium' }: { intensity?: 'low' | 'medium' | 'high' }) {
  const geometryCount = intensity === 'low' ? 8 : intensity === 'medium' ? 12 : 16;
  
  const geometries = [];
  const geometryTypes: Array<'sphere' | 'torus' | 'box' | 'tetrahedron'> = ['sphere', 'torus', 'box', 'tetrahedron'];
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
  
  for (let i = 0; i < geometryCount; i++) {
    const x = (Math.random() - 0.5) * 8;
    const y = (Math.random() - 0.5) * 6;
    const z = (Math.random() - 0.5) * 4 - 2;
    
    geometries.push(
      <FloatingGeometry
        key={i}
        position={[x, y, z]}
        geometry={geometryTypes[Math.floor(Math.random() * geometryTypes.length)]}
        color={colors[Math.floor(Math.random() * colors.length)]}
        speed={0.5 + Math.random() * 1.5}
      />
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4338ca" />
        
        {geometries}
        
        {intensity !== 'low' && <WaveField />}
        {intensity === 'high' && <ParticleCloud />}
      </Canvas>
    </div>
  );
}
