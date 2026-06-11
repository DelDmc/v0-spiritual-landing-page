"use client"

import {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Canvas, type ThreeEvent, useFrame } from "@react-three/fiber"
import {
  AdditiveBlending,
  BackSide,
  BufferGeometry,
  CanvasTexture,
  Group,
  Line as ThreeLine,
  LineBasicMaterial,
  Mesh,
  SRGBColorSpace,
  Texture,
} from "three"

import { globeArcs, globePoints, type GlobePoint } from "@/data/globePoints"
import {
  createArcPoints,
  latLngToVector3,
  supportsWebGL,
} from "@/lib/globeUtils"

type InteractiveGlobeProps = {
  selectedId?: string | null
  onSelect?: (point: GlobePoint) => void
}

type DragState = {
  active: boolean
  x: number
  y: number
}

const radius = 1.58

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(query.matches)

    const handleChange = () => setReduced(query.matches)
    query.addEventListener("change", handleChange)
    return () => query.removeEventListener("change", handleChange)
  }, [])

  return reduced
}

function useEarthTexture() {
  const [texture, setTexture] = useState<Texture | null>(null)

  useEffect(() => {
    let mounted = true

    const image = new Image()
    image.src = "/images/earth-atmos-2048.jpg"
    image.onload = () => {
      if (!mounted) {
        return
      }

      const canvas = document.createElement("canvas")
      canvas.width = 2048
      canvas.height = 1024

      const context = canvas.getContext("2d")
      if (!context) {
        return
      }

      context.fillStyle = "#061827"
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.filter = "brightness(1.1) contrast(1.08) saturate(1.18)"
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      context.filter = "none"

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data
      for (let index = 0; index < pixels.length; index += 4) {
        const red = pixels[index] ?? 0
        const green = pixels[index + 1] ?? 0
        const blue = pixels[index + 2] ?? 0
        const luminance = (red + green + blue) / 3

        if (luminance < 92) {
          pixels[index] = Math.min(255, red * 1.38 + 18)
          pixels[index + 1] = Math.min(255, green * 1.38 + 24)
          pixels[index + 2] = Math.min(255, blue * 1.42 + 34)
        }

        if (luminance > 226) {
          pixels[index] = Math.max(0, red * 0.86)
          pixels[index + 1] = Math.max(0, green * 0.88)
          pixels[index + 2] = Math.max(0, blue * 0.92)
        }
      }
      context.putImageData(imageData, 0, 0)

      const nextTexture = new CanvasTexture(canvas)
      nextTexture.colorSpace = SRGBColorSpace
      nextTexture.anisotropy = 4
      nextTexture.needsUpdate = true
      setTexture((currentTexture) => {
        currentTexture?.dispose()
        return nextTexture
      })
    }
    image.onerror = () => {
      if (mounted) {
        setTexture(null)
      }
    }

    return () => {
      mounted = false
      setTexture((currentTexture) => {
        currentTexture?.dispose()
        return null
      })
    }
  }, [])

  return texture
}

function useFallbackEarthTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 512

    const context = canvas.getContext("2d")
    if (!context) {
      return null
    }

    const ocean = context.createLinearGradient(0, 0, 0, canvas.height)
    ocean.addColorStop(0, "#0f3145")
    ocean.addColorStop(1, "#061827")
    context.fillStyle = ocean
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = "#6f8f68"
    ;[
      [124, 122, 230, 154],
      [250, 256, 116, 178],
      [456, 130, 168, 90],
      [492, 254, 122, 196],
      [662, 128, 318, 150],
      [812, 260, 150, 80],
      [822, 378, 130, 70],
    ].forEach(([x, y, width, height]) => {
      context.beginPath()
      context.ellipse(x, y, width / 2, height / 2, -0.18, 0, Math.PI * 2)
      context.fill()
    })

    const texture = new CanvasTexture(canvas)
    texture.colorSpace = SRGBColorSpace
    texture.needsUpdate = true
    return texture
  }, [])
}

function ArcLine({ from, to }: { from: GlobePoint; to: GlobePoint }) {
  const geometry = useMemo(() => {
    return new BufferGeometry().setFromPoints(createArcPoints(from, to, radius))
  }, [from, to])
  const material = useMemo(
    () =>
      new LineBasicMaterial({
        color: "#f0c86a",
        transparent: true,
        opacity: 0.34,
        blending: AdditiveBlending,
      }),
    [],
  )
  const line = useMemo(() => {
    return new ThreeLine(geometry, material)
  }, [geometry, material])

  return <primitive object={line} />
}

