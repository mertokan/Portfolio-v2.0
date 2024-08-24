import {NextRequest, NextResponse} from 'next/server'
import prisma from '@/lib/db'

const paramID = (link: string) => {
  const url = new URL(link)
  const searchParams = new URLSearchParams(url.searchParams)
  const aboutId = searchParams.get('id')
  return aboutId
}
export async function GET(req: NextRequest) {
  try {
    const aboutId = paramID(req.url)

    if (!aboutId) {
      const about = await prisma.about.findMany()
      return NextResponse.json(about, {status: 200})
    }

    // Önce gelen ID'nin geçerli bir ObjectID olduğundan emin olun
    if (!isValidObjectId(aboutId)) {
      return NextResponse.json({error: 'Invalid ObjectID format'}, {status: 400})
    }

    const about = await prisma.about.findUnique({
      where: {id: aboutId},
    })

    if (!about) {
      return NextResponse.json({error: 'About not found'}, {status: 404})
    }

    return NextResponse.json(about, {status: 200})
  } catch (error) {
    console.error('Error fetching About:', error)
    return NextResponse.json({error: 'Error fetching About'}, {status: 500})
  }
}

// Verilen stringin geçerli bir ObjectID olup olmadığını kontrol eden fonksiyon
function isValidObjectId(id: string): boolean {
  return /^[a-f\d]{24}$/i.test(id)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {position, description, smallTitle} = body

    if (!position || !description || !smallTitle) {
      return NextResponse.json({error: 'Please enter all fields'}, {status: 400})
    }

    await prisma.about.create({
      data: {description, position, smallTitle},
    })

    return NextResponse.json({message: 'About uploaded successfully'}, {status: 200})
  } catch (error) {
    console.error('Error creating About:', error)
    return NextResponse.json({error: 'Error creating About'}, {status: 500})
  }
}

export async function PUT(req: NextRequest) {
  try {
    const aboutId = paramID(req.url)

    const body = await req.json()
    const {id, position, description, smallTitle} = body

    await prisma.about.update({
      where: {id: String(aboutId)},
      data: {description, position, smallTitle},
    })

    return NextResponse.json({message: 'About updated successfully'}, {status: 200})
  } catch (error) {
    console.error('Error updating About:', error)
    return NextResponse.json({error: 'Error updating About'}, {status: 500})
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const aboutId = paramID(req.url) // URL'den ID'yi çekmek

    // console.log('Request URL:', req.url) // URL kontrolü
    // console.log('About ID:', aboutId) // ID kontrolü

    if (!aboutId) {
      return NextResponse.json({error: 'ID is required'}, {status: 400})
    }

    const deletedAbout = await prisma.about.delete({
      where: {id: String(aboutId)},
    })

    // console.log('Deleted About:', deletedAbout) // Silinen kayıt kontrolü

    return NextResponse.json({message: 'About deleted successfully'}, {status: 200})
  } catch (error) {
    console.error('Error deleting About:', error) // Hata loglama
    return NextResponse.json({error: 'Error deleting About'}, {status: 500})
  }
}
