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

### app/components

- [ ] Create components directory

  ```bash
  mkdir -p app/components
  ```

  > Creates the components directory. Components are reusable UI pieces that can be used across pages.

- [ ] Create ChatInput.vue component

  > Copy the `ChatInput.vue` component from the course repository templates. This component handles message input and emits a `send-message` event.

- [ ] Create ChatWindow.vue component

  > Copy the `ChatWindow.vue` component from the course repository templates. This will be the main chat interface component.

### app/components/ChatWindow.vue

- [ ] Update ChatWindow.vue to use the composable

  ```bash
  cat > app/components/ChatWindow.vue << 'EOF'
  <script setup lang="ts">
  // Use the useChat composable to get chat state and functions
  const { chat, messages, sendMessage } = useChat()

  // Handler function that receives the message from ChatInput component
  // and passes it to the sendMessage function from the composable
  function handleSendMessage(message: string) {
    sendMessage(message)
  }
  </script>

  <template>
    <div ref="scrollContainer" class="scroll-container">
      <UContainer class="chat-container">
        <!-- Empty state: shown when there are no messages -->
        <div v-if="!messages?.length" class="empty-state">
          <div class="empty-state-card">
            <h2 class="empty-state-title">Start a new chat</h2>
            <ChatInput @send-message="handleSendMessage" />
          </div>
        </div>

        <!-- Chat interface: shown when messages exist -->
        <template v-else>
          <!-- Chat header with title -->
          <div class="chat-header">
            <h1 class="title">
              {{ chat?.title || 'Untitled Chat' }}
            </h1>
          </div>

          <!-- Messages list: loops through all messages -->
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
                {{ message.content }}
              </div>
            </div>
          </div>

          <!-- Message input form at the bottom -->
          <div class="message-form-container">
            <ChatInput @send-message="handleSendMessage" />
          </div>
        </template>
      </UContainer>
    </div>
  </template>
  EOF
  ```

  > Updates ChatWindow component to:
  > - **Import composable**: Uses `useChat()` to get reactive chat state and functions
  > - **Handle messages**: `handleSendMessage()` receives messages from ChatInput and passes to composable
  > - **Empty state**: Shows when no messages exist, displays ChatInput to start conversation
  > - **Chat interface**: Shows chat title, loops through messages with conditional styling based on role
  > - **Message input**: Always shows ChatInput at bottom when messages exist

### app/pages/chat.vue

- [ ] Update chat.vue to use ChatWindow component

  ```bash
  cat > app/pages/chat.vue << 'EOF'
  <template>
    <ChatWindow />
  </template>

  <script setup lang="ts">
  definePageMeta({
    layout: 'default'
  })
  </script>
  EOF
  ```

  > Updates the chat page to:
  > - Use the `<ChatWindow />` component (Nuxt auto-imports components from the `components` folder)
  > - Sets layout back to `default` (removes the blue test layout)
  > - The page is now just a wrapper that renders the ChatWindow component

## Step 5 - Add a Button to Scroll to the Bottom of the Chat

### app/composables/useChatScroll.ts

