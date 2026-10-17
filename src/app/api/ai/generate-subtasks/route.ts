import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Task title is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      const fallbackSubtasks = [
        `Review requirements for "${title}"`,
        `Draft execution plan & architecture`,
        `Implement core logic and test cases`,
        `Perform QA audit and deploy`
      ];

      return NextResponse.json({
        subtasks: fallbackSubtasks,
        notice: "Using local AI heuristic engine"
      });
    }

    const systemPrompt = `You are an AI Agile Assistant for TaskMatrix. Given a task title and description, generate 3 to 4 concise, actionable sub-steps for this task. You must respond ONLY with a valid, parsable JSON object matching this exact schema: { "subtasks": ["step 1", "step 2", "step 3"] }. Do not include markdown code block wrappers or backticks.`;

    const userPrompt = `Task Title: "${title}"\nTask Description: "${description || "No description provided"}"`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `${systemPrompt}\n\n${userPrompt}` }
              ]
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      const fallbackSubtasks = [
        `Analyze specifications for "${title}"`,
        `Execute development workflow`,
        `Validate edge cases and test`,
        `Finalize deliverable for review`
      ];
      return NextResponse.json({
        subtasks: fallbackSubtasks,
        notice: "AI fallback applied"
      });
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleanJson = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanJson);
    } catch {
      parsed = {
        subtasks: [
          `Analyze specifications for "${title}"`,
          `Execute development workflow`,
          `Validate edge cases and test`,
          `Finalize deliverable for review`
        ]
      };
    }

    return NextResponse.json({
      subtasks: parsed.subtasks || parsed,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error in AI Microservice" },
      { status: 500 }
    );
  }
}
