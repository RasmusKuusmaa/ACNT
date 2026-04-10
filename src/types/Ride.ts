export interface Ride {
  id: number
  date: string
  car: string
  startKm: number
  endKm: number
  km: number
  purpose: string
  route: string
}

export type Stats = {
  monthKm: number
  monthSum: number
  yearKm: number
  yearSum: number
  totalKm: number
  totalSum: number
}