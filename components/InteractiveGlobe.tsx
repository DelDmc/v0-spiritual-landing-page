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
  Quaternion,
  SRGBColorSpace,
  Texture,
  Vector3,
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
const polarAxis = new Vector3(0, 1, 0)
const pitchAxis = new Vector3(1, 0, 0)
const maxSelectionPitch = 0.42
const maxManualPitch = 0.82

function createPointLabelTexture(label: string) {
  const canvas = document.createElement("canvas")
  canvas.width = 256
  canvas.height = 72

  const context = canvas.getContext("2d")
  if (!context) {
    return null
  }

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = "rgba(2, 6, 18, 0.78)"
  context.strokeStyle = "rgba(224, 242, 254, 0.82)"
  context.lineWidth = 2
  context.beginPath()
  context.roundRect(8, 12, 240, 42, 10)
  context.fill()
  context.stroke()
  context.font = "600 22px Arial, sans-serif"
  context.fillStyle = "rgba(248, 251, 255, 0.96)"
  context.textAlign = "center"
  context.textBaseline = "middle"
  context.fillText(label.toUpperCase(), 128, 34, 214)

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

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
        color: "#bde7ff",
        transparent: true,
        opacity: 0.4,
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
  const orientation = useMemo(() => {
    return new Quaternion().setFromUnitVectors(
      new Vector3(0, 0, 1),
      position.clone().normalize(),
    )
  }, [position])
  const labelTexture = useMemo(
    () => createPointLabelTexture(point.label),
    [point.label],
  )
  const labelScale = useMemo(() => {
    return Math.min(0.64, Math.max(0.32, point.label.length * 0.046))
  }, [point.label])

  useFrame(({ clock }) => {
    if (!pulse.current || reducedMotion) {
      return
    }

    const wave = (Math.sin(clock.elapsedTime * 2.1 + position.x) + 1) / 2
    const scale = selected ? 1.45 + wave * 0.16 : 1.12 + wave * 0.18
    pulse.current.scale.setScalar(scale)
  })

  return (
    <group position={position} quaternion={orientation}>
      {selected ? (
        <mesh>
          <torusGeometry args={[0.075, 0.006, 12, 48]} />
          <meshBasicMaterial
            color="#f4fbff"
            transparent
            opacity={0.92}
            blending={AdditiveBlending}
          />
        </mesh>
      ) : null}
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
          color="#d8f3ff"
          transparent
          opacity={selected ? 0.56 : 0.32}
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
        <meshBasicMaterial color={selected ? "#ffffff" : "#9edcff"} />
      </mesh>
      {labelTexture ? (
        <sprite position={[0, 0, 0.15]} scale={[labelScale, 0.1, 1]}>
          <spriteMaterial
            map={labelTexture}
            transparent
            opacity={selected ? 0.96 : 0.76}
            depthTest
          />
        </sprite>
      ) : null}
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
  const targetRotation = useRef<Quaternion | null>(null)
  const earthTexture = useEarthTexture()
  const fallbackEarthTexture = useFallbackEarthTexture()
  const visibleEarthTexture = earthTexture ?? fallbackEarthTexture
  const pointLookup = useMemo(() => {
    return new Map(globePoints.map((point) => [point.id, point]))
  }, [])
  const arcLookup = useMemo(() => {
    return globeArcs.reduce<
      Array<{ id: string; fromPoint: GlobePoint; toPoint: GlobePoint }>
    >((arcs, arc) => {
      const fromPoint = pointLookup.get(arc.from)
      const toPoint = pointLookup.get(arc.to)

      if (fromPoint && toPoint) {
        arcs.push({ id: arc.id, fromPoint, toPoint })
      }

      return arcs
    }, [])
  }, [pointLookup])

  useFrame((_, delta) => {
    if (!group.current) {
      return
    }

    if (targetRotation.current) {
      if (reducedMotion) {
        group.current.quaternion.copy(targetRotation.current)
        targetRotation.current = null
        return
      }

      group.current.quaternion.slerp(
        targetRotation.current,
        Math.min(1, delta * 2.85),
      )

      if (group.current.quaternion.angleTo(targetRotation.current) < 0.003) {
        group.current.quaternion.copy(targetRotation.current)
        targetRotation.current = null
      }

      return
    }

  })

  useEffect(() => {
    const selectedPoint = selectedId ? pointLookup.get(selectedId) : null

    if (!selectedPoint) {
      targetRotation.current = null
      return
    }

    const selectedVector = latLngToVector3(
      selectedPoint.lat,
      selectedPoint.lng,
      radius,
    ).normalize()
    const yaw = Math.atan2(-selectedVector.x, selectedVector.z)
    const yawRotation = new Quaternion().setFromAxisAngle(polarAxis, yaw)
    const afterYaw = selectedVector.clone().applyQuaternion(yawRotation)
    const pitch = Math.max(
      -maxSelectionPitch,
      Math.min(maxSelectionPitch, Math.atan2(afterYaw.y, afterYaw.z)),
    )

    targetRotation.current = new Quaternion()
      .setFromAxisAngle(pitchAxis, pitch)
      .multiply(yawRotation)
  }, [pointLookup, selectedId])

  useEffect(() => {
    if (!group.current || !drag.active) {
      return
    }

    targetRotation.current = null
    group.current.rotation.y += drag.x * 0.004
    group.current.rotation.x = Math.max(
      -maxManualPitch,
      Math.min(maxManualPitch, group.current.rotation.x + drag.y * 0.0035),
    )
    group.current.rotation.z = 0
  }, [drag])

  return (
    <>
      <ambientLight intensity={1.45} />
      <directionalLight position={[3, 3.4, 4]} intensity={2.75} color="#f8fbff" />
      <pointLight
        position={[-2.8, 2.4, 2.7]}
        intensity={5.8}
        distance={8}
        color="#f4f8ff"
      />
      <pointLight position={[0, 3.2, 3.8]} intensity={1.9} distance={7} color="#ffffff" />

      <group ref={group} rotation={[0.26, -2.79, 0]}>
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
            color="#f7fbff"
            side={BackSide}
            transparent
            opacity={0.16}
            blending={AdditiveBlending}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[radius * 1.04, 64, 64]} />
          <meshBasicMaterial
            color="#ffffff"
            side={BackSide}
            transparent
            opacity={0.24}
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
      className="relative mx-auto h-[74vw] max-h-[17rem] w-[74vw] max-w-[17rem] touch-none overflow-visible sm:h-[24rem] sm:max-h-none sm:w-full sm:max-w-[24rem] md:h-[29rem] md:max-w-[29rem] lg:h-[31rem] lg:max-w-none"
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
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,rgba(226,239,255,0.2)_48%,transparent_72%)] blur-xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[66%] w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/90 shadow-[0_0_18px_4px_rgba(255,255,255,0.82),0_0_36px_10px_rgba(214,232,255,0.46)]" />

      {webgl === null ? (
        <div className="absolute inset-0 animate-pulse bg-primary-foreground/[0.06]" />
      ) : (
        <Canvas
          className="!absolute !inset-0 !h-full !w-full"
          dpr={[1, 1.65]}
          camera={{ position: [0, 0, 5.15], fov: 40, near: 0.1, far: 100 }}
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
