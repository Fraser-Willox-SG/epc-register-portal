import { NextResponse } from "next/server";

const SG_EPC_API_BASE = process.env.SG_EPC_API_BASE!;

function errMsg(e: unknown): string {
  if (e instanceof Error) return e.message;
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}

export async function GET() {
  try {
    const res = await fetch(`${SG_EPC_API_BASE}/v1/data-extracts/list`, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const text = await res.text();

    if (!res.ok) {
      return NextResponse.json(
        {
          error: "Upstream error",
          status: res.status,
          body: text.slice(0, 800),
        },
        { status: res.status },
      );
    }

    return new NextResponse(text, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e: unknown) {
    return NextResponse.json({ error: errMsg(e) }, { status: 500 });
  }
}
