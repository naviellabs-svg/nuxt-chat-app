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

### app
- [ ] add new file types.ts

### types.ts
- ```
[ ] export interface ChatMessage {
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

### app
- [ ] create folder composable
 -[ ] create file useChat.ts

 ### useChat.ts

 - [ ]add import type { Chat, ChatMessage } from '../types'
 - [ ]add new file in composables mockData.ts
 - [ ] get user data from repo templaes
 ```
 import type { Chat, ChatMessage } from '../types'

// Mock data for initial messages
const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    content:
      'Hello, can you help me with my Nuxt.js project?',
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
```

- [ ] now import it into useChat.ts

### useChat.ts
- [ ] craete first compoasbels and functions
'''
import type { Chat, ChatMessage } from '../types'
import { MOCK_CHAT } from './mockData'

export default function useChat() {
    const chat = ref<Chat>(MOCK_CHAT)
    const messages = computed<ChatMessage[]>(
        () => chat.value.messages
)

function createMessage(
    message: string,
    role: ChatMessage['role']
) {
    const id = messages.value.length.toString()

    return {
        id,
        role,
        conetnt: message,
    }
}

function sendMessage(message: string) {
    messages.value.push(createMessage(message, 'user'))

    setTimeout(() => {
        messages.value.push(
            createMessage(`You said: ${message}`, 'assistant')
        )
    }, 200)
}


return {
    chat,
    messages,
    sendMessage,
}
}
```