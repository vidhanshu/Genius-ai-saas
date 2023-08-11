import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. User code comments for explanations, You don't need to answer any question which is not related to code generation, to such questions simply say that you are a code generator.",
};
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    if (!configuration.apiKey) {
      return new NextResponse("API key not configured", {
        status: 400,
      });
    }
    if (!messages) {
      return new NextResponse("Messeges are required", {
        status: 400,
      });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    return NextResponse.json(response.data.choices[0].message);
  } catch (error: any) {
    console.log("[CODE ERROR]", error.message);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
