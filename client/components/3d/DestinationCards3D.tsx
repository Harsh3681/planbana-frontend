import { Canvas, useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Float, Text3D, Center } from '@react-three/drei';
import { useRef, useState } from 'react';
import { Mesh, Group } from 'three';

interface Destination3DProps {
  name: string;
  position: [number, number, number];
  color: string;
  icon: 'temple' | 'mountain' | 'beach' | 'heritage';
  isActive: boolean;
  onClick: () => void;
}

function DestinationIcon({ type, color }: { type: string, color: string }) {
  switch (type) {
    case 'temple':
      return (
        <group>
          {/* Temple base */}
          <mesh position={[0, -0.1, 0]}>
            <boxGeometry args={[0.3, 0.05, 0.3]} />
            <meshStandardMaterial color={color} />
          </mesh>
          {/* Temple structure */}
          <mesh>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color={color} />
          </mesh>
          {/* Temple dome */}
          <mesh position={[0, 0.15, 0]}>
            <sphereGeometry args={[0.08, 8, 6]} />
            <meshStandardMaterial color="#ffd700" />
          </mesh>
        </group>
      );
    case 'mountain':
      return (
        <group>
          <mesh>
            <coneGeometry args={[0.15, 0.3, 4]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <coneGeometry args={[0.05, 0.1, 4]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      );
    case 'beach':
      return (
        <group>
          {/* Wave */}
          <mesh>
            <torusGeometry args={[0.12, 0.03, 8, 16]} />
            <meshStandardMaterial color="#60a5fa" />
          </mesh>
          {/* Palm tree */}
          <mesh position={[0.1, 0, 0.1]}>
            <cylinderGeometry args={[0.01, 0.01, 0.2]} />
            <meshStandardMaterial color="#8b5a2b" />
          </mesh>
          <mesh position={[0.1, 0.1, 0.1]}>
            <sphereGeometry args={[0.04, 6, 4]} />
            <meshStandardMaterial color="#22c55e" />
          </mesh>
        </group>
      );
    case 'heritage':
      return (
        <group>
          {/* Building */}
          <mesh>
            <boxGeometry args={[0.15, 0.25, 0.15]} />
            <meshStandardMaterial color={color} />
          </mesh>
          {/* Pillars */}
          <mesh position={[-0.06, 0, 0.08]}>
            <cylinderGeometry args={[0.01, 0.01, 0.25]} />
            <meshStandardMaterial color="#d4af37" />
          </mesh>
          <mesh position={[0.06, 0, 0.08]}>
            <cylinderGeometry args={[0.01, 0.01, 0.25]} />
            <meshStandardMaterial color="#d4af37" />
          </mesh>
        </group>
      );
    default:
      return null;
  }
}

function Destination3D({ name, position, color, icon, isActive, onClick }: Destination3DProps) {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (groupRef.current) {
      const scale = isActive ? 1.2 : hovered ? 1.1 : 1;
      groupRef.current.scale.setScalar(scale);
      
      if (isActive) {
        groupRef.current.rotation.y += 0.02;
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <group 
        ref={groupRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        {/* Card background */}
        <RoundedBox args={[1.2, 1.5, 0.1]} radius={0.05}>
          <meshStandardMaterial 
            color={isActive ? color : '#ffffff'} 
            transparent 
            opacity={isActive ? 0.9 : 0.8}
          />
        </RoundedBox>
        
        {/* Icon */}
        <group position={[0, 0.3, 0.06]}>
          <DestinationIcon type={icon} color={isActive ? '#ffffff' : color} />
        </group>
        
        {/* Title */}
        <Text
          position={[0, -0.1, 0.06]}
          fontSize={0.12}
          color={isActive ? '#ffffff' : '#1f2937'}
          anchorX="center"
          anchorY="middle"
          maxWidth={1}
          textAlign="center"
        >
          {name}
        </Text>
        
        {/* Selection indicator */}
        {isActive && (
          <mesh position={[0, -0.4, 0.06]}>
            <ringGeometry args={[0.05, 0.08, 16]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
        )}
        
        {/* Glow effect when hovered */}
        {hovered && (
          <mesh position={[0, 0, -0.05]}>
            <boxGeometry args={[1.4, 1.7, 0.1]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.3}
              emissive={color}
              emissiveIntensity={0.2}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}

export default function DestinationCards3D() {
  const [activeDestination, setActiveDestination] = useState<string>('Hampi');
  
  const destinations = [
    { name: 'Hampi', color: '#f97316', icon: 'heritage' as const },
    { name: 'Rishikesh', color: '#10b981', icon: 'mountain' as const },
    { name: 'Goa Beaches', color: '#3b82f6', icon: 'beach' as const },
    { name: 'Ajanta Caves', color: '#8b5cf6', icon: 'temple' as const },
  ];

  return (
    <div className="w-full h-[400px] relative">
      <Canvas camera={{ position: [0, 0, 4], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4338ca" />
        
        {destinations.map((dest, index) => (
          <Destination3D
            key={dest.name}
            name={dest.name}
            position={[
              (index - 1.5) * 1.5, 
              Math.sin(index * 0.5) * 0.3, 
              0
            ]}
            color={dest.color}
            icon={dest.icon}
            isActive={activeDestination === dest.name}
            onClick={() => setActiveDestination(dest.name)}
          />
        ))}
        
        {/* Background particles */}
        <mesh>
          <sphereGeometry args={[8, 32, 32]} />
          <meshBasicMaterial 
            color="#1e1b4b" 
            transparent 
            opacity={0.1}
            side={1} // BackSide
          />
        </mesh>
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Selected:</span> {activeDestination}
        </p>
      </div>
    </div>
  );
}
