---
description: "Development tools: pnpm, NVM, VS Code extensions, ESLint, Husky configuration"
alwaysApply: false
---

# Development Tooling

## Package Management (pnpm)

- Use pnpm for all package operations
- Enable corepack: `corepack enable` (Node.js 16.9+)
- Create `.npmrc` with `shamefully-hoist=true` for compatibility
- Use `pnpm add` for dependencies
- Use `pnpm add --save-dev` for dev dependencies

## Node Version Management (NVM)

- Install NVM for managing Node versions
- Create `.nvmrc` file: `node -v > .nvmrc`
- Use `nvm use` to switch to project version
- Ensures consistent Node version across team

## VS Code Extensions

Recommended extensions in `.vscode/extensions.json`:
- `esbenp.prettier-vscode` - Code formatting
- `Vue.volar` - Vue 3 support
- `bradlc.vscode-tailwindcss` - Tailwind IntelliSense
- `dbaeumer.vscode-eslint` - ESLint integration

## VS Code Settings

Configure `.vscode/settings.json`:
- `editor.formatOnSave: true`
- `editor.defaultFormatter: "esbenp.prettier-vscode"`
- `files.associations: { "*.css": "tailwindcss" }`
- `editor.quickSuggestions: { "strings": "on" }`

## ESLint

- Add via: `pnpm dlx nuxi module add eslint`
- Add scripts to `package.json`:
  - `"lint": "eslint ."`
  - `"lint:fix": "eslint --fix ."`
- Run: `pnpm lint` or `pnpm lint:fix`

## Husky Pre-commit Hooks

- Install: `pnpm add --save-dev husky`
- Initialize: `pnpm exec husky init`
- Configure `.husky/pre-commit`:
  ```bash
  pnpm lint
  ```
- Automatically runs linting before commits

## File Structure

```
.vscode/
├── extensions.json
└── settings.json
.husky/
└── pre-commit
.nvmrc
.npmrc
package.json
```

## Commands

```bash
# Package management
pnpm add package-name
pnpm add --save-dev package-name

# Linting
pnpm lint
pnpm lint:fix

# Node version
nvm use
```

## References

@.vscode/extensions.json
@.vscode/settings.json
@.husky/pre-commit
@.nvmrc
@.npmrc
@package.json
@docs/1-project-setup.md
