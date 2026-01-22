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

## Step 2 - 

### app.vue

- [ ] add layoute component 

```
<NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
```
### app 
- [ ]  add new folder and file layouts/deafault.vue
- [ ] from course repo 2-5 start copy defult temp and add 
```
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
```
- [ ] add basic template
```
<template>
    <div class="layout-container">
        <main class="main-content">
            <slot />
        </main>
    </div>
</template>

```

- [ ] duplicate degfual.vue and change it to blue.vue and change backround color to secondary totest 

### chat.vue
- [ ] add script and definePageMeta to set layout to use
```
<script setup lang="ts">
    definePageMeta({
        layout: 'blue'
    })
</script>
```

this is just for testing purposes