export interface Ride {
  id?: string
  user_id?: string

  date: string
  car: string

  start_km: number
  end_km: number

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