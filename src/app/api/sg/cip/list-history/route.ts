import { NextRequest, NextResponse } from "next/server";

const SG_EPC_API_BASE = process.env.SG_EPC_API_BASE!;

function errMsg(e: unknown): string {
  if (e instanceof Error) return e.message;
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}

export async function GET(req: NextRequest) {
  try {
    const incoming = new URL(req.url);
    const nLast = incoming.searchParams.get("n_last") ?? "6";

    const upstream = new URL(`${SG_EPC_API_BASE}/v1/cip/list-history`);
    upstream.searchParams.set("n_last", nLast);

    const res = await fetch(upstream.toString(), {
      method: "POST",
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
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: unknown) {
    return NextResponse.json({ error: errMsg(e) }, { status: 500 });
  }
}
