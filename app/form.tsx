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
import { Message, useChat } from "ai/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, SyntheticEvent, useRef, useState } from "react";
import { toast } from "sonner";

export const QuestionForm = ({ question }: { question?: Question }) => {
    const [data, setData] = useState(question ? question.messages : "");
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { messages, input, handleInputChange, handleSubmit } = useChat();

    console.log(input);
    console.log(messages);

    const clearSubmitForm = () => {
        if (textareaRef.current) {
            textareaRef.current.value = "";
        }
    };

    const copyTextAreaValue = async () => {
        await navigator.clipboard.writeText(data);
        toast.info("Copied to clipboard!");
    };

    const handleOnchange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setData(e.target.value);
        handleInputChange(e)
    };


    const onSubmitQuestion = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handleSubmit(e)

        if (question) {
            await fetch("/api/question/" + question.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: data,
                }),
            });
        } else {
            await fetch("/api/question/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: data,
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
            <form ref={formRef} className="space-y-2 w-full" onSubmit={onSubmitQuestion}>
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
                    // value={input}
                    ref={textareaRef}
                    cols={200}
                    onChange={handleOnchange}
                    defaultValue={data}
                ></Textarea>
                {!question && <Button>{"Submit"}</Button>}
            </form>

            <div className="flex flex-col w-full py-24 mx-auto h-[20rem]  bg-secondary mt-6">
                {messages.length > 0
                    ? messages.map(m => (
                        <div key={m.id} className="whitespace-pre-wrap">
                            {m.role === 'user' ? 'User: ' : 'AI: '}
                            {m.content}
                        </div>
                    ))
                    : null}
            </div>
        </div>
    );
};
