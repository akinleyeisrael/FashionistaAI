import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const { question } = await request.json()

    const data = await prisma.question.create({
        data: {
            question
        }
    })
    if (!data) {
        return NextResponse.json("question", { status: 400 })
    }
    return NextResponse.json(question, { status: 200 })
}

//DELETE ALL
export async function DELETE(req: NextRequest) {
    const question = await prisma.question.deleteMany()
    return NextResponse.json(question, { status: 200 })
}

