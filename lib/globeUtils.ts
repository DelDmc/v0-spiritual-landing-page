import { Vector3 } from "three"

import type { GlobePoint } from "@/data/globePoints"

export function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  return new Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

export function createArcPoints(
  from: GlobePoint,
  to: GlobePoint,
  radius: number,
) {
  const start = latLngToVector3(from.lat, from.lng, radius)
  const end = latLngToVector3(to.lat, to.lng, radius)
  const distance = start.distanceTo(end)
  const altitude = Math.min(0.55, Math.max(0.22, distance * 0.22))

  return Array.from({ length: 38 }, (_, index) => {
    const progress = index / 37
    const point = start.clone().lerp(end, progress).normalize()
    const lift = Math.sin(Math.PI * progress) * altitude
    return point.multiplyScalar(radius + lift)
  })
}

export function supportsWebGL() {
  if (typeof window === "undefined") {
    return false
  }

  try {
    const canvas = document.createElement("canvas")
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl")),
    )
  } catch {
    return false
  }
}
