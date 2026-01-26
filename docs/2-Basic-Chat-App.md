# Basic Chat App

## Step 1 - Create pages with file-based routing and the NuxtPage Component

### app/app.vue

- [ ] Update app.vue to include NuxtPage component

  ```bash
  cat > app/app.vue << 'EOF'
  <template>
    <UApp>
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </UApp>
  </template>
  EOF
  ```

  > Adds the `<NuxtPage />` component which renders the current page based on file-based routing.

### app/pages

- [ ] Create pages directory

  ```bash
  mkdir -p app/pages
  ```

  > Creates the pages directory for file-based routing.

- [ ] Create index.vue page

  ```bash
  cat > app/pages/index.vue << 'EOF'
  <template>
    <UContainer class="page-container">
      <h1 class="title">Nuxt Chat</h1>
      <UButton to="/chat" class="button">
        Start Chat
      </UButton>
    </UContainer>
  </template>

  <style scoped>
  .page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .title {
    font-size: 2.25rem;
    font-weight: bold;
  }

  .button {
    margin-top: 1rem;
  }
  </style>
  EOF
  ```

  > Creates the home page with a welcome message and button to navigate to the chat page.

- [ ] Create chat.vue page

  ```bash
  cat > app/pages/chat.vue << 'EOF'
  <template>
    <h1>This is a chat</h1>
  </template>
  EOF
  ```

  > Creates the chat page. This will be the main chat interface.

## Step 2 - Reuse UI with Layouts and the NuxtLayout Component

### app/app.vue

- [ ] Update app.vue to include NuxtLayout component

  ```bash
  cat > app/app.vue << 'EOF'
  <template>
    <UApp>
      <NuxtRouteAnnouncer />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </template>
  EOF
  ```

  > Wraps `<NuxtPage />` with `<NuxtLayout />` to enable layout-based UI reuse across pages.

### app/layouts

- [ ] Create layouts directory

  ```bash
  mkdir -p app/layouts
  ```

  > Creates the layouts directory for reusable page layouts.

- [ ] Create default.vue layout

  ```bash
  cat > app/layouts/default.vue << 'EOF'
  <template>
    <div class="layout-container">
      <main class="main-content">
        <slot />
      </main>
    </div>
  </template>

  <style scoped>
  .layout-container {
    height: calc(100vh - 4rem);
    background-color: var(--ui-bg);
  }

  .main-content {
    height: 100%;
    margin-top: 4rem;
  }
  </style>
  EOF
  ```

  > Creates the default layout with a container and main content area. The `<slot />` renders the page content.

- [ ] Create blue.vue layout for testing

  ```bash
  cat > app/layouts/blue.vue << 'EOF'
  <template>
    <div class="layout-container">
      <main class="main-content">
        <slot />
      </main>
    </div>
  </template>

  <style scoped>
  .layout-container {
    height: calc(100vh - 4rem);
    background-color: var(--ui-secondary);
  }

  .main-content {
    height: 100%;
    margin-top: 4rem;
  }
  </style>
  EOF
  ```

  > Creates a blue layout variant for testing. Uses `var(--ui-secondary)` to change the background color.

### app/pages/chat.vue

- [ ] Update chat.vue to use blue layout

  ```bash
  cat > app/pages/chat.vue << 'EOF'
  <template>
    <h1>This is a chat</h1>
  </template>

  <script setup lang="ts">
  definePageMeta({
    layout: 'blue'
  })
  </script>
  EOF
  ```

  > Sets the chat page to use the blue layout for testing purposes. This demonstrates how to override the default layout.

## Step 3 - Use Composables to Organize Logic

### app/types.ts

- [ ] Create types file

  ```bash
  cat > app/types.ts << 'EOF'
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
  EOF
  ```

  > Defines TypeScript interfaces for chat functionality:
  > - `ChatMessage`: Represents a single message with id, role (user or assistant), and content
  > - `Chat`: Represents a chat conversation with id, title, and array of messages

### app/composables

- [ ] Create composables directory

  ```bash
  mkdir -p app/composables
  ```

  > Creates the composables directory. Composables are reusable functions that use Vue's Composition API.