const GlobePointMarker = memo(function GlobePointMarker({
  point,
  selected,
  reducedMotion,
  onSelect,
  onHover,
}: {
  point: GlobePoint
  selected: boolean
  reducedMotion: boolean
  onSelect?: (point: GlobePoint) => void
  onHover: (point: GlobePoint | null) => void
}) {
  const marker = useRef<Mesh>(null)
  const pulse = useRef<Mesh>(null)
  const position = useMemo(
    () => latLngToVector3(point.lat, point.lng, radius + 0.025),
    [point.lat, point.lng],
  )

  useFrame(({ clock }) => {
    if (!pulse.current || reducedMotion) {
      return
    }

    const wave = (Math.sin(clock.elapsedTime * 2.1 + position.x) + 1) / 2
    const scale = selected ? 1.45 + wave * 0.16 : 1.12 + wave * 0.18
    pulse.current.scale.setScalar(scale)
  })

  return (
    <group position={position}>
      <mesh
        ref={pulse}
        onClick={(event: ThreeEvent<MouseEvent>) => {
          event.stopPropagation()
          onSelect?.(point)
        }}
        onPointerOver={(event: ThreeEvent<PointerEvent>) => {
          event.stopPropagation()
          onHover(point)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          onHover(null)
          document.body.style.cursor = ""
        }}
      >
        <sphereGeometry args={[0.052, 18, 18]} />
        <meshBasicMaterial
          color="#f3c76a"
          transparent
          opacity={selected ? 0.5 : 0.28}
          blending={AdditiveBlending}
        />
      </mesh>
      <mesh
        ref={marker}
        onClick={(event: ThreeEvent<MouseEvent>) => {
          event.stopPropagation()
          onSelect?.(point)
        }}
        onPointerOver={(event: ThreeEvent<PointerEvent>) => {
          event.stopPropagation()
          onHover(point)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          onHover(null)
          document.body.style.cursor = ""
        }}
      >
        <sphereGeometry args={[selected ? 0.044 : 0.036, 24, 24]} />
        <meshBasicMaterial color={selected ? "#ffe2a1" : "#d9a84f"} />
      </mesh>
    </group>
  )
})

function GlobeScene({
  selectedId,
  onSelect,
  hovering,
  setHovering,
  setHoveredPoint,
  reducedMotion,
  paused,
  drag,
}: {
  selectedId?: string | null
  onSelect?: (point: GlobePoint) => void
  hovering: boolean
  setHovering: (value: boolean) => void
  setHoveredPoint: (point: GlobePoint | null) => void
  reducedMotion: boolean
  paused: boolean
  drag: DragState
}) {
  const group = useRef<Group>(null)
  const earthTexture = useEarthTexture()
  const fallbackEarthTexture = useFallbackEarthTexture()
  const visibleEarthTexture = earthTexture ?? fallbackEarthTexture
  const arcLookup = useMemo(() => {
    const byId = new Map(globePoints.map((point) => [point.id, point]))
    return globeArcs.reduce<
      Array<{ id: string; fromPoint: GlobePoint; toPoint: GlobePoint }>
    >((arcs, arc) => {
      const fromPoint = byId.get(arc.from)
      const toPoint = byId.get(arc.to)

      if (fromPoint && toPoint) {
        arcs.push({ id: arc.id, fromPoint, toPoint })
      }

      return arcs
    }, [])
  }, [])

  useFrame((_, delta) => {
    if (!group.current || reducedMotion || hovering || paused || drag.active) {
      return
    }

    group.current.rotation.y += delta * 0.11
  })

  useEffect(() => {
    if (!group.current || !drag.active) {
      return
    }

    group.current.rotation.y += drag.x * 0.004
    group.current.rotation.x = Math.max(
      -0.72,
      Math.min(0.72, group.current.rotation.x + drag.y * 0.003),
    )
  }, [drag])

  return (
    <>
      <ambientLight intensity={1.25} />
      <directionalLight position={[3, 3, 4]} intensity={2.2} color="#fff4d1" />
      <pointLight
        position={[-3, 1.8, 2.4]}
        intensity={4.5}
        distance={8}
        color="#d9b46a"
      />

      <group ref={group} rotation={[0.1, -0.78, 0]}>
        <mesh
          onPointerOver={() => setHovering(true)}
          onPointerOut={() => setHovering(false)}
        >
          <sphereGeometry args={[radius, 96, 96]} />
          <meshBasicMaterial
            color="#ffffff"
            map={visibleEarthTexture ?? undefined}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[radius * 1.011, 64, 64]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.055}
            wireframe
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[radius * 1.065, 64, 64]} />
          <meshBasicMaterial
            color="#90c7d6"
            side={BackSide}
            transparent
            opacity={0.11}
            blending={AdditiveBlending}
          />
        </mesh>

        {arcLookup.map((arc) => (
          <ArcLine key={arc.id} from={arc.fromPoint} to={arc.toPoint} />
        ))}

        {globePoints.map((point) => (
          <GlobePointMarker
            key={point.id}
            point={point}
            selected={selectedId === point.id}
            reducedMotion={reducedMotion}
            onSelect={onSelect}
            onHover={(hovered) => {
              setHoveredPoint(hovered)
              setHovering(Boolean(hovered))
            }}
          />
        ))}
      </group>
    </>
  )
}

