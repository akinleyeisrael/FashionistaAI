"use client";
import { Button } from "@/components/ui/button";
import { Question } from "@prisma/client";
import { ExitIcon, GearIcon, IconJarLogoIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { QuestionForm } from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const SidePanel = ({ questions }: { questions: Question[] }) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

    const triggerOpen = () => {
        setIsOpen(!isOpen);
    };

    // const handleEditClick = (question: Question) => {
    //     setSelectedQuestion(question);
    // };

    const handleDeleteClick = async (question: Question) => {
        if (question) {
            await fetch(`/api/openai/${question.id}`, {
                method: "DELETE"
            })
        }
        else {
            await fetch(`/api/openai/`, {
                method: "DELETE"
            })
        }
        return question
        router.refresh()
    }
    return (
        <div className="">
            <div className="flex justify-end p-3 md:hidden">
                <Button onClick={triggerOpen}>xx</Button>
            </div>
            <div
                className={`${isOpen ? "block" : "hidden"
                    } md:block fixed bg-primary w-full max-w-xs top-0 h-screen md:max-w-sm`}
            >
                <div className="text-primary-foreground flex flex-col pt-4 px-2">
                    <div className="mb-2">
                        <h1 className="text-center items-center font-semibold text-lg mb-4 leading-tight tracking-wider">
                            <p className="inline-flex"> History
                                <Popover>
                                    <PopoverTrigger><GearIcon className=" m-[0.3rem] hover:text-purple-500" /></PopoverTrigger>
                                    <PopoverContent className="bg-primary w-60">
                                        <p className="text-primary-foreground text-xs">Clear all chats  <Button onClick={(question: Question) => handleDeleteClick(question)} className="ml-10 text-xs" variant={"destructive"}>Delete all</Button></p>
                                    </PopoverContent>
                                </Popover>
                            </p>
                        </h1>

                    </div>

                    <div className="max-h-[calc(100vh-4rem)] overflow-auto scroll px-2">
                        {questions.map((question) => (
                            <li key={question.id} className="py-2 list-none relative">
                                <div className="bg-purple-500 rounded-full absolute m-1 h-2 w-2"></div>
                                <div className="absolute inline-flex end-0 m-1 space-x-2">
                                    {/* {selectedQuestion && <QuestionForm key={selectedQuestion.id} question={selectedQuestion} />} */}
                                    {/* <p className="hover:cursor-pointer hover:text-purple-500" onClick={() => handleEditClick(question)}>
                                        <Pencil2Icon />
                                    </p> */}
                                    <Dialog>
                                        <DialogTrigger>
                                            <Pencil2Icon />
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Edit </DialogTitle>
                                                <DialogDescription>
                                                    Make changes to your questions here. Copy and submit.
                                                </DialogDescription>
                                            </DialogHeader>
                                            {question && <QuestionForm key={question.id} question={question} />}
                                        </DialogContent>
                                    </Dialog>
                                    <p className="hover:cursor-pointer hover:text-red-500" onClick={() => handleDeleteClick(question)}>
                                        <TrashIcon />
                                    </p>
                                </div>
                                <p className="text-xs ml-6 break-before-all break-words max-w-[13rem] sm:max-w-[16rem]">
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
