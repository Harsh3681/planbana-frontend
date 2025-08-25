import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Ring } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh, Group } from 'three';
import * as THREE from 'three';

function CompassNeedle() {
  const needleRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (needleRef.current) {
      // Rotate the needle to point towards "connection"
      needleRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.3 + Math.PI / 4;
    }
  });

  return (
    <group ref={needleRef}>
      {/* North pointer (red) */}
      <mesh position={[0, 0.15, 0.01]}>
        <coneGeometry args={[0.03, 0.15, 4]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      
      {/* South pointer (white) */}
      <mesh position={[0, -0.15, 0.01]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.03, 0.15, 4]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      
      {/* Center pin */}
      <mesh position={[0, 0, 0.02]}>
        <cylinderGeometry args={[0.02, 0.02, 0.02]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
    </group>
  );
}

function CompassRose() {
  const roseRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (roseRef.current) {
      roseRef.current.rotation.z += 0.002;
    }
  });

  const directions = [
    { label: 'N', angle: 0, color: '#ef4444' },
    { label: 'E', angle: Math.PI / 2, color: '#3b82f6' },
    { label: 'S', angle: Math.PI, color: '#6b7280' },
    { label: 'W', angle: -Math.PI / 2, color: '#10b981' },
  ];

  return (
    <group ref={roseRef}>
      {/* Compass base */}
      <mesh>
        <cylinderGeometry args={[0.35, 0.35, 0.02]} />
        <meshStandardMaterial color="#f1f5f9" />
      </mesh>
      
      {/* Outer ring */}
      <Ring args={[0.3, 0.35, 32]}>
        <meshStandardMaterial color="#1e40af" side={THREE.DoubleSide} />
      </Ring>
      
      {/* Direction markers */}
      {directions.map((dir, index) => (
        <group key={index} rotation={[0, 0, dir.angle]}>
          <Text
            position={[0, 0.28, 0.01]}
            fontSize={0.06}
            color={dir.color}
            anchorX="center"
            anchorY="middle"
          >
            {dir.label}
          </Text>
          
          {/* Direction line */}
          <mesh position={[0, 0.25, 0.005]}>
            <boxGeometry args={[0.002, 0.04, 0.01]} />
            <meshStandardMaterial color={dir.color} />
          </mesh>
        </group>
      ))}
      
      {/* Degree markings */}
      {Array.from({ length: 12 }, (_, i) => (
        <group key={i} rotation={[0, 0, (i * Math.PI) / 6]}>
          <mesh position={[0, 0.32, 0.005]}>
            <boxGeometry args={[0.001, 0.02, 0.005]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function ConnectionPulse() {
  const pulseRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (pulseRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
      pulseRef.current.scale.setScalar(scale);
      pulseRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
    }
  });

  return (
    <mesh ref={pulseRef} position={[0, 0, 0.03]}>
      <ringGeometry args={[0.4, 0.45, 32]} />
      <meshStandardMaterial 
        color="#10b981" 
        transparent 
        opacity={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function TravelBuddyMarkers() {
  const markersRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (markersRef.current) {
      markersRef.current.rotation.z -= 0.003;
    }
  });

  const buddies = [
    { angle: 0.3, distance: 0.7, color: '#f97316', active: true },
    { angle: 1.8, distance: 0.8, color: '#3b82f6', active: false },
    { angle: 3.5, distance: 0.6, color: '#8b5cf6', active: true },
    { angle: 4.8, distance: 0.9, color: '#10b981', active: false },
    { angle: 2.1, distance: 0.5, color: '#f59e0b', active: true },
  ];

  return (
    <group ref={markersRef}>
      {buddies.map((buddy, index) => {
        const x = Math.cos(buddy.angle) * buddy.distance;
        const y = Math.sin(buddy.angle) * buddy.distance;
        
        return (
          <Float key={index} speed={2} rotationIntensity={0} floatIntensity={1}>
            <group position={[x, y, 0.04]}>
              <mesh>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshStandardMaterial 
                  color={buddy.color} 
                  emissive={buddy.active ? buddy.color : '#000000'}
                  emissiveIntensity={buddy.active ? 0.3 : 0}
                />
              </mesh>
              
              {/* Connection line to center */}
              {buddy.active && (
                <mesh position={[-x/2, -y/2, -0.01]}>
                  <cylinderGeometry args={[0.002, 0.002, buddy.distance]} />
                  <meshStandardMaterial 
                    color={buddy.color} 
                    transparent 
                    opacity={0.4}
                  />
                </mesh>
              )}
            </group>
          </Float>
        );
      })}
    </group>
  );
}

export default function InteractiveCompass() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 3, 3]} intensity={1} />
        <pointLight position={[-3, -3, -3]} intensity={0.5} color="#4338ca" />
        
        <CompassRose />
        <CompassNeedle />
        <ConnectionPulse />
        <TravelBuddyMarkers />
        
        {/* Floating text */}
        <Float speed={1} rotationIntensity={0} floatIntensity={0.5}>
          <Text
            position={[0, -0.7, 0.1]}
            fontSize={0.08}
            color="#1e40af"
            anchorX="center"
            anchorY="middle"
          >
            Finding Your
          </Text>
          <Text
            position={[0, -0.85, 0.1]}
            fontSize={0.1}
            color="#dc2626"
            anchorX="center"
            anchorY="middle"
          >
            Perfect Match
          </Text>
        </Float>
      </Canvas>
    </div>
  );
}
