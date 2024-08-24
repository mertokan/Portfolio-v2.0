'use server'
import {cookies} from 'next/headers'
import * as jose from 'jose'
import {redirect} from 'next/navigation'

export async function getCookie(): Promise<string | undefined> {
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET)
  const cookie = await cookies().get('accessToken')
  const jwt = cookie?.value
  if (jwt) {
    try {
      const {payload} = await jose.jwtVerify(jwt, secretKey, {})
    } catch (error) {
      // Handle error
      return redirect('/dashboard/login')
    }
  }
  return jwt
}
