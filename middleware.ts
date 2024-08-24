import {cookies} from 'next/headers'
import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import * as jose from 'jose'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  //Check for cookie
  const cookie = cookies().get('accessToken')
  if (!cookie) {
    return NextResponse.redirect(new URL('/dashboard/login', request.url))
  }
  //Validate cookie
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET)
  const jwt = cookie.value

  try {
    const {payload} = await jose.jwtVerify(jwt, secretKey, {})

    return NextResponse.redirect(new URL('/dashboard', request.url))
  } catch (err) {
    // err
    return NextResponse.redirect(new URL('/dashboard/login', request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/protected'],
}