- [ ] Create useChatScroll composable

  ```bash
  cat > app/composables/useChatScroll.ts << 'EOF'
  export default function useChatScroll() {
    // Template refs: references to DOM elements
    const scrollContainer = useTemplateRef<HTMLDivElement>('scrollContainer')
    const textareaRef = useTemplateRef<HTMLTextAreaElement>('textareaRef')
    
    // Reactive state: tracks scroll position and button visibility
    const isAtBottom = ref(true)
    const showScrollButton = ref(false)

    // Check if chat is scrolled to bottom (within 200px threshold)
    // Updates isAtBottom and showScrollButton based on scroll position
    const checkScrollPosition = (): void => {
      if (scrollContainer.value) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value
        isAtBottom.value = scrollTop + clientHeight >= scrollHeight - 200
        showScrollButton.value = !isAtBottom.value
      }
    }

    // Smooth scroll to bottom with easing animation
    // If immediate=true, scrolls instantly without animation
    const scrollToBottom = (immediate = false): void => {
      if (!scrollContainer.value) return

      const targetScrollTop =
        scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight

      if (immediate) {
        scrollContainer.value.scrollTop = targetScrollTop
        return
      }

      // Animated scroll with cubic easing
      const startScrollTop = scrollContainer.value.scrollTop
      const distance = targetScrollTop - startScrollTop
      const duration = 300

      const startTime = performance.now()
      function step(currentTime: number): void {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeInOutCubic =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2

        if (scrollContainer.value) {
          scrollContainer.value.scrollTop =
            startScrollTop + distance * easeInOutCubic

          if (progress < 1) {
            requestAnimationFrame(step)
          }
        }
      }

      requestAnimationFrame(step)
    }

    // Auto-scroll to bottom when new messages arrive (if already at bottom)
    // Prevents interrupting user if they're reading older messages
    async function pinToBottom() {
      if (isAtBottom.value) {
        if (scrollContainer.value) {
          await nextTick()
          scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
        }
      }
    }

    // Setup: add scroll listener and scroll to bottom on mount
    onMounted(() => {
      if (scrollContainer.value) {
        scrollContainer.value.addEventListener('scroll', checkScrollPosition)
        nextTick(() => {
          scrollToBottom(true) // Immediate scroll on mount
          textareaRef.value?.focus()
        })
      }
    })

    // Cleanup: remove scroll listener on unmount
    onUnmounted(() => {
      if (scrollContainer.value) {
        scrollContainer.value.removeEventListener('scroll', checkScrollPosition)
      }
    })

    // Check scroll position whenever component updates
    onUpdated(() => {
      checkScrollPosition()
    })

    return {
      isAtBottom,        // Whether user is at bottom (reactive)
      showScrollButton,  // Whether to show scroll button (reactive)
      scrollToBottom,   // Function to scroll to bottom
      textareaRef,       // Reference to textarea element
      pinToBottom,      // Function to auto-scroll on new messages
    }
  }
  EOF
  ```

  > Creates the `useChatScroll` composable that manages scroll behavior:
  > 
  > **Template Refs:**
  > - `scrollContainer`: Reference to the scrollable chat container
  > - `textareaRef`: Reference to the message input textarea
  > 
  > **State:**
  > - `isAtBottom`: Tracks if user is scrolled to bottom (within 200px)
  > - `showScrollButton`: Controls visibility of scroll-to-bottom button
  > 
  > **Functions:**
  > - `checkScrollPosition()`: Checks current scroll position and updates state
  > - `scrollToBottom()`: Smoothly scrolls to bottom with easing animation
  > - `pinToBottom()`: Auto-scrolls when new messages arrive (if user was at bottom)
  > 
  > **Lifecycle:**
  > - `onMounted`: Sets up scroll listener and scrolls to bottom initially
  > - `onUnmounted`: Cleans up scroll listener
  > - `onUpdated`: Checks scroll position after each update

### app/components/ChatWindow.vue

- [ ] Update ChatWindow.vue to use scroll composable

  ```bash
  cat > app/components/ChatWindow.vue << 'EOF'
  <script setup lang="ts">
  // Use the useChat composable to get chat state and functions
  const { chat, messages, sendMessage } = useChat()
  
  // Use the useChatScroll composable to get scroll functionality
  const { showScrollButton, scrollToBottom, pinToBottom } = useChatScroll()

  // Handler function that receives the message from ChatInput component
  function handleSendMessage(message: string) {
    sendMessage(message)
  }

  // Watch for new messages and auto-scroll if user is at bottom
  watch(() => messages.value, pinToBottom, { deep: true })
  </script>

  <template>
    <div ref="scrollContainer" class="scroll-container">
      <UContainer class="chat-container">
        <!-- Empty state: shown when there are no messages -->
        <div v-if="!messages?.length" class="empty-state">
          <div class="empty-state-card">
            <h2 class="empty-state-title">Start a new chat</h2>
            <ChatInput @send-message="handleSendMessage" />
          </div>
        </div>

        <!-- Chat interface: shown when messages exist -->
        <template v-else>
          <!-- Chat header with title -->
          <div class="chat-header">
            <h1 class="title">
              {{ chat?.title || 'Untitled Chat' }}
            </h1>
          </div>

          <!-- Messages list: loops through all messages -->
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
                {{ message.content }}
              </div>
            </div>
          </div>

          <!-- Message input form at the bottom -->
          <div class="message-form-container">
            <ChatInput @send-message="handleSendMessage" />
          </div>
        </template>
      </UContainer>

      <!-- Scroll to bottom button: appears when user scrolls up -->
      <div class="scroll-to-bottom-button-container">
        <UButton
          v-if="showScrollButton"
          color="neutral"
          variant="outline"
          icon="i-heroicons-arrow-down"
          class="rounded-full shadow-sm"
          @click="scrollToBottom"
        />
      </div>
    </div>
  </template>
  EOF
  ```

  > Updates ChatWindow component to:
  > - **Import scroll composable**: Uses `useChatScroll()` to get scroll functionality
  > - **Watch messages**: Automatically scrolls to bottom when new messages arrive (if user was at bottom)
  > - **Scroll button**: Shows a button when user scrolls up, clicking it scrolls back to bottom
  > - **Template ref**: The `ref="scrollContainer"` connects to the composable's template ref

## Step 6 - Decide Between Pages, Layouts, and Components

