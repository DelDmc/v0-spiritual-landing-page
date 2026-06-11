export type GlobePoint = {
  id: string
  label: string
  country: string
  city?: string
  lat: number
  lng: number
  category: "base" | "tour" | "mentorship" | "preaching" | "community"
  title: string
  description: string
}

export type GlobeArc = {
  id: string
  from: string
  to: string
}

export const globePoints: GlobePoint[] = [
  {
    id: "bali-indonesia",
    label: "Bali",
    country: "Indonesia",
    city: "Bali",
    lat: -8.4095,
    lng: 115.1889,
    category: "base",
    title: "Spiritual and cultural base",
    description:
      "Guru-ma and Guru Maharaj's work is rooted in Bali and Indonesia, combining spiritual education, family guidance, and community service.",
  },
  {
    id: "indonesia",
    label: "Indonesia",
    country: "Indonesia",
    lat: -2.5489,
    lng: 118.0149,
    category: "mentorship",
    title: "Main field of service",
    description:
      "Most of the people mentored by Guru-ma and Guru Maharaj are based in Indonesia.",
  },
  {
    id: "india",
    label: "India",
    country: "India",
    lat: 20.5937,
    lng: 78.9629,
    category: "preaching",
    title: "Spiritual connection",
    description:
      "India is part of the wider network connected with their preaching and mentorship.",
  },
  {
    id: "australia",
    label: "Australia",
    country: "Australia",
    lat: -25.2744,
    lng: 133.7751,
    category: "mentorship",
    title: "International mentorship",
    description:
      "Their mentorship also reaches devotees and families in Australia.",
  },
  {
    id: "malaysia",
    label: "Malaysia",
    country: "Malaysia",
    lat: 4.2105,
    lng: 101.9758,
    category: "mentorship",
    title: "Regional spiritual support",
    description:
      "Malaysia is part of the regional network of people connected with their guidance.",
  },
  {
    id: "ukraine",
    label: "Ukraine",
    country: "Ukraine",
    lat: 48.3794,
    lng: 31.1656,
    category: "mentorship",
    title: "Wider international reach",
    description: "Their guidance has also reached people from Ukraine.",
  },
  {
    id: "russia",
    label: "Russia",
    country: "Russia",
    lat: 61.524,
    lng: 105.3188,
    category: "mentorship",
    title: "Wider international reach",
    description: "Their guidance has also reached people from Russia.",
  },
  {
    id: "switzerland",
    label: "Switzerland",
    country: "Switzerland",
    lat: 46.8182,
    lng: 8.2275,
    category: "tour",
    title: "European tour destination",
    description:
      "Switzerland is one of the countries connected with the European preaching tour and the international support network.",
  },
  {
    id: "italy",
    label: "Italy",
    country: "Italy",
    lat: 41.8719,
    lng: 12.5674,
    category: "tour",
    title: "European tour destination",
    description:
      "Italy is one of the planned countries in the European preaching tour.",
  },
  {
    id: "germany",
    label: "Germany",
    country: "Germany",
    lat: 51.1657,
    lng: 10.4515,
    category: "tour",
    title: "European tour destination",
    description:
      "Germany is one of the planned countries in the European preaching tour.",
  },
  {
    id: "belgium",
    label: "Belgium",
    country: "Belgium",
    lat: 50.5039,
    lng: 4.4699,
    category: "tour",
    title: "European tour destination",
    description:
      "Belgium is one of the planned countries in the European preaching tour.",
  },
  {
    id: "netherlands",
    label: "Netherlands",
    country: "Netherlands",
    lat: 52.1326,
    lng: 5.2913,
    category: "tour",
    title: "European tour destination",
    description:
      "The Netherlands is one of the planned countries in the European preaching tour.",
  },
  {
    id: "norway",
    label: "Norway",
    country: "Norway",
    lat: 60.472,
    lng: 8.4689,
    category: "tour",
    title: "European tour destination",
    description:
      "Norway is one of the planned countries in the European preaching tour.",
  },
]

export const globeArcs: GlobeArc[] = [
  { id: "bali-italy", from: "bali-indonesia", to: "italy" },
  { id: "italy-switzerland", from: "italy", to: "switzerland" },
  { id: "switzerland-germany", from: "switzerland", to: "germany" },
  { id: "germany-belgium", from: "germany", to: "belgium" },
  { id: "belgium-netherlands", from: "belgium", to: "netherlands" },
  { id: "netherlands-norway", from: "netherlands", to: "norway" },
  { id: "bali-india", from: "bali-indonesia", to: "india" },
  { id: "bali-australia", from: "bali-indonesia", to: "australia" },
  { id: "bali-malaysia", from: "bali-indonesia", to: "malaysia" },
  { id: "bali-switzerland", from: "bali-indonesia", to: "switzerland" },
]
