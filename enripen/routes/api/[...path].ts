import { Hono } from "https://deno.land/x/hono@v3.2.3/mod.ts"
import { serveStatic } from "https://deno.land/x/hono@v3.2.5/middleware.ts"

import { genDocs, WhyDoc } from "https://deno.land/x/whydoc@rel1/doc.ts"
import { find, saveLink } from "../../core/data.ts"

const app = new Hono({
  strict: false,
})
const doc = WhyDoc({
  title: "Enripen API Docs",
  basePath: "/api",
})

app.post(
  doc(
    "/find",
    "Takes JSON POST params to find saved URLs. Returns JSON in the format: { <path>: [{ linkFrom: string, linkTo: string, createdAt: Date, submittersCount: number }] }.",
    {
      postParams: {
        URL: "string",
      },
    },
  ),
  async (c) => c.json(await find((await c.req.json()).URL)),
)

app.post(
  doc("/save", "Takes JSON POST params to save a new link. Returns 'Saved!'.", {
    postParams: {
      oldURL: "string",
      newURL: "string",
    },
  }),
  async (c) => {
    const body = await c.req.json()
    saveLink(
      body.oldURL,
      body.newURL,
      (c.env?.remoteAddr as Deno.NetAddr).hostname,
    )

    return c.text("Saved!")
  },
)

app.get("/api/test", (c) => {
  console.log((c.env?.remoteAddr as Deno.NetAddr).hostname)

  return c.text("testing")
})

app.get("/api/docs", serveStatic({ path: "./docs.html" }))

// app.get("enripen.deno.dev/*", (c) => c.text(c.req.url))
// app.get("*", (c) => c.text(c.req.url))

export const handler = app.fetch
