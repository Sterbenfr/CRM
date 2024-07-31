/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { promises as fs } from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/authOptions'

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.redirect(new URL('/error/not-access', req.url))
    }

    if (req.method !== 'POST') {
        return NextResponse.json(
            { error: `Method ${req.method} Not Allowed` },
            { status: 405, headers: { Allow: 'POST' } },
        )
    }

    try {
        const formData = await req.formData()

        const file = formData.get('image') as File

        if (!file) {
            throw new Error('No file uploaded')
        }

        const buffer = Buffer.from(await file.arrayBuffer())

        const fileName = `${uuidv4()}-${Date.now()}${path.extname(file.name)}`

        const filePath = path.join(
            process.cwd(),
            'public/uploads/cerfas/',
            fileName,
        )

        await fs.writeFile(filePath, buffer)

        return NextResponse.json(
            { filePath: `/uploads/cerfas/${fileName}` },
            { status: 200 },
        )
    } catch (err: any) {
        console.error('Error occurred:', err.message)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
