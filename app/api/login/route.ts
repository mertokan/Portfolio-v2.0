import prisma from '@/lib/db'
import bcrypt from 'bcrypt'
import * as jose from 'jose'

export async function POST(req: Request) {
  //Extract data sent in

  const body = await req.json()
  const {username, password} = body

  //Validate data
  if (!username || !password) {
    return Response.json({error: 'Invalid username or password'}, {status: 400})
  }
  //Lookup the user
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  })
  if (!user) {
    return Response.json({error: 'Invalid username or password'}, {status: 400})
  }
  //Compare password
  const isCorrectPassword = bcrypt.compareSync(password, user.password)

  if (!isCorrectPassword) {
    return Response.json({error: 'Invalid username or password'}, {status: 400})
  }
  //Create JWT token
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const alg = 'HS256'
  const jwt = await new jose.SignJWT({})
    .setProtectedHeader({alg})
    .setExpirationTime('1h')
    .setSubject(user.id.toString())
    .sign(secret)

  //Return success or error response

  return Response.json({token: jwt})
}
