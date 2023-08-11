import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY!,
});
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    if (!prompt) {
      return new NextResponse("prompt are required", {
        status: 400,
      });
    }

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );

    return NextResponse.json(response);
  } catch (error: any) {
    console.log("[MUSIC ERROR]", error.message);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
