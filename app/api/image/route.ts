import { Configuration, OpenAIApi } from "openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;
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
    if (!prompt || !prompt.length) {
      return new NextResponse("prompt is required", {
        status: 400,
      });
    }
    if (!resolution) {
      return new NextResponse("resolution is required", {
        status: 400,
      });
    }
    if (!amount) {
      return new NextResponse("amount is required", {
        status: 400,
      });
    }

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    return NextResponse.json(response.data.data);
  } catch (error: any) {
    console.log("[IMAGE ERROR]", error.message);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
