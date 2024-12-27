import {NextRequest, NextResponse} from "next/server";
import OpenAI from "openai";
import {OpenAIStream, StreamingTextResponse} from "ai";

export async function POST(req: NextRequest) {
  const {query, history} = await req.json();
  console.log(query);
  console.log(history);

  const openai = new OpenAI({apiKey: process.env.OPEN_AI_API});

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      {role: "system", content: "You are a helpful assistant."},
      ...history,
      {
        role: "user",
        content: query,
      },
    ],
  });

  const stream = OpenAIStream(completion);

  return new StreamingTextResponse(stream);
  // const res = completion.choices[0].message.content;

  // return NextResponse.json({result: {role: "assistant", content: res}}, {status: 200});
}
