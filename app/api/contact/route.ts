import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Forward to FastAPI backend if running, else log locally
    const backendUrl = process.env.BACKEND_URL;
    if (backendUrl) {
      const res = await fetch(`${backendUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("Backend error");
    } else {
      // Development fallback — log to console
      console.log("Contact form submission:", { name, email, message });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
