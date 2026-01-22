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

- [ ] Stage all files

  ```bash
  git add .
  ```

- [ ] Check git status

  ```bash
  git status
  ```

- [ ] Make initial commit

  ```bash
  git commit -m "initial commit"
  ```

### GitHub

- [ ] Create new repository on GitHub
  - Go to [github.com/new](https://github.com/new)
  - Name your repository (e.g., `my-nuxt-app`)
  - Do not initialize with README, .gitignore, or license (project already has these)

- [ ] Connect local repository to GitHub

  ```bash
  git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
  git branch -M main
  git push -u origin main
  ```

  > Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

## Project Setup: 4 - Keep your Node version consistent with NVM

### Terminal

- [ ] Install NVM (Node Version Manager)

  Visit [NVM Installation Guide](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) and run the install command:

  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
  ```

  > Installs NVM to manage multiple Node.js versions on your system.

- [ ] Verify NVM installation

  Close and reopen your terminal, then run:

  ```bash
  command -v nvm
  ```

  > Should output `nvm` if installation was successful. If not, restart your terminal or check the installation.

- [ ] Install latest LTS Node.js version

  ```bash
  nvm install --lts
  ```

  > Installs the latest stable Long Term Support version of Node.js.

- [ ] Create `.nvmrc` file for project

  ```bash
  node -v > .nvmrc
  ```

  > Creates a file that specifies which Node.js version this project should use.

- [ ] Verify `.nvmrc` file

  ```bash
  cat .nvmrc
  ```

  > Displays the Node.js version that will be used for this project.

- [ ] Create `.npmrc` file for pnpm compatibility

  ```bash
  echo "shamefully-hoist=true" > .npmrc
  ```

  > Creates `.npmrc` file with pnpm configuration to ensure proper dependency hoisting.

## Project Setup: 5 - Setup the Ideal Nuxt Development Experience with VS Code Extensions

### Terminal

- [ ] Create `.vscode` directory

  ```bash
  mkdir -p .vscode
  ```

  > Creates the directory for VS Code workspace settings.

- [ ] Create `extensions.json` file

  ```bash
  cat > .vscode/extensions.json << 'EOF'
  {
    "recommendations": [
      "esbenp.prettier-vscode",
      "Vue.volar",
      "prisma.prisma",
      "bradlc.vscode-tailwindcss",
      "dbaeumer.vscode-eslint"
    ],
    "unwantedRecommendations": [
      "octref.vetur"
    ]
  }
  EOF
  ```

  > Creates VS Code extensions recommendations file. VS Code will suggest these extensions when you open the project.

- [ ] Create `settings.json` file

  ```bash
  cat > .vscode/settings.json << 'EOF'
  {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[vue]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
  }
  EOF
  ```

  > Configures VS Code to format files on save using Prettier, with Vue-specific formatting support.

## Project Setup: 6 - Quickly build beautiful UIs with Nuxt UI

### Terminal

- [ ] Install Nuxt UI

  ```bash
  pnpm add @nuxt/ui@latest
  ```

  > Installs the latest version of Nuxt UI, which includes Tailwind CSS and beautiful components.

### nuxt.config.ts

- [ ] Add Nuxt UI module

  ```typescript
  // https://nuxt.com/docs/api/configuration/nuxt-config
  export default defineNuxtConfig({
    compatibilityDate: '2025-01-20',
    devtools: { enabled: true },

    modules: ['@nuxt/ui']
  })
  ```

  > Adds the Nuxt UI module to your Nuxt configuration.

### app/assets/css/main.css

- [ ] Create CSS file

  ```bash
  mkdir -p app/assets/css
  ```

- [ ] Add Nuxt UI import

  ```bash
  cat > app/assets/css/main.css << 'EOF'
  @import "@nuxt/ui";
  EOF
  ```

  > Creates the main CSS file and imports Nuxt UI styles. Nuxt UI handles Tailwind CSS internally.

### nuxt.config.ts

- [ ] Add CSS configuration

  ```typescript
  export default defineNuxtConfig({
    compatibilityDate: '2025-01-20',
    devtools: { enabled: true },

    css: ['~/assets/css/main.css'],

    modules: ['@nuxt/ui']
  })
  ```

  > Tells Nuxt to load the main CSS file.

### .vscode/settings.json

- [ ] Update settings for Tailwind CSS support

  Update `.vscode/settings.json` to include:

  ```json
  {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[vue]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "files.associations": {
      "*.css": "tailwindcss"
    },
    "editor.quickSuggestions": {
      "strings": "on"
    }
  }
  ```

  > Adds Tailwind CSS IntelliSense support in VS Code. Merge these settings with your existing settings.json file.

### app/app.vue

- [ ] Wrap app in UApp component

  ```bash
  cat > app/app.vue << 'EOF'
  <template>
    <UApp>
      <NuxtRouteAnnouncer />
      <UButton>Click me!</UButton>
    </UApp>
  </template>
  EOF
  ```

  > Wraps your app with UApp component and adds a sample UButton to test Nuxt UI.

## Project Setup: 7 - Enforce consistent code style with ESLint

### Terminal

- [ ] Add ESLint module

  ```bash
  pnpm dlx nuxi module add eslint
  ```

  > Installs and configures ESLint for your Nuxt project to enforce consistent code style.

### package.json

- [ ] Add lint scripts

  Update your `package.json` scripts section to include:

  ```json
  {
    "scripts": {
      "build": "nuxt build",
      "dev": "nuxt dev",
      "generate": "nuxt generate",
      "preview": "nuxt preview",
      "postinstall": "nuxt prepare",
      "lint": "eslint .",
      "lint:fix": "eslint --fix ."
    }
  }
  ```

  > Adds lint commands to check and automatically fix code style issues.

## Project setup - 8 - Run linting automatically with Husky

### Terminal 
- [ ] pnpm add --save-dev husky
- [ ]initialise husky `pnpm exec husky init`

### husky/pre-commit
- [ ] chgange to `pnpm lint`