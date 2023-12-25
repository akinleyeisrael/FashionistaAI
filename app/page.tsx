"use client";
import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import SidePanel from "./SidePanel";

export default function Home() {
  const [data, setData] = useState(String);

  const onSubmitText = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch("api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <div>
      <SidePanel />
      <div className="flex flex-col mx-auto items-center justify-center max-w-4xl space-y-10 m-10 px-10  md:ml-[32rem] ">
        <div>
          <h1 className="text-2xl font-semibold tracking-tighter">
            Fashionista AI
          </h1>
          <p className="text-base">Ask questions about fashion.</p>
        </div>
        <div>
          <form className="space-y-6 w-full" onSubmit={onSubmitText}>
            <FormItem>
              <Textarea
                cols={200}
                value={data}
                onChange={(e) => setData(e.target.value)}
              ></Textarea>
            </FormItem>
            <FormItem>
              <Button>Submit</Button>
            </FormItem>
          </form>
        </div>
        {/* View Field */}
        <div className="bg-gray-100 rounded h-72 w-full border"></div>
        <div>
          <p className="text-muted-foreground font-thin tracking-tight">
            Powered By Open AI
          </p>
          <p className="text-muted-foreground inline-flex">
            Made With{" "}
            <span>
              <Link className="inline-flex text-primary" href={"/"}>
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
