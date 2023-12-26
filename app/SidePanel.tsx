"use client";
import { Button } from "@/components/ui/button";
import { Question } from "@prisma/client";
import { Pencil1Icon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useState } from "react";
import { QuestionForm } from "./form";
import Home from "./page";

export const SidePanel = ({ questions }: { questions: Question[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

    const triggerOpen = () => {
        setIsOpen(!isOpen);
    };

    
    const handleEditClick = (question: Question) => {
        setSelectedQuestion(question);
        // <Home question={selectedQuestion!} />
        //i want to get the data and populate the form wiht the question data in same page of another component

    };
    return (
        <div className="">
            <div className="flex justify-end p-4 md:hidden">
                <Button onClick={triggerOpen}>xx</Button>
            </div>
            <div
                className={`${isOpen ? "block" : "hidden"
                    } md:block fixed bg-primary w-full max-w-xs top-0 h-screen md:max-w-sm px-4`}
            >
                <div className="text-primary-foreground flex flex-col pt-4">
                {selectedQuestion && <QuestionForm key={selectedQuestion.id} question={selectedQuestion} />}
                    <div>
                        <h1 className="text-center font-semibold text-lg mb-4 leading-tight tracking-wider">
                            History
                        </h1>

                        {questions.map((question) => (
                            <li key={question.id} className="py-2 list-none">
                                <div className="bg-white rounded-full absolute m-1 h-2 w-2"></div>
                                <div className="absolute inline-flex end-6 m-1 space-x-2">
                                    {" "}
                                    <p onClick={() => handleEditClick(question)}>
                                        <Pencil2Icon/>
                                    </p>
                                    <Link href={""}>
                                        <TrashIcon />
                                    </Link>
                                </div>
                                <p className="text-xs ml-6 break-after-all">
                                    {question.question.length > 100
                                        ? `${question.question.substring(0, 100)}...`
                                        : question.question}
                                </p>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidePanel;
