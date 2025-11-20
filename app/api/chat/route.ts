import { NextRequest, NextResponse } from 'next/server'

// Optional: declare runtime (uncomment if needed for edge/server).
// export const runtime = 'nodejs'

interface IncomingBody {
  message?: string
  session_id?: string
}

export async function POST(req: NextRequest) {
  let body: IncomingBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { message, session_id } = body
  if (!message || typeof message !== 'string' || message.trim() === '') {
    return NextResponse.json({ error: 'message is required' }, { status: 400 })
  }

  const backendUrl = process.env.BACKEND_CHAT_URL || 'http://127.0.0.1:8000/chat'

  try {
    const resp = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: message,
        session_id: session_id || 'default-session'
      }),
    })

    if (!resp.ok) {
      const text = await resp.text().catch(() => '')
      return NextResponse.json(
        {
          error: 'Backend error',
          status: resp.status,
          backendBody: text.slice(0, 500)
        },
        { status: 502 }
      )
    }

    // If the backend supports streaming, we can pipe the response directly.
    // If it returns a JSON object, we might need to handle it differently,
    // but for now, let's assume we can pass the body through.
    // The frontend runtime will handle parsing if it's JSON or text.

    return new NextResponse(resp.body, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (err: any) {
    return NextResponse.json({ error: 'Unexpected server error', details: err?.message }, { status: 500 })
  }
}
