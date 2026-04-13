import type { Ride } from '@/types/Ride'
import { supabase } from './supabase'

const API_URL = import.meta.env.VITE_API_URL

async function getToken() {
    const { data } = await supabase.auth.getSession()
    return data.session?.access_token
}

export async function getRides(): Promise<Ride[]> {
    const token = await getToken()

    const res = await fetch(`${API_URL}/rides`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) throw new Error('Failed to fetch rides')

    return await res.json()
}

export async function addRide(ride: Ride): Promise<Ride> {
    const token = await getToken()

    const res = await fetch(`${API_URL}/rides`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ride)
    })

    if (!res.ok) throw new Error('Failed to add ride')

    return await res.json()
}

export async function addRidesBulk(rides: Ride[]) {
    const token = await getToken()

    const res = await fetch(`${API_URL}/rides/bulk`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rides)
    })

    return res.json()
}