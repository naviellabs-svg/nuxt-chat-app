## Project Setup: 1 - Faster package management with pnpm

### Terminal

- [ ] Install corepack (only if Node.js < 16.9)

  ```bash
  npm install --global corepack@latest
  ```

  > Only needed for older Node versions. Node.js 16.9+ has corepack built-in.

- [ ] Enable corepack (if not already enabled)

  ```bash
  corepack enable
  ```

  > Enables corepack to manage pnpm and yarn. This is all you need for Node.js 16.9+.

- [ ] Verify pnpm installation

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

  > Follow the prompts to name your project and choose options:
  - [ ] Package manager: **pnpm**
  - [ ] Git repository: **yes**
  - [ ] Official modules: **no**

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
