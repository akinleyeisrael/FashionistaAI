import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, SyntheticEvent, useState } from "react";
import SidePanel from "./SidePanel";
import prisma from "@/lib/client";
import { QuestionForm } from "./form";
import { Question } from "@prisma/client";

export async function Home() {
  const questions = await prisma.question.findMany({
    orderBy: {
      createAt: "desc",
    },
  });
  // const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  return (
    <div>
      <SidePanel questions={questions} />
      <div className="flex flex-col mx-auto items-center justify-center max-w-4xl mt-10 space-y-6 px-10 md:ml-[32rem] ">
        <div>
          <h1 className="text-2xl font-semibold tracking-tighter">
            FashioNista AI
          </h1>
          <p className="text-base">Ask questions about fashion.</p>
        </div>
        {/* <QuestionForm question={question} /> */}
        {/* View Field */}
        <div className="bg-gray-100 rounded h-[22rem] w-full border"></div>
        <div>
          <p className="text-muted-foreground font-thin tracking-tight">
            Powered By ChatGBT
          </p>
          <p className="text-muted-foreground inline-flex">
            Made With{" "}
            <span>
              <Link
                className="inline-flex text-primary"
                href={"https://github.com/akinleyeisrael/openai"}
              >
                <GitHubLogoIcon className="m-1" />
                Fashionista_Ai
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Home;
