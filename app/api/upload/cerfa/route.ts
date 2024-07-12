/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { promises as fs } from 'fs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    console.log('Received a POST request')

    // Check if the request method is POST
    if (req.method !== 'POST') {
        console.log(`Method ${req.method} Not Allowed`)
        return NextResponse.json(
            { error: `Method ${req.method} Not Allowed` },
            { status: 405, headers: { Allow: 'POST' } },
        )
    }

    try {
        // Get the form data from the request
        const formData = await req.formData()
        console.log('Form data received')

        const file = formData.get('image') as File
        console.log('File extracted from form data:', file)

        if (!file) {
            throw new Error('No file uploaded')
        }

        // Convert the file to a Buffer
        const buffer = Buffer.from(await file.arrayBuffer())
        console.log('File converted to buffer')

        const fileName = `${uuidv4()}-${Date.now()}${path.extname(file.name)}`
        console.log('Generated file name:', fileName)

        // Define the file path
        const filePath = path.join(
            process.cwd(),
            'public/uploads/cerfas/',
            fileName,
        )
        console.log('File path:', filePath)

        // Save the file
        await fs.writeFile(filePath, buffer)
        console.log('File saved successfully')

        // Return the file path
        return NextResponse.json(
            { filePath: `/uploads/cerfas/${fileName}` },
            { status: 200 },
        )
    } catch (err: any) {
        console.error('Error occurred:', err.message)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
