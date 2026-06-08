import { NextRequest, NextResponse } from "next/server";

const SG_EPC_API_BASE = process.env.SG_EPC_API_BASE!;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ cipFileId: string }> },
) {
  const { cipFileId } = await params;

  const res = await fetch(
    `${SG_EPC_API_BASE}/v1/cip/download/input/${encodeURIComponent(cipFileId)}`,
    {
      headers: { Accept: "*/*" },
      cache: "no-store",
    },
  );

  const body = await res.arrayBuffer();

  if (!res.ok) {
    return NextResponse.json(
      { error: "Upstream error", status: res.status },
      { status: res.status },
    );
  }

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": res.headers.get("Content-Type") ?? "application/zip",
      "Content-Disposition":
        res.headers.get("Content-Disposition") ??
        `attachment; filename="CIP-${cipFileId}.zip"`,
    },
  });
}
