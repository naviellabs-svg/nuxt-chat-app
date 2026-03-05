---
description: "Composables patterns: reusable logic, state management, and lifecycle hooks"
globs: ["app/composables/**"]
alwaysApply: false
---

# Composables Patterns

## Composable Structure

- Composables are reusable functions that use Vue's Composition API
- Export as default function: `export default function useName()`
- Return reactive state and functions
- Keep composables focused and single-purpose

## State Management

- Use `ref()` for reactive state
- Use `computed()` for derived state
- Initialize with default values or mock data
- Return state and functions in an object

## Template Refs

- Use `useTemplateRef<T>()` for DOM element references
- Specify type: `useTemplateRef<HTMLDivElement>('refName')`
- Access via `.value` property

## Lifecycle Hooks

- Use `onMounted()` for setup (event listeners, initial scroll)
- Use `onUnmounted()` for cleanup (remove event listeners)
- Use `onUpdated()` for update checks
- Use `nextTick()` when waiting for DOM updates

## Data Fetching with $fetch

- Use `$fetch` (Nuxt auto-import from ofetch) to call server API routes from composables
- Use `async` functions and `await` when fetching
- Type the response: `$fetch<YourType>('/api/route', { method: 'POST', body: { ... } })`
- POST with JSON body: `body: { key: value }`; the server reads it with `readBody(event)`

## Helper Functions

- Create helper functions for reusable logic
- Keep functions pure when possible
- Use TypeScript types for parameters and return values

## Examples

```typescript
// State management composable
export default function useChat() {
  const chat = ref<Chat>(MOCK_CHAT)
  const messages = computed<ChatMessage[]>(() => chat.value.messages)

  function createMessage(message: string, role: ChatMessage['role']) {
    return {
      id: messages.value.length.toString(),
      role,
      content: message,
    }
  }

  async function sendMessage(message: string) {
    messages.value.push(createMessage(message, 'user'))
    const data = await $fetch<ChatMessage>('/api/ai', {
      method: 'POST',
      body: { messages: messages.value },
    })
    messages.value.push(data)
  }

  return {
    chat,
    messages,
    sendMessage,
  }
}
```

```typescript
// UI-specific composable with lifecycle hooks
export default function useChatScroll() {
  const scrollContainer = useTemplateRef<HTMLDivElement>('scrollContainer')
  const isAtBottom = ref(true)
  const showScrollButton = ref(false)

  function checkScrollPosition(): void {
    if (scrollContainer.value) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value
      isAtBottom.value = scrollTop + clientHeight >= scrollHeight - 200
      showScrollButton.value = !isAtBottom.value
    }
  }

  onMounted(() => {
    if (scrollContainer.value) {
      scrollContainer.value.addEventListener('scroll', checkScrollPosition)
      nextTick(() => {
        scrollToBottom(true)
      })
    }
  })

  onUnmounted(() => {
    if (scrollContainer.value) {
      scrollContainer.value.removeEventListener('scroll', checkScrollPosition)
    }
  })

  return {
    isAtBottom,
    showScrollButton,
    scrollToBottom,
    pinToBottom,
  }
}
```

## References

@app/composables/useChat.ts
@app/composables/useChatScroll.ts
@app/composables/mockData.ts
@docs/2-Basic-Chat-App.md
