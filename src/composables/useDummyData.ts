import type { Ride } from '@/types/Ride'

const purposes = [
  'Client meeting',
  'Office commute',
  'Airport trip',
  'Business trip',
  'Equipment transport',
  'Site visit',
  'Delivery',
]

const cars = [
  'Toyota Corolla',
  'Volkswagen Passat',
  'Skoda Octavia',
  'BMW 320',
]

const cities = [
  'Tallinn',
  'Tartu',
  'Pärnu',
  'Narva',
  'Viljandi',
  'Rakvere',
]

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomDate(startYear = 2024, endYear = 2026): string {
  const start = new Date(startYear, 0, 1).getTime()
  const end = new Date(endYear, 11, 31).getTime()

  const randomTime = randomBetween(start, end)
  return new Date(randomTime).toISOString().split('T')[0]!
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

function generateRoute(): string {
  const stopsCount = randomBetween(2, 4)
  const stops: string[] = []

  for (let i = 0; i < stopsCount; i++) {
    stops.push(randomItem(cities))
  }

  if (Math.random() > 0.5 && stops.length > 1) {
    stops.push(stops[0]!)
  }

  return stops.join('-')
}

export function generateDummyRides(count: number): Ride[] {
  const rides: Ride[] = []

  let currentKm = 10000

  for (let i = 0; i < count; i++) {
    const distance = randomBetween(5, 120)

    const startKm = currentKm
    const endKm = startKm + distance

    currentKm = endKm

    rides.push({
      id: Date.now() + i,
      date: randomDate(),
      car: randomItem(cars),
      startKm,
      endKm,
      km: distance,
      purpose: randomItem(purposes),
      route: generateRoute(),
    })
  }

  return rides
}