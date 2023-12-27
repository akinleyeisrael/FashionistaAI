"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Question } from "@prisma/client";
import {
    CopyIcon,
    Cross1Icon,
    CrossCircledIcon,
    Crosshair1Icon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useRef, useState } from "react";
import { toast } from "sonner";

export const QuestionForm = ({ question }: { question: Question }) => {
    // const [data, setData] = useState(String);
    const [data, setData] = useState(question ? question.question : "");
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const clearSubmitForm = () => {
        if (textareaRef.current) {
            textareaRef.current.value = "";
        }
    };

    const copyTextAreaValue = async () => {
        await navigator.clipboard.writeText(data);
        toast.info("Copied to clipboard!");
    };

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
        } else {
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
            formRef.current?.reset();
        }
        router.refresh();
    };
    return (
        <div>
            <form ref={formRef} className="space-y-2 w-full" onSubmit={onSubmitText}>
                {question && (
                    <p>
                        <CopyIcon
                            className="hover:cursor-pointer"
                            onClick={copyTextAreaValue}
                        />
                    </p>
                )}
                {!question && (
                    <CrossCircledIcon
                        onClick={clearSubmitForm}
                        className=" hover:cursor-pointer absolute m-1 end-10 sm:end-[168px] "
                    />
                )}
                <Textarea
                    ref={textareaRef}
                    cols={200}
                    onChange={(e) => setData(e.target.value)}
                    defaultValue={data}
                ></Textarea>
                {!question && <Button>{"Submit"}</Button>}
            </form>
        </div>
    );
};
