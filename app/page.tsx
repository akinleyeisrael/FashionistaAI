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


const Home = async () => {
  const questions = await prisma.question.findMany({
    orderBy: {
      createAt: "desc",
    },
  });
  // const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  return (
    <div>
     
    </div>
  );
};
export default Home;
