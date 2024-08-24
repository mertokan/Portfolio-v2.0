import {NextRequest, NextResponse} from 'next/server'
import prisma from '@/lib/db'

const paramID = (link: string) => {
  const url = new URL(link)
  const searchParams = new URLSearchParams(url.searchParams)
  const paramId = searchParams.get('id')
  return paramId
}

export async function GET(req: NextRequest) {
  try {
    const about = await prisma.project.findMany()
    return NextResponse.json(about, {status: 200})
  } catch (error) {
    console.error('Error fetching About:', error)
    return NextResponse.json({error: 'Error fetching About'}, {status: 500})
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {title, description, liveLink, githubLink, codeLangIds, image, placement, iDev} = body
  
    // Zorunlu alanları kontrol et
    if (
      !title ||
      !description ||
      !codeLangIds ||
      codeLangIds.length === 0 ||
      !image ||
      !liveLink ||
      !githubLink ||
      !placement
    ) {
      return NextResponse.json({error: 'Please enter all fields'}, {status: 400})
    }

    // Yeni proje oluştur

    // Yeni proje oluştur
    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        live: liveLink,
        github: githubLink,
        image,
        codeLangs: {
          connect: codeLangIds.map((id: string) => ({id})),
        },

        placement,
        iDev,
      },
    })

    return NextResponse.json(
      {message: 'Project created successfully', project: newProject},
      {status: 200}
    )
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({error: 'Error creating project'}, {status: 500})
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const projectId = paramID(req.url)

    if (!projectId) {
      return NextResponse.json({error: 'ID is required'}, {status: 400})
    }

    await prisma.project.delete({
      where: {id: String(projectId)},
    })

    return NextResponse.json({message: 'Project deleted successfully'}, {status: 200})
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({error: 'Error deleting project'}, {status: 500})
  }
}
