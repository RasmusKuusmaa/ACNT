import { supabase } from './supabase'

export async function apiGetMe() {
  const session = await supabase.auth.getSession()
  const token = session.data.session?.access_token

  const res = await fetch(import.meta.env.VITE_API_URL + '/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.json()
}