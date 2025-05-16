temporarily archived, I think LLMs with large context windows might make something like this much more effective so I'm waiting until the trajectory of LLM context window increase kind of stabilizes (or when it's large enough for this kind of thing) (I wrote this note just a few days after the Gemini 1.5 Pro announcement)

also this kind of approach is honestly almost certainly unfeasible (at least for me right now, as it needs a large-ish number of users to start to be useful (although simply integrating things like the Wayback Machine in a nice UI could help with that))

---

# Enripen
A crowdsourced index to help against link rot. Crowd needed.

[Web UI](https://enripen.deno.dev/) using Fresh

[API](https://enripen.deno.dev/api) using Hono embedded in a Fresh route

[API Doc](https://enripen.deno.dev/api/docs)

<img width="200" alt="Screenshot 2023-06-15 at 11 36 24 AM" src="https://github.com/denoland/deno-kv-hackathon/assets/58201828/b5893be4-8a4c-4c59-861c-bf662e01b07c">

<img width="200" alt="Screenshot 2023-06-15 at 11 45 17 AM" src="https://github.com/denoland/deno-kv-hackathon/assets/58201828/35276ad7-5e0b-4279-b688-e418a974efad">

<img width="200" alt="Screenshot 2023-06-15 at 11 48 40 AM" src="https://github.com/denoland/deno-kv-hackathon/assets/58201828/88c31e38-2f1b-4f6e-a198-7c30c10a38a1">


## How it works/will work
There will be a browser extension that uses the API to automatically suggest redirects when you encounter a broken link. A user would also be able to submit new destination links for a broken link, and upvote links submitted by others that work.

---

Uses the Fresh framework, with Flowbite components, and Hono (embedded inside a Fresh route) for the API.

GPLv3 License, all open source libraries used have their own licenses.
