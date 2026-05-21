import { NextRequest, NextResponse } from "next/server";

const SG_EPC_API_BASE = process.env.SG_EPC_API_BASE!;

const allowedFormats = ["csv", "xlsx", "7z", "zip"] as const;

function errMsg(e: unknown): string {
  if (e instanceof Error) return e.message;
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ reportId: string }> },
) {
  try {
    const { reportId } = await params;
    const incoming = new URL(req.url);
    const format = incoming.searchParams.get("format") ?? "csv";

    if (!allowedFormats.includes(format as never)) {
      return NextResponse.json(
        { error: "bad_request", message: "Invalid report format" },
        { status: 400 },
      );
    }

    const upstream = new URL(
      `${SG_EPC_API_BASE}/v1/reports/download/${encodeURIComponent(reportId)}`,
    );

    upstream.searchParams.set("format", format);

    const res = await fetch(upstream.toString(), {
      headers: {
        Accept: "*/*",
      },
      cache: "no-store",
    });

    const body = await res.arrayBuffer();

    if (!res.ok) {
      const text = new TextDecoder().decode(body);
      return NextResponse.json(
        {
          error: "Upstream error",
          status: res.status,
          body: text.slice(0, 800),
        },
        { status: res.status },
      );
    }

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type":
          res.headers.get("Content-Type") ?? "application/octet-stream",
        "Content-Disposition":
          res.headers.get("Content-Disposition") ??
          `attachment; filename="${reportId}.${format}"`,
      },
    });
  } catch (e: unknown) {
    return NextResponse.json({ error: errMsg(e) }, { status: 500 });
  }
}
