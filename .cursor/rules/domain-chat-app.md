---
description: "Chat app domain-specific patterns: message handling, chat state, and UI patterns"
globs: ["app/components/ChatWindow.vue", "app/composables/useChat.ts"]
alwaysApply: false
---

# Chat App Domain Patterns

## Type Definitions

Define TypeScript interfaces for chat functionality:

```typescript
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export interface Chat {
  id: string
  title: string
  messages: ChatMessage[]
}
```

## Chat State Management

- Use composable (`useChat`) to manage chat state
- Store chat object with messages array
- Use computed property for messages array
- Create helper function for message creation

## Message Handling

- Messages have unique IDs (use array length as ID)
- Messages have roles: 'user' or 'assistant'
- Add user messages immediately
- Handle assistant responses asynchronously

## UI Patterns

- Empty state when no messages
- Chat header with title
- Messages list with conditional styling based on role
- Message input always visible at bottom
- Scroll to bottom button when scrolled up

## Scroll Behavior

- Auto-scroll to bottom on new messages (if user was at bottom)
- Show scroll button when user scrolls up
- Smooth scroll animation with easing
- Use template refs for scroll container

## Examples

```typescript
// Chat composable
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

  function sendMessage(message: string) {
    messages.value.push(createMessage(message, 'user'))
    setTimeout(() => {
      messages.value.push(createMessage(`Response: ${message}`, 'assistant'))
    }, 200)
  }

  return { chat, messages, sendMessage }
}
```

```vue
<!-- Chat UI -->
<template>
  <div v-if="!messages?.length" class="empty-state">
    <ChatInput @send-message="handleSendMessage" />
  </div>
  <template v-else>
    <div class="chat-header">
      <h1>{{ chat?.title || 'Untitled Chat' }}</h1>
    </div>
    <div class="messages-container">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="{
          'message-user': message.role === 'user',
          'message-ai': message.role === 'assistant'
        }"
      >
        {{ message.content }}
      </div>
    </div>
    <ChatInput @send-message="handleSendMessage" />
  </template>
</template>
```

## References

@app/types.ts
@app/composables/useChat.ts
@app/composables/mockData.ts
@app/components/ChatWindow.vue
@docs/2-Basic-Chat-App.md
