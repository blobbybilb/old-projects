Paused, nothing in here currently makes using this more appealing than most other frameworks, but I plan to come back to it after implementing some ideas for why?framework libaries and DB layers.

---

# F4 - The Fast Friendly Functionality Framework

The simplest fairly-featureful web framework. Currently works with the bun runtime only.

### Frictionless & Full-stack
- Simple layer for routing over Hono
```ts
let i = 0
server.addRoutes({
  '/': 'Hello There!',
  '/counter': () => 'Visited ' + (i++) + ' times',
  '/file': 'file://./some_file.txt',
})
```
- User auth in a single line of code
    - `server.auth('/admin', [{ user: 'admin', pass: 'password' }]) // specify a single user`
    - `server.auth('/app', usersDB.get({})) // get all users from DB`
- DB interface that uses TypeScript object types to automatically manage SQLite, no SQL or manual schema definition needed
- Frontend UI helpers based on Boostrap - WIP

### LICENSE
LGPLv3 

Hono web framework is MIT Licensed.
