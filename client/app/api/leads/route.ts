import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5006";

    // Attempt forwarding to express backend server
    try {
      const backendRes = await fetch(`${apiUrl}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(5000),
      });

      if (backendRes.ok) {
        const data = await backendRes.json();
        return NextResponse.json(data);
      }
    } catch (err: any) {
      console.warn("Express backend server offline, logging lead locally:", err?.message);
    }

    // Graceful success fallback: log lead in runtime console
    console.log("[INXYME WEBINAR LEAD RECEIVED]:", {
      ...body,
      received_at: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Lead recorded successfully. Our advisor will connect shortly.",
      isFallback: true,
    });
  } catch (err: any) {
    console.error("Error processing lead submission:", err);
    return NextResponse.json(
      { success: false, message: "Internal error processing registration" },
      { status: 500 }
    );
  }
}
