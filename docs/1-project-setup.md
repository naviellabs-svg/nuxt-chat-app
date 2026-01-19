## Project Setup: 1 - Faster package management with pnpm

### Terminal

- [ ] Install corepack (only if Node.js < 16.9)

  ```bash
  npm install --global corepack@latest
  ```

  > Only needed for older Node versions. Node.js 16.9+ has corepack built-in.

- [ ] If corepack already installed, just enable it

  ```bash
  corepack enable
  ```

  > Enables corepack to manage pnpm and yarn. This is all you need for Node.js 16.9+.

- [ ] Check where pnpm is installed
  ```bash
  which pnpm
  ```
  > Verifies pnpm location. Should show path like `/usr/local/bin/pnpm`

## Project Setup: 2 - Create a Nuxt 4 Project

### Terminal

- [ ] Navigate to your projects directory

  ```bash
  cd ~/dev
  ```

  > Change to your projects folder. Replace `~/dev` with your actual path (e.g., `~/Documents/projects` or `~/Desktop`)

- [ ] Create Nuxt project

  ```bash
  pnpm create nuxt
  ```

  > Follow the prompts to name your project and choose options
  - [ ] pnpm
  - [ ] git reposiitery yes
  - [ ] official moidules no

## Project Setup: 3 - Create a GitHub Project

### Terminal
  - [ ] make first commit 'git add .'
