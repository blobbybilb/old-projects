import { serve } from "https://deno.land/std@0.155.0/http/server.ts"
import { type ConnInfo } from "https://deno.land/x/fresh@1.1.6/src/server/deps.ts"

function handler(request: Request, connInfo: ConnInfo) {
  let str = ""
  for (const [key, value] of request.headers.entries()) {
    str += `${key}: ${value}\n`
  }
  return new Response(
    `Your IP is: ${(connInfo.remoteAddr as Deno.NetAddr).hostname}`,
  )
}

serve(handler)
