"use client";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { MessageSquare, Music, Sparkles } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatCompletionRequestMessage } from "openai";

import Heading from "@/components/custom/Heading";
import Empty from "@/components/custom/Empty";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/custom/Loader";

import { formSchema } from "./constants";

const MusicPage = () => {
  const router = useRouter();
  const [music, setMusic] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);
      const res = await axios.post("/api/music", values);
      console.log(res);
      setMusic(res.data.audio);
      form.reset();
    } catch (error) {
      // TODO: Open pro model
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Music generation"
        description="Generate music from a prompt"
        Icon={Music}
        iconColor="text-emrald-500"
        iconBgColor="bg-emrald-500/10"
      />

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                    rounded-lg
                    border
                    w-full
                    p-4
                    px-3
                    md:px-6
                    focus-within:shadow-sm
                    grid
                    grid-cols-12
                    gap-2
                "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="
                            border-0 outline-none 
                            focus-visible:ring-0
                            focus-visible:ring-transparent
                        "
                        disabled={isLoading}
                        placeholder="Piano solo despacito"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                className="col-span-12 lg:col-span-2 w-full flex gap-x-2 items-center"
              >
                Generate <Sparkles className="w-5 h-5" />
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && <Loader />}
          {!music && !isLoading && <Empty label="No Music yet!" />}
          {music && (
            <audio controls className="w-full">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
