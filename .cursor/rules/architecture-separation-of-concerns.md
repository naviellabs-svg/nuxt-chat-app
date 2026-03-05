---
description: "Architecture patterns: Pages vs Layouts vs Components - separation of concerns"
alwaysApply: false
---

# Separation of Concerns

## Pages (`app/pages/`)

- Own Nuxt-specific composables (e.g., `useChat`)
- Manage route-specific state and logic
- Pass data down to components via props
- Use `useHead()` for page-specific head management
- Use `definePageMeta()` for page configuration

## Layouts (`app/layouts/`)

- Shared UI structure across multiple pages
- Set via `definePageMeta({ layout: '...' })`
- Use `<slot />` to render page content
- Keep layouts simple and reusable

## Components (`app/components/`)

- Keep components simple and presentational
- **Props in, events out** - receive data via props, communicate via events
- Avoid owning global or route-specific state
- Use composables only for UI-specific logic (e.g., `useChatScroll`)

## Composables (`app/composables/`)

- Reusable logic and state management
- Return reactive state and functions
- Keep composables focused and single-purpose
- Can be used by pages or UI-specific composables

## Data Flow

```
Page (owns composables)
  ↓ (passes props)
Component (presentational)
  ↓ (emits events)
Page (handles events)
```

## Examples

```vue
<!-- Page owns composable -->
<script setup lang="ts">
const { chat, messages, sendMessage } = useChat()

useHead({
  title: () => chat.value?.title ?? 'Chat',
})
</script>

<template>
  <ChatWindow :chat="chat" :messages="messages" @send-message="sendMessage" />
</template>
```

```vue
<!-- Component is presentational -->
<script setup lang="ts">
const props = defineProps<{
  messages: ChatMessage[]
  chat: Chat
}>()

const emit = defineEmits<{ 'send-message': [message: string] }>()

// UI-specific composable only
const { showScrollButton, scrollToBottom } = useChatScroll()
</script>
```

## Guidelines

- **Pages**: Own composables, manage state, handle events
- **Components**: Receive props, emit events, present UI
- **Layouts**: Shared structure, use slots
- **Composables**: Reusable logic, state management

## References

@app/pages/chat.vue
@app/components/ChatWindow.vue
@app/layouts/default.vue
@app/composables/useChat.ts
@docs/2-Basic-Chat-App.md
