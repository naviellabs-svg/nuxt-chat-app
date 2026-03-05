---
description: "Server API route patterns: defineEventHandler, request handling, and response patterns"
globs: ["server/api/**"]
alwaysApply: false
---

# Backend API Route Patterns

## Server Routes

- API routes go in `server/api/` directory
- Files automatically become routes (e.g., `server/api/ai.ts` → `/api/ai`)
- Use `defineEventHandler()` to create route handlers
- Routes are async by default

## Request Handling

- Use `readBody(event)` to read request body
- Destructure needed data from body
- Handle async operations with `async/await`

## Response Patterns

- Return objects directly (automatically JSON serialized)
- Return appropriate status codes
- Use template literals for string interpolation

## TypeScript Types

- Use TypeScript for type safety
- Define interfaces for request/response types
- Use type inference where possible

## Examples

```typescript
// Basic GET route
export default defineEventHandler(() => ({
  role: 'assistant',
  content: '(server) hello!',
}))
```

```typescript
// POST route with body handling
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { messages } = body

  const lastMessage = messages[messages.length - 1]

  return {
    role: 'assistant',
    content: `(server) You said: ${lastMessage.content}`,
  }
})
```

## File Structure

```
server/
└── api/
    └── ai.ts
```

## References

@server/api/ai.ts
@docs/2-Basic-Chat-App.md
