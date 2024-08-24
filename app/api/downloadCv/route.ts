import {NextRequest, NextResponse} from 'next/server'
import prisma from '@/lib/db'

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({error: 'No ID provided'}, {status: 400})
  }

  try {
    const cv = await prisma.cv.findUnique({
      where: {id: String(id)},
    })

    if (!cv) {
      return NextResponse.json({error: 'CV not found'}, {status: 404})
    }

    const arrayBuffer = cv.file ? Buffer.from(cv.file, 'base64') : null

    // Check if arrayBuffer is null or empty
    if (!arrayBuffer || arrayBuffer.length === 0) {
      return NextResponse.json({error: 'Failed to get array buffer from file'}, {status: 500})
    }

    // Set headers to indicate a file download
    const headers = new Headers({
      'Content-Type': 'application/pdf',
      //   'Content-Disposition': `attachment; filename=cv-mert-okan.pdf`,
    })

    return new NextResponse(arrayBuffer, {headers})
  } catch (error) {
    console.error(error)
    return NextResponse.json({error: 'Error fetching CV'}, {status: 500})
  }
}
