import {NextRequest, NextResponse} from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    // Read data off req body
    const body = await req.json()
    const {cvData, language} = body


    // Validate data
    if (!cvData || !language) {
      return NextResponse.json({error: 'Please enter all fields'}, {status: 400})
    }

    // Create a cv in db
    await prisma.cv.create({
      data: {
        file: cvData,
        language,
      },
    })

    // Return success response
    return NextResponse.json({message: 'CV uploaded successfully'}, {status: 200})
  } catch (error) {
    console.error('Error creating CV:', error)
    // Return error response
    return NextResponse.json({error: 'Error creating CV'}, {status: 500})
  }
}
