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

export interface Stats {
  monthKm: number
  monthSum: number
  monthTaxable: number   
  yearKm: number
  yearSum: number
  yearTaxable: number   
  totalKm: number
  totalSum: number
  totalTaxable: number   
}