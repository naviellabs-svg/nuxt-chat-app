---
description: "Complete Nuxt 4 project setup guide - foundational steps for starting any Nuxt project"
alwaysApply: false
---

# Nuxt Project Setup Guide

Complete step-by-step guide for setting up a new Nuxt 4 project with all essential tools and configurations.

## Step 1: Package Management (pnpm)

- Install/enable corepack for pnpm management (Node.js 16.9+ has corepack built-in)
- Use `corepack enable` to enable pnpm
- Use pnpm for all package operations
- Create `.npmrc` with `shamefully-hoist=true` for pnpm compatibility

## Step 2: Create Nuxt Project

- Run `pnpm create nuxt`
- Select pnpm as package manager
- Initialize git repository (yes)
- Skip official modules (add manually as needed)

## Step 3: GitHub Setup

- Create GitHub repository
- Connect local repo: `git remote add origin git@github.com:USERNAME/REPO.git`
- Push initial commit: `git push -u origin main`

## Step 4: Node Version Management (NVM)

- Install NVM for Node version management
- Install latest LTS: `nvm install --lts`
- Create `.nvmrc` file: `node -v > .nvmrc`
- Use `nvm use` to switch to project version

## Step 5: VS Code Setup

- Create `.vscode/extensions.json` with recommended extensions:
  - Prettier
  - Vue Volar
  - Tailwind CSS IntelliSense
  - ESLint
- Create `.vscode/settings.json` with:
  - Format on save enabled
  - Prettier as default formatter
  - Tailwind CSS file associations
  - Quick suggestions for strings

## Step 6: Nuxt UI

- Install: `pnpm add @nuxt/ui@latest`
- Add to `nuxt.config.ts` modules: `['@nuxt/ui']`
- Create `app/assets/css/main.css` with `@import "@nuxt/ui"`
- Configure CSS in `nuxt.config.ts`: `css: ['~/assets/css/main.css']`

## Step 7: ESLint

- Run: `pnpm dlx nuxi module add eslint`
- Add lint scripts to `package.json`:
  - `"lint": "eslint ."`
  - `"lint:fix": "eslint --fix ."`

## Step 8: Husky Pre-commit Hooks

- Install: `pnpm add --save-dev husky`
- Initialize: `pnpm exec husky init`
- Configure `.husky/pre-commit` to run `pnpm lint`

## File Structure

```
project/
├── .vscode/
│   ├── extensions.json
│   └── settings.json
├── .husky/
│   └── pre-commit
├── app/
│   ├── app.vue
│   ├── assets/
│   │   └── css/
│   │       └── main.css
│   └── ...
├── .nvmrc
├── .npmrc
├── nuxt.config.ts
└── package.json
```

## References

@docs/1-project-setup.md
@nuxt.config.ts
@package.json
@.vscode/settings.json
@.vscode/extensions.json
@.husky/pre-commit