Refactor the chat UI so that pages own state and composables, and components stay presentational (props in, events out).

### Guidelines

**Pages**

- [ ] Nuxt-specific pages (file-based routes)
- [ ] Nuxt-specific composables (e.g. `useChat`)
- [ ] Logic that accesses or manages different state

**Layouts**

- [ ] Parts of the UI shared across multiple different pages
- [ ] Set via `definePageMeta({ layout: '...' })`

**Components**

- [ ] Keep components simple and presentational
- [ ] Take in props and emit events; avoid owning global or route-specific state

### app/components/ChatWindow.vue

- [ ] Update ChatWindow to follow guidelines (props in, events out)

  ```vue
  <script setup lang="ts">
  import type { ChatMessage, Chat } from '../types'

  const props = defineProps<{
    messages: ChatMessage[]
    chat: Chat
  }>()

  const emit = defineEmits<{ 'send-message': [message: string] }>()

  const { showScrollButton, scrollToBottom, pinToBottom } = useChatScroll()

  function handleSendMessage(message: string) {
    emit('send-message', message)
  }

  watch(() => props.messages, pinToBottom, { deep: true })
  </script>
  ```

  > ChatWindow receives `chat` and `messages` as props and emits `send-message` instead of using `useChat()` directly.

### app/pages/chat.vue

- [ ] Update chat page to own composables and pass data into ChatWindow

  ```vue
  <script setup lang="ts">
  const { chat, messages, sendMessage } = useChat()
  </script>

  <template>
    <ChatWindow :chat="chat" :messages="messages" @send-message="sendMessage" />
  </template>
  ```

  > The page uses `useChat()` and passes `chat`, `messages`, and `sendMessage` into ChatWindow so the component stays presentational.

## Step 7 - Reactively Update the Head Tag with useHead

### app/pages/chat.vue

- [ ] Set the document title from the current chat

  ```ts
  useHead({
    title: () => chat.value?.title ?? 'Chat',
  })
  ```

  > Updates the browser tab title reactively when `chat.title` changes. Use a getter so the title stays in sync.

## Step 8 - Create a Basic API with Server Routes

### server/api

- [ ] Create API directory

  ```bash
  mkdir -p server/api
  ```

  > Creates the server API directory. Nuxt automatically creates API routes from files in `server/api/`.

- [ ] Create ai.ts API route

  ```bash
  cat > server/api/ai.ts << 'EOF'
  export default defineEventHandler(() => ({
    role: 'assistant',
    content: '(server) hello!',
  }))
  EOF
  ```

  > Creates a basic API endpoint at `/api/ai` that returns a simple response. The `defineEventHandler` function is Nuxt's way of creating server routes.

### server/api/ai.ts

- [ ] Update ai.ts to handle POST requests with messages

  ```bash
  cat > server/api/ai.ts << 'EOF'
  export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { messages } = body

    const lastMessage = messages[messages.length - 1]

    return {
      role: 'assistant',
      content: `(server) You said: ${lastMessage.content}`,
    }
  })
  EOF
  ```

  > Updates the API route to:
  > - Accept POST requests with a body containing `messages`
  > - Extract the last message from the messages array
  > - Return a response that echoes back the user's message
  > - Uses template literals for string interpolation

## Step 9 - Fetch Data From Your API with $fetch

In this lesson, you'll learn how to do basic data fetching with `$fetch` from ofetch. You'll fetch the mocked AI response from the server route you created in the previous lesson.

In future lessons we'll see how we can use `useFetch` and `useAsyncData` to give us some extra benefits that `$fetch` doesn't do for us.

**References:**
- [$fetch - Nuxt Docs](https://nuxt.com/docs/api/utils/dollarfetch)
- [ofetch ($fetch) - GitHub](https://github.com/unjs/ofetch)

### app/composables/useChat.ts

- [ ] Update sendMessage to call the API with $fetch and use the response

  ```ts
  async function sendMessage(message: string) {
    messages.value.push(createMessage(message, "user"));

    const data = await $fetch<ChatMessage>("/api/ai", {
      method: "POST",
      body: {
        messages: messages.value,
      },
    });
    messages.value.push(data);
  }
  ```

  > - `sendMessage` becomes `async` so you can `await` the fetch.
  > - `$fetch` is Nuxt's global (auto-imported) for HTTP requests; it uses [ofetch](https://github.com/unjs/ofetch).
  > - Call `/api/ai` with `method: "POST"` and `body: { messages: messages.value }` to match the server route.
  > - Type the response with `$fetch<ChatMessage>(...)` so the assistant message matches your `ChatMessage` shape.
  > - Push the returned `data` into `messages.value` to replace the previous mock assistant response.
