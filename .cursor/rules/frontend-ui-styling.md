---
description: "UI and styling patterns: Nuxt UI, Tailwind CSS, CSS variables, and component styling"
globs: ["app/assets/**", "**/*.vue"]
alwaysApply: false
---

# UI and Styling Patterns

## Nuxt UI Setup

- Install: `pnpm add @nuxt/ui@latest`
- Add to `nuxt.config.ts` modules: `['@nuxt/ui']`
- Create `app/assets/css/main.css` with `@import "@nuxt/ui"`
- Configure CSS in `nuxt.config.ts`: `css: ['~/assets/css/main.css']`
- Wrap app in `<UApp>` component

## CSS Variables

- Use Nuxt UI CSS variables for theming:
  - `var(--ui-bg)` - Background color
  - `var(--ui-bg-muted)` - Muted background
  - `var(--ui-bg-elevated)` - Elevated background
  - `var(--ui-text)` - Text color
  - `var(--ui-text-muted)` - Muted text
  - `var(--ui-border)` - Border color
  - `var(--ui-radius)` - Border radius
  - `var(--ui-secondary)` - Secondary color

## Scoped Styles

- Use `<style scoped>` for component-specific styles
- Scoped styles don't leak to other components
- Use CSS variables for consistent theming

## Nuxt UI Components

- Use Nuxt UI components: `<UButton>`, `<UContainer>`, etc.
- Components support props like `color`, `variant`, `icon`
- Use icon format: `icon="i-heroicons-arrow-down"`

## Layout Patterns

- Use flexbox for layouts: `display: flex`, `flex-direction: column`
- Use `calc()` for dynamic heights: `height: calc(100vh - 4rem)`
- Use fixed positioning for sticky elements
- Use `z-index` for layering

## Examples

```vue
<template>
  <UContainer class="chat-container">
    <UButton
      color="neutral"
      variant="outline"
      icon="i-heroicons-arrow-down"
      class="rounded-full shadow-sm"
    />
  </UContainer>
</template>

<style scoped>
.chat-container {
  max-width: 800px;
  height: 100%;
}

.message-user {
  background-color: var(--ui-bg-muted);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
}
</style>
```

## VS Code Tailwind Support

- Configure `.vscode/settings.json`:
  - `"files.associations": { "*.css": "tailwindcss" }`
  - `"editor.quickSuggestions": { "strings": "on" }`

## References

@app/assets/css/main.css
@app/components/ChatWindow.vue
@app/layouts/default.vue
@nuxt.config.ts
@docs/1-project-setup.md