- [ ] Create mockData.ts file

  ```bash
  cat > app/composables/mockData.ts << 'EOF'
  import type { Chat, ChatMessage } from '../types'

  // Mock data for initial messages
  const MOCK_MESSAGES: ChatMessage[] = [
    {
      id: '1',
      role: 'user',
      content: 'Hello, can you help me with my Nuxt.js project?',
    },
    {
      id: '2',
      role: 'assistant',
      content:
        "Of course! I'd be happy to help with your Nuxt.js project. What specific questions or issues do you have?",
    },
    {
      id: '3',
      role: 'user',
      content: 'How do I implement server-side rendering?',
    },
    {
      id: '4',
      role: 'assistant',
      content:
        "Nuxt.js provides server-side rendering out of the box! You don't need to do any special configuration for basic SSR. If you need specific optimizations, we can discuss those in detail.",
    },
  ]

  // Mock data for initial chat
  const MOCK_CHAT: Chat = {
    id: '1',
    title: 'Nuxt.js project help',
    messages: [...MOCK_MESSAGES],
  }

  export { MOCK_CHAT, MOCK_MESSAGES }
  EOF
  ```

  > Creates mock data for testing:
  > - `MOCK_MESSAGES`: Array of sample chat messages
  > - `MOCK_CHAT`: Sample chat object with messages
  > - Exports both for use in the composable

- [ ] Create useChat.ts composable

  ```bash
  cat > app/composables/useChat.ts << 'EOF'
  import type { Chat, ChatMessage } from '../types'
  import { MOCK_CHAT } from './mockData'

  export default function useChat() {
    // Reactive state: holds the current chat data
    const chat = ref<Chat>(MOCK_CHAT)

    // Computed property: automatically updates when chat.messages changes
    // This provides a reactive reference to the messages array
    const messages = computed<ChatMessage[]>(() => chat.value.messages)

    // Helper function: creates a new message object
    // Takes the message content and role (user or assistant)
    function createMessage(message: string, role: ChatMessage['role']) {
      const id = messages.value.length.toString()

      return {
        id,
        role,
        content: message,
      }
    }

    // Main function: sends a user message and simulates an assistant response
    // 1. Adds the user message to the messages array
    // 2. After 200ms, adds a mock assistant response
    function sendMessage(message: string) {
      messages.value.push(createMessage(message, 'user'))

      setTimeout(() => {
        messages.value.push(
          createMessage(`You said: ${message}`, 'assistant')
        )
      }, 200)
    }

    // Return all the reactive state and functions for use in components
    return {
      chat,        // The full chat object (reactive)
      messages,    // Computed array of messages (reactive)
      sendMessage, // Function to send new messages
    }
  }
  EOF
  ```

  > Creates the `useChat` composable that manages chat state and logic:
  > 
  > **State Management:**
  > - `chat`: Reactive ref holding the current chat data (initialized with mock data)
  > - `messages`: Computed property that automatically returns chat.messages when chat changes
  > 
  > **Functions:**
  > - `createMessage()`: Helper that creates a new message object with auto-generated ID
  > - `sendMessage()`: Adds user message immediately, then simulates assistant response after 200ms
  > 
  > **Return Value:**
  > - Returns reactive state and functions that components can use
  > - This pattern keeps logic separate from UI components

  ## Step 4 - Use Components to Organize UI

  ### app
  - [ ] creat new folder components

  ### components
  - [ ]  copy ChatInput from repo
  - [ ] copy ChatWindow form repo
  
  ### chat.vue

  - [ ] use <Chatwindow />

  ### ChatWindow.vue

  - [ ] update code like this
  ```
  <script setup lang="ts">
  const { chat, messages, sendMessage } = useChat()

  function handleSendMessage(message : string) {
    sendMessage(message)
  }
  
</script>

<template>
    <div ref="scrollContainer" class="scroll-container">
      <UContainer class="chat-container">
        <div v-if="!messages?.length" class="empty-state">
          <div class="empty-state-card">
          <h2 class="empty-state-title">Start a new chat</h2>
          <ChatInput @send-message="handleSendMessage" />
        </div>
      </div>

      <template v-else>
        <div class="chat-header">
          <h1 class="title">
            {{  chat?.title || 'untitled Chat'  }}
            </h1>
        </div>
        <div class="messages-container">
          <div
            v-for="message in messages"
            :key="message.id"
            class="message"
            :class="{
              'message-user': message.role === 'user',
              'message-ai': message.role === 'assistant'
            }"
            >
            <div class="message-content">
              {{  message.content  }}
            </div>
          </div>
        </div>
        <div class="message-form-container">
          <ChatInput @send-message="handleSendMessage" />
        </div>
        </template>
      </UContainer>
    </div>
  </template>
  ```

  