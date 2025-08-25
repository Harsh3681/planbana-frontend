import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Center, Float } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh, Group } from 'three';

function FloatingLandmark({ position, type }: { position: [number, number, number], type: string }) {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
    }
  });

  const renderLandmark = () => {
    switch (type) {
      case 'tajmahal':
        return (
          <group>
            {/* Main dome */}
            <mesh position={[0, 0.3, 0]}>
              <sphereGeometry args={[0.2, 16, 12]} />
              <meshStandardMaterial color="#f8fafc" />
            </mesh>
            {/* Base */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.6, 0.3, 0.6]} />
              <meshStandardMaterial color="#e2e8f0" />
            </mesh>
            {/* Minarets */}
            {[-0.25, 0.25].map((x, i) => (
              <group key={i}>
                <mesh position={[x, 0.4, 0.25]}>
                  <cylinderGeometry args={[0.03, 0.03, 0.4]} />
                  <meshStandardMaterial color="#f1f5f9" />
                </mesh>
                <mesh position={[x, 0.6, 0.25]}>
                  <sphereGeometry args={[0.05, 8, 6]} />
                  <meshStandardMaterial color="#f8fafc" />
                </mesh>
              </group>
            ))}
          </group>
        );
      
      case 'temple':
        return (
          <group>
            {/* Temple tower */}
            <mesh position={[0, 0.2, 0]}>
              <coneGeometry args={[0.15, 0.6, 6]} />
              <meshStandardMaterial color="#d97706" />
            </mesh>
            {/* Base */}
            <mesh position={[0, -0.1, 0]}>
              <boxGeometry args={[0.4, 0.2, 0.4]} />
              <meshStandardMaterial color="#92400e" />
            </mesh>
            {/* Decorative elements */}
            <mesh position={[0, 0.5, 0]}>
              <torusGeometry args={[0.08, 0.02, 8, 16]} />
              <meshStandardMaterial color="#fbbf24" />
            </mesh>
          </group>
        );
      
      case 'fort':
        return (
          <group>
            {/* Main structure */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.5, 0.4, 0.3]} />
              <meshStandardMaterial color="#7c2d12" />
            </mesh>
            {/* Towers */}
            {[-0.2, 0.2].map((x, i) => (
              <mesh key={i} position={[x, 0.3, 0.15]}>
                <cylinderGeometry args={[0.06, 0.06, 0.4]} />
                <meshStandardMaterial color="#92400e" />
              </mesh>
            ))}
            {/* Flag */}
            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[0.02, 0.15, 0.1]} />
              <meshStandardMaterial color="#dc2626" />
            </mesh>
          </group>
        );
      
      default:
        return (
          <mesh>
            <sphereGeometry args={[0.1, 8, 6]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
        );
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        {renderLandmark()}
      </mesh>
    </Float>
  );
}

function IndianMapOutline() {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Simplified India outline using basic shapes */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.3, 16, 12]} />
        <meshStandardMaterial color="#10b981" transparent opacity={0.6} wireframe />
      </mesh>
      
      <mesh position={[0, -0.1, 0]}>
        <coneGeometry args={[0.4, 0.8, 3]} />
        <meshStandardMaterial color="#059669" transparent opacity={0.4} wireframe />
      </mesh>
      
      {/* State markers */}
      <mesh position={[-0.1, 0.1, 0.2]}>
        <sphereGeometry args={[0.02, 6, 4]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.3} />
      </mesh>
      
      <mesh position={[0.15, 0.05, 0.15]}>
        <sphereGeometry args={[0.02, 6, 4]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.3} />
      </mesh>
      
      <mesh position={[0.05, -0.2, 0.1]}>
        <sphereGeometry args={[0.02, 6, 4]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function AnimatedTitle() {
  const textRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={textRef}>
      <Center>
        <Text
          fontSize={0.3}
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          color="#1e40af"
        >
          EXPLORE INDIA
        </Text>
      </Center>
    </group>
  );
}

export default function Destinations3DHeader() {
  return (
    <div className="w-full h-[300px] bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 relative overflow-hidden">
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 2, 2]} intensity={0.8} color="#fbbf24" />
        <spotLight position={[0, 10, 0]} intensity={0.5} color="#60a5fa" />
        
        {/* Title */}
        <group position={[0, 1, 0]}>
          <AnimatedTitle />
        </group>
        
        {/* India map outline */}
        <group position={[0, -0.5, -1]}>
          <IndianMapOutline />
        </group>
        
        {/* Floating landmarks */}
        <FloatingLandmark position={[-2, 0.5, 0]} type="tajmahal" />
        <FloatingLandmark position={[2, -0.3, 0.5]} type="temple" />
        <FloatingLandmark position={[-1.5, -0.8, -0.5]} type="fort" />
        
        {/* Background elements */}
        <mesh position={[0, 0, -3]}>
          <sphereGeometry args={[8, 32, 32]} />
          <meshBasicMaterial 
            color="#1e1b4b" 
            transparent 
            opacity={0.1}
            side={1} // BackSide
          />
        </mesh>
      </Canvas>
      
      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            Discover India
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Journey through incredible heritage sites, ancient temples, and breathtaking landscapes
          </p>
        </div>
      </div>
    </div>
  );
}
