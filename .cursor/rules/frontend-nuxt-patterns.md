---
description: "Nuxt 3+ file-based routing, layouts, pages, and head management patterns"
globs: ["app/pages/**", "app/layouts/**", "app/app.vue"]
alwaysApply: false
---

# Nuxt Patterns

## File-Based Routing

- Pages in `app/pages/` automatically become routes
- Use `NuxtPage` component in `app.vue` to render pages
- Pages can specify layouts using `definePageMeta({ layout: 'name' })`

## App Structure

- `app/app.vue` is the root component
- Wrap with `<UApp>` for Nuxt UI
- Include `<NuxtRouteAnnouncer />` for accessibility
- Use `<NuxtLayout>` to wrap `<NuxtPage />` for layout support

## Layouts

- Shared UI structure goes in `app/layouts/`
- Default layout is `default.vue`
- Use `<slot />` to render page content
- Set layout via `definePageMeta({ layout: 'layout-name' })`
- Layouts can have scoped styles using CSS variables like `var(--ui-bg)`

## Pages

- Pages are Vue components in `app/pages/`
- Use `definePageMeta()` to configure page options
- Pages own composables and state management
- Pass data to components via props

## Head Management

- Use `useHead()` composable for reactive head management
- Use getter function for reactive titles: `title: () => value`
- Updates browser tab title automatically when data changes

## Examples

```vue
<!-- app/app.vue -->
<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
```

```vue
<!-- app/pages/chat.vue -->
<script setup lang="ts">
const { chat } = useChat()

useHead({
  title: () => chat.value?.title ?? 'Chat',
})

definePageMeta({
  layout: 'default'
})
</script>
```

## References

@app/app.vue
@app/pages/chat.vue
@app/pages/index.vue
@app/layouts/default.vue
@docs/2-Basic-Chat-App.md
