import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useTexture } from "@react-three/drei";
import { Suspense, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import type { Book } from "@/data/books";

const SLOT = 3.15;
const PAGE_COLOR = "#efe6cf";

type Progress = MutableRefObject<number>;

function BookMesh({
  book,
  index,
  progress,
  onFocus,
  hovered,
  setHovered,
}: {
  book: Book;
  index: number;
  progress: Progress;
  onFocus: (i: number) => void;
  hovered: MutableRefObject<number | null>;
  setHovered: (i: number | null) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const cover = useTexture(book.cover);
  cover.colorSpace = THREE.SRGBColorSpace;
  cover.anisotropy = 8;

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const g = group.current;
    if (!g) return;

    const focus = progress.current;

    const offset = index - focus;
    const isHovered = hovered.current === index;
    const near = Math.abs(offset);

    const targetX = offset * SLOT;
    const targetY = Math.sin(offset * 0.9) * 0.12 + (isHovered ? 0.34 : 0);
    const targetZ = -Math.abs(offset) * 1.85 + (isHovered ? 1.1 : 0);
    const targetRotY = THREE.MathUtils.clamp(offset * 0.46, -1.15, 1.15) + (isHovered ? -0.25 : 0);
    const targetRotX = isHovered ? -0.12 : Math.sin(offset * 0.6) * 0.05;
    const targetRotZ = THREE.MathUtils.clamp(-offset * 0.05, -0.14, 0.14);
    const targetScale = (isHovered ? 1.16 : 1) * THREE.MathUtils.lerp(1, 0.82, Math.min(near / 4, 1));

    const k = 4.5;
    const damp = (cur: number, to: number) => THREE.MathUtils.damp(cur, to, k, dt);

    g.position.x = damp(g.position.x, targetX);
    g.position.y =
      damp(g.position.y, targetY) + Math.sin(state.clock.elapsedTime * 0.7 + index) * 0.012;
    g.position.z = damp(g.position.z, targetZ);
    g.rotation.y = damp(g.rotation.y, targetRotY);
    g.rotation.x = damp(g.rotation.x, targetRotX);
    g.rotation.z = damp(g.rotation.z, targetRotZ);
    const s = damp(g.scale.x, targetScale);
    g.scale.setScalar(s);

    const visible = near < 4.2;
    if (g.visible !== visible) g.visible = visible;
  });

  return (
    <group
      ref={group}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(index);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(null);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onFocus(index);
      }}
    >
      <mesh castShadow>
        <boxGeometry args={[1.42, 2.05, 0.26]} />
        {/* +X page edge, -X spine, +/-Y page edges, +Z cover, -Z back board */}
        <meshStandardMaterial attach="material-0" color={PAGE_COLOR} roughness={0.85} />
        <meshStandardMaterial
          attach="material-1"
          color={book.spine}
          roughness={0.45}
          metalness={0.12}
        />
        <meshStandardMaterial attach="material-2" color={PAGE_COLOR} roughness={0.85} />
        <meshStandardMaterial attach="material-3" color={PAGE_COLOR} roughness={0.85} />
        <meshStandardMaterial attach="material-4" map={cover} roughness={0.34} metalness={0.06} />
        <meshStandardMaterial
          attach="material-5"
          color={book.spine}
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>

      {/* gilded page edge glint */}
      <mesh position={[0.715, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.24, 1.98]} />
        <meshStandardMaterial
          color="#d9b45f"
          emissive="#c8952f"
          emissiveIntensity={0.35}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* contact shadow plate */}
      <mesh position={[0, -1.28, 0.02]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.9, 1.4]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function Dust() {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = 420;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 34;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    if (!points.current) return;
    points.current.rotation.y += dt * 0.02;
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.4;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.035}
        color="#e6d3a3"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Rig({ progress }: { progress: Progress }) {
  const { camera, pointer } = useThree();
  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    // Subtle parallax follow — never enough to break the composition.
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.55, 3, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.25 + pointer.y * 0.3, 3, dt);
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      6.1 - Math.sin(progress.current) * 0.2,
      3,
      dt,
    );
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function BookScene({
  books,
  progress,
  hovered,
  setHovered,
  onFocus,
}: {
  books: Book[];
  progress: Progress;
  hovered: MutableRefObject<number | null>;
  setHovered: (i: number | null) => void;
  onFocus: (i: number) => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      shadows
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.25, 6.1], fov: 42 }}
    >
      <fog attach="fog" args={["#0d1526", 9, 22]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 6]} intensity={1.5} castShadow />
      <spotLight
        position={[-6, 5, 4]}
        angle={0.6}
        penumbra={1}
        intensity={2.4}
        color="#e8c274"
        distance={26}
      />
      <pointLight position={[0, -3, 3]} intensity={0.6} color="#4d7ec9" />

      <Suspense fallback={null}>
        <Environment resolution={128}>
          <Lightformer
            intensity={2.4}
            color="#fff3d6"
            position={[0, 5, 2]}
            scale={[12, 6, 1]}
          />
          <Lightformer
            intensity={1.4}
            color="#7fa5e0"
            rotation-y={Math.PI / 2}
            position={[-7, 1, 0]}
            scale={[20, 3, 1]}
          />
          <Lightformer
            intensity={1.1}
            color="#e0a45a"
            rotation-y={-Math.PI / 2}
            position={[7, 0, 0]}
            scale={[20, 2, 1]}
          />
        </Environment>

        {books.map((book, i) => (
          <BookMesh
            key={book.id}
            book={book}
            index={i}
            progress={progress}
            hovered={hovered}
            setHovered={setHovered}
            onFocus={onFocus}
          />
        ))}
      </Suspense>

      <Dust />
      <Rig progress={progress} />
    </Canvas>
  );
}
