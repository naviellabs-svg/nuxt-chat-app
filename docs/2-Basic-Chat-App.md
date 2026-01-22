# Basic-Chat-app

## Step 1

### app.vue
- [ ] add `<NuxtPage /> `component

### app
- [ ] pages folder
- [ ] in pages add index.vue
- [ ] add template
```
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
```

###pages
- [ ] add new file chat.vue
```
<template>
    <h1>This is a chat</h1>
</template>
```