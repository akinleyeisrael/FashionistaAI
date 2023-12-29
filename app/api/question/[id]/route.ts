import prisma from "@/lib/client"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {

    const { messages } = await request.json()

    const question = await prisma.question.update({
        where: {
            id: (params.id)
        },
        data: {
            messages
        }
    })
    if (!question) {
        return NextResponse.json(messages, { status: 400 })
    }
    return NextResponse.json(messages, { status: 200 })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const question = await prisma.question.delete({
        where: {
            id: params.id
        }
    })
    return NextResponse.json(question, { status: 200 })
}

