import prisma from "@/lib/client"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {

    const { question } = await request.json()

    const data = await prisma.question.update({
        where: {
            id: (params.id)
        },
        data: {
            question
        }
    })
    if (!data) {
        return NextResponse.json("question", { status: 400 })
    }
    return NextResponse.json(question, { status: 200 })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    if (params.id) {
        const question = await prisma.question.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json(question, { status: 200 })
    }
    else {
        const question = await prisma.question.deleteMany()
        return NextResponse.json(question, { status: 200 })
    }
}

