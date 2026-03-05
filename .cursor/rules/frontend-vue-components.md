---
description: "Vue component patterns: presentational components with props in, events out"
globs: ["app/components/**"]
alwaysApply: false
---

# Vue Component Patterns

## Component Philosophy

- Keep components simple and presentational
- **Props in, events out** - components receive data via props and communicate via events
- Avoid owning global or route-specific state
- Use composables only for UI-specific logic (e.g., scroll behavior)

## Component Structure

- Use `<script setup lang="ts">` for Composition API
- Define props with TypeScript interfaces
- Define emits with TypeScript types
- Keep template clean and readable
- Use scoped styles for component-specific CSS

## Props Pattern

```typescript
const props = defineProps<{
  messages: ChatMessage[]
  chat: Chat
}>()
```

## Events Pattern

```typescript
const emit = defineEmits<{ 'send-message': [message: string] }>()

function handleSendMessage(message: string) {
  emit('send-message', message)
}
```

## Component Usage

- Components are auto-imported from `app/components/`
- Use PascalCase for component names
- Pass props using `:prop-name` syntax
- Listen to events using `@event-name` syntax

## Examples

```vue
<!-- Component receives props and emits events -->
<script setup lang="ts">
import type { ChatMessage, Chat } from '../types'

const props = defineProps<{
  messages: ChatMessage[]
  chat: Chat
}>()

const emit = defineEmits<{ 'send-message': [message: string] }>()

function handleSendMessage(message: string) {
  emit('send-message', message)
}
</script>

<template>
  <div>
    <div v-for="message in messages" :key="message.id">
      {{ message.content }}
    </div>
    <ChatInput @send-message="handleSendMessage" />
  </div>
</template>
```

```vue
<!-- Page uses composable and passes to component -->
<script setup lang="ts">
const { chat, messages, sendMessage } = useChat()
</script>

<template>
  <ChatWindow :chat="chat" :messages="messages" @send-message="sendMessage" />
</template>
```

## References

@app/components/ChatWindow.vue
@app/pages/chat.vue
@docs/2-Basic-Chat-App.md
