'use server'
import prisma from '@/lib/db'

export async function getCv() {
  const allCv = await prisma.cv.findMany()
  return allCv
}
