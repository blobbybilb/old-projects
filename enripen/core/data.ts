/// <reference lib="deno.unstable" />

import { type SavedLinkInfo, SavedLinkInfoResponse } from "./types.ts"

export const kv = await Deno.openKv()
// ["link", "example.com", "path", "to", "page.html"] : SavedLinkInfo[]

function formatLink(url: string): string[] {
  if (!url.startsWith("http")) url = "http://" + url

  const urlType = new URL(url)

  return [
    urlType.hostname,
    ...urlType.pathname.split("/").filter((x) =>
      !(x === "" || x === "index.html")
    ),
  ]
} // example.com/path/to/page.html -> ["example.com", "path", "to", "page.html"]

function unformatLink(url: string[]): string {
  return url.join("/")
}

export async function getSavedLink(
  url: string[] | string,
): Promise<SavedLinkInfo[] | null> {
  if (typeof url === "string") {
    url = formatLink(url)
  }

  return (await kv.get(["links", ...url])).value as SavedLinkInfo[] | null
}

function isInSavedLinkList(
  newURL: string,
  oldURL: string,
  linkList: SavedLinkInfo[],
): SavedLinkInfo | false {
  for (const link of linkList) {
    if (link.linkTo === newURL && link.linkFrom === oldURL) {
      return link
    }
  }
  return false
}

export async function saveLink(
  oldURL: string,
  newURL: string,
  submitterIP: string,
) {
  const oldUrlItems = await getSavedLink(formatLink(oldURL))
  if (oldUrlItems) {
    const newUrlItem = isInSavedLinkList(newURL, oldURL, oldUrlItems)
    if (newUrlItem) {
      if (newUrlItem.submitterIPs.includes(submitterIP)) return
      newUrlItem.submitterIPs.push(submitterIP)
      return await kv.set(["links", ...formatLink(oldURL)], oldUrlItems)
    }
    oldUrlItems.push({
      linkFrom: oldURL,
      linkTo: newURL,
      createdAt: new Date(),
      submitterIPs: [submitterIP],
    })
    return await kv.set(["links", ...formatLink(oldURL)], oldUrlItems)
  }

  const info: SavedLinkInfo = {
    linkFrom: oldURL,
    linkTo: newURL,
    createdAt: new Date(),
    submitterIPs: [submitterIP],
  }
  return await kv.set(["links", ...formatLink(oldURL)], [info])
}

export async function find(
  urlstr: string,
): Promise<Record<string, SavedLinkInfoResponse[]>> {
  const url = formatLink(urlstr)
  const res: Record<string, SavedLinkInfo[]> = {}

  while (url.length > 1) {
    const link = await getSavedLink(url)

    if (link) {
      res[unformatLink(url)] = link
    }
    url.pop()
  }

  const domain = url[0]
  const link = await getSavedLink(domain)
  if (link) {
    res[domain] = link
  }

  domain.split(".").forEach(async (_, i, arr) => {
    const subdomain = arr.slice(i).join(".")

    if (subdomain) {
      const link = await getSavedLink(subdomain)

      if (link) {
        res[subdomain] = link
      }
    }
  })

  return convertSubmitterIPsToCount(res)
}

function convertSubmitterIPsToCount(
  findData: Record<string, SavedLinkInfo[]>,
) {
  const res: Record<string, SavedLinkInfoResponse[]> = {}

  for (const [key, value] of Object.entries(findData)) {
    res[key] = value.map((x) => ({
      linkFrom: x.linkFrom,
      linkTo: x.linkTo,
      createdAt: x.createdAt,
      submittersCount: x.submitterIPs.length,
    }))
  }

  return res
}

// removed because this will probably end up being example.com -> www.example.com -> example.com
// const wwwDomain = "www." + domain
// const link = await getSavedLink(wwwDomain)
// if (link) {
//   res[wwwDomain] = link
// }

// testing

// await saveLink("example.com", "example2.com", "192.168.0.1")
// await saveLink("examplwe.com", "example1232.com", "192.168.0.1")
// await saveLink("example.com", "example1232.com", "192.16.0.1")
// await saveLink("example.com", "example1232.com", "192.16.0.1")
// await saveLink("example.com", "example1232.com", "192.168.0.1")
// await saveLink("example.com", "example1232.com", "192.1688.0.1")
// const savedLinks = await getSavedLink("examplwe.com")

// console.log(3, savedLinks)

// const iter = kv.list({ prefix: ["links"] })
// const users = []
// for await (const res of iter) users.push(res)

// for (const user of users) {
//   await kv.delete(user.key)
// }

// testing find

await saveLink("example.com", "example2.com", "10.0.0.1")
await saveLink("example.com", "example3.com", "34987")
await saveLink("example.com/path", "example4.com", "34987")
await saveLink("example.com/path/another", "example5.com", "34987")
await saveLink("example.com/path/another/more", "example5.com", "34987")
await saveLink("example.com/path", "example5.com", "34987")

console.log(await find("example.com/path/asdjhkf"))

// const iter = kv.list({ prefix: ["links"] })
// const users = []
// for await (const res of iter) users.push(res)

// for (const user of users) {
//   await kv.delete(user.key)
// }
