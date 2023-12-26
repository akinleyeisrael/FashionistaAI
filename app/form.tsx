"use client";
import React, { useRef } from "react";
import { FormEvent, SyntheticEvent, useState } from "react";
import { FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Question } from "@prisma/client";

export const QuestionForm = ({ question }: { question: Question }) => {
    // const [data, setData] = useState(String);
    const [data, setData] = useState(String);
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null)

    const onSubmitText = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (question) {
            await fetch("/api/openai/" + question.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: data,
                }),
            });
        }
        else {
            await fetch("/api/openai/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: data,
                }),
            });
        }
        if (formRef.current) {
            formRef.current?.reset()
        }
        router.refresh()
    };
    return (
        <div>
            <form ref={formRef} className="space-y-6 w-full" onSubmit={onSubmitText}>
                <Textarea
                    cols={200}
                    onChange={(e) => setData(e.target.value)}
                    defaultValue={question ? question.question : ""}
                ></Textarea>
                {question ? "" : <Button>{"Add"}</Button>}

            </form>
        </div>
    );
};

