/* eslint-disable react/no-unknown-property -- react-three-fiber intrinsic element props */
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 90;
const RANGE = 9;
const LINK_DISTANCE = 2.4;

const Particles = () => {
	const groupRef = useRef();

	// Generate point positions once.
	const positions = useMemo(() => {
		const arr = new Float32Array(COUNT * 3);
		for (let i = 0; i < COUNT; i++) {
			arr[i * 3] = (Math.random() - 0.5) * RANGE * 2;
			arr[i * 3 + 1] = (Math.random() - 0.5) * RANGE * 2;
			arr[i * 3 + 2] = (Math.random() - 0.5) * RANGE;
		}
		return arr;
	}, []);

	// Pre-compute connecting line segments between nearby points (once).
	const linePositions = useMemo(() => {
		const segs = [];
		for (let i = 0; i < COUNT; i++) {
			for (let j = i + 1; j < COUNT; j++) {
				const dx = positions[i * 3] - positions[j * 3];
				const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
				const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
				const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
				if (dist < LINK_DISTANCE) {
					segs.push(
						positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
						positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
					);
				}
			}
		}
		return new Float32Array(segs);
	}, [positions]);

	useFrame((state) => {
		if (!groupRef.current) return;
		const t = state.clock.getElapsedTime();
		groupRef.current.rotation.y = t * 0.04;
		groupRef.current.rotation.x = Math.sin(t * 0.12) * 0.08;
		// Subtle mouse parallax.
		const targetX = state.pointer.x * 0.4;
		const targetY = state.pointer.y * 0.4;
		groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.04;
		groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.04;
	});

	return (
		<group ref={groupRef}>
			<points>
				<bufferGeometry>
					<bufferAttribute
						attach="attributes-position"
						count={COUNT}
						array={positions}
						itemSize={3}
					/>
				</bufferGeometry>
				<pointsMaterial
					color="#00f5ff"
					size={0.075}
					sizeAttenuation
					transparent
					opacity={0.9}
					depthWrite={false}
					blending={THREE.AdditiveBlending}
				/>
			</points>
			<lineSegments>
				<bufferGeometry>
					<bufferAttribute
						attach="attributes-position"
						count={linePositions.length / 3}
						array={linePositions}
						itemSize={3}
					/>
				</bufferGeometry>
				<lineBasicMaterial
					color="#00f5ff"
					transparent
					opacity={0.12}
					blending={THREE.AdditiveBlending}
				/>
			</lineSegments>
		</group>
	);
};

const ParticleField = () => {
	return (
		<Canvas
			className="!absolute inset-0"
			camera={{ position: [0, 0, 11], fov: 60 }}
			dpr={[1, 1.5]}
			gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
		>
			<Particles />
		</Canvas>
	);
};

export default ParticleField;
