import prisma from '@/lib/db'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  //Read data off req body

  const body = await req.json()
  const {username, password, name} = body

  //Validate data
  if (!username || !password) {
    return Response.json({error: 'Please enter all fields'}, {status: 400})
  }
  //Hash the password
  const hash = bcrypt.hashSync(password, 10)
  //Create a user in db
  await prisma.user.create({
    data: {
      name,
      username,
      password: hash,
    },
  })

  //Return success or error response

  return Response.json({})
}
