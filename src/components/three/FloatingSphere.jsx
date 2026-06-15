import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Sphere } from "@react-three/drei";
import * as THREE from "three";

/**
 * Converts lat/long (degrees) to a point on a sphere of given radius.
 */
const latLongToVec3 = (lat, lon, radius) => {
	const phi = (90 - lat) * (Math.PI / 180);
	const theta = (lon + 180) * (Math.PI / 180);
	return new THREE.Vector3(
		-radius * Math.sin(phi) * Math.cos(theta),
		radius * Math.cos(phi),
		radius * Math.sin(phi) * Math.sin(theta)
	);
};

const SphereScene = ({ accent, globe }) => {
	const groupRef = useRef();
	const radius = 1.5;

	// Bangladesh ≈ 23.7°N, 90.4°E
	const marker = globe ? latLongToVec3(23.7, 90.4, radius * 1.02) : null;

	useFrame((state) => {
		if (!groupRef.current) return;
		const t = state.clock.getElapsedTime();
		groupRef.current.rotation.y = t * 0.18;
		// Mouse reactivity (tilt toward pointer).
		const targetX = state.pointer.y * 0.3;
		groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
	});

	return (
		<group ref={groupRef}>
			{/* Wireframe shell */}
			<Icosahedron args={[radius, 2]}>
				<meshBasicMaterial color={accent} wireframe transparent opacity={0.55} />
			</Icosahedron>
			{/* Inner glow core */}
			<Sphere args={[radius * 0.72, 32, 32]}>
				<meshBasicMaterial
					color={accent}
					transparent
					opacity={0.06}
					blending={THREE.AdditiveBlending}
				/>
			</Sphere>
			{/* Location marker for globe variant */}
			{marker && (
				<mesh position={marker}>
					<sphereGeometry args={[0.07, 16, 16]} />
					<meshBasicMaterial color="#00ff88" />
				</mesh>
			)}
		</group>
	);
};

const FloatingSphere = ({ accent = "#00f5ff", globe = false }) => {
	return (
		<Canvas
			className="!w-full !h-full"
			camera={{ position: [0, 0, 4.2], fov: 50 }}
			dpr={[1, 1.5]}
			gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
		>
			<ambientLight intensity={0.6} />
			<SphereScene accent={accent} globe={globe} />
		</Canvas>
	);
};

export default FloatingSphere;
