import {NextRequest, NextResponse} from 'next/server'
import prisma from '@/lib/db'

const paramID = (link: string) => {
  const url = new URL(link)
  const searchParams = new URLSearchParams(url.searchParams)
  const aboutId = searchParams.get('id')
  return aboutId
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const allCodeLang = await prisma.codeLang.findMany()

    return NextResponse.json(allCodeLang, {status: 200})
  } catch (error) {
    console.error('Error fetching Code Language:', error)
    return NextResponse.json({error: 'Error fetching Code Language'}, {status: 500})
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {title} = body

    if (!title) {
      return NextResponse.json({error: 'Please enter all fields'}, {status: 400})
    }

    await prisma.codeLang.create({
      data: {title},
    })

    return NextResponse.json({message: 'Code Language uploaded successfully'}, {status: 200})
  } catch (error) {
    console.error('Error creating Code Language:', error)
    return NextResponse.json({error: 'Error creating Code Language'}, {status: 500})
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const codeLangId = paramID(req.url)

    if (!codeLangId) {
      return NextResponse.json({error: 'ID is required'}, {status: 400})
    }

    const deleteCodeLang = await prisma.codeLang.delete({
      where: {id: String(codeLangId)},
    })

    return NextResponse.json(
      {message: 'Code Language updated successfully', deleteCodeLang},
      {status: 200}
    )
  } catch (error) {
    console.error('Error updating Code Language:', error)
    return NextResponse.json({error: 'Error updating Code Language'}, {status: 500})
  }
}
