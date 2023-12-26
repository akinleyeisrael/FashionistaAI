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