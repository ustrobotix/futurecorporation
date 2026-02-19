import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { name, email, message } = body

        // Validation
        if (!name || typeof name !== "string" || name.trim().length < 2) {
            return NextResponse.json({ error: "Name is required (min 2 characters)." }, { status: 400 })
        }
        if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: "A valid email is required." }, { status: 400 })
        }
        if (!message || typeof message !== "string" || message.trim().length < 10) {
            return NextResponse.json({ error: "Message is required (min 10 characters)." }, { status: 400 })
        }

        // TODO: Integrate with an email service (Resend, SendGrid, etc.)
        // For now, log and return success
        console.log("[Contact Form]", { name: name.trim(), email: email.trim(), message: message.trim() })

        return NextResponse.json({ success: true, message: "Message sent successfully!" })
    } catch {
        return NextResponse.json({ error: "Invalid request." }, { status: 400 })
    }
}