function GlobeFallback() {
  return (
    <div className="flex h-full min-h-[26rem] flex-col items-center justify-center rounded-lg border border-primary-foreground/15 bg-primary-foreground/[0.06] p-8 text-center text-primary-foreground">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
        Global reach
      </p>
      <h3 className="mt-3 font-serif text-2xl font-semibold">
        Interactive map unavailable
      </h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/70">
        This browser cannot start WebGL. The location cards and statistics still
        describe the international spiritual and family guidance network.
      </p>
    </div>
  )
}

export function InteractiveGlobe({
  selectedId,
  onSelect,
}: InteractiveGlobeProps) {
  const [webgl, setWebgl] = useState<boolean | null>(null)
  const [hoveredPoint, setHoveredPoint] = useState<GlobePoint | null>(null)
  const [hovering, setHovering] = useState(false)
  const [paused, setPaused] = useState(false)
  const [drag, setDrag] = useState<DragState>({ active: false, x: 0, y: 0 })
  const dragOrigin = useRef({ x: 0, y: 0 })
  const resumeTimer = useRef<number | null>(null)
  const reducedMotion = useReducedMotion()

  const pauseAfterInteraction = () => {
    setPaused(true)

    if (resumeTimer.current) {
      window.clearTimeout(resumeTimer.current)
    }

    resumeTimer.current = window.setTimeout(() => {
      setPaused(false)
      resumeTimer.current = null
    }, 2600)
  }

  useEffect(() => {
    setWebgl(supportsWebGL())
  }, [])

  useEffect(() => {
    return () => {
      if (resumeTimer.current) {
        window.clearTimeout(resumeTimer.current)
      }

      document.body.style.cursor = ""
    }
  }, [])

  if (webgl === false) {
    return <GlobeFallback />
  }

  return (
    <div
      className="relative h-[22rem] w-full overflow-hidden rounded-lg border border-primary-foreground/15 bg-[radial-gradient(circle_at_50%_42%,rgba(235,199,112,0.12),rgba(255,255,255,0.04)_34%,rgba(0,0,0,0)_64%)] sm:h-[28rem] lg:h-[31rem]"
      aria-label="Interactive globe showing Guru-ma and Guru Maharaj's international guidance network"
      role="application"
      onPointerDown={(event) => {
        pauseAfterInteraction()
        dragOrigin.current = { x: event.clientX, y: event.clientY }
        setDrag({ active: true, x: 0, y: 0 })
      }}
      onPointerMove={(event) => {
        if (!drag.active) {
          return
        }

        const x = event.clientX - dragOrigin.current.x
        const y = event.clientY - dragOrigin.current.y
        dragOrigin.current = { x: event.clientX, y: event.clientY }
        pauseAfterInteraction()
        setDrag({ active: true, x, y })
      }}
      onPointerUp={() => {
        pauseAfterInteraction()
        setDrag({ active: false, x: 0, y: 0 })
      }}
      onPointerLeave={() => {
        pauseAfterInteraction()
        setDrag({ active: false, x: 0, y: 0 })
        setHovering(false)
        setHoveredPoint(null)
      }}
    >
      {webgl === null ? (
        <div className="absolute inset-0 animate-pulse bg-primary-foreground/[0.06]" />
      ) : (
        <Canvas
          dpr={[1, 1.65]}
          camera={{ position: [0, 0, 4.25], fov: 42, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <GlobeScene
            selectedId={selectedId}
            onSelect={onSelect}
            hovering={hovering}
            setHovering={setHovering}
            setHoveredPoint={setHoveredPoint}
            reducedMotion={reducedMotion}
            paused={paused}
            drag={drag}
          />
        </Canvas>
      )}

      {hoveredPoint ? (
        <div className="pointer-events-none absolute left-4 top-4 rounded-md border border-primary-foreground/15 bg-[#101f25]/90 px-3 py-2 text-xs font-medium text-primary-foreground shadow-lg backdrop-blur">
          {hoveredPoint.city ?? hoveredPoint.country}
          <span className="ml-2 text-primary-foreground/55">
            {hoveredPoint.category}
          </span>
        </div>
      ) : null}
    </div>
  )
}
