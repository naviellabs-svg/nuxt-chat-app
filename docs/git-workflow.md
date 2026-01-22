# Git Workflow Guide

## Simple Workflow (Use this every time)

### Quick Copy-Paste Commands

```bash
git add -A
git checkout -b "project-setup-4"
git commit -m "project-setup-4"
git push origin project-setup-4
```

That's it! Just replace `project-setup-4` with your step name.

### Why This Works

- **`git add -A`** - Stages all your changes (new files, modified files, deleted files)
- **`git checkout -b "branch-name"`** - Creates a new branch and switches to it (your changes come with you)
- **`git commit -m "message"`** - Saves your changes with a message
- **`git push origin branch-name`** - Uploads your branch to GitHub

### Branch Naming

Use the step/lesson number format: `project-setup-4`, `lesson-2-5`, etc.

**Examples:**
- `project-setup-4` - For project setup step 4
- `lesson-1-12` - For lesson 1, step 12
- `lesson-2-5` - For lesson 2, step 5

### Commit Message

Always use the branch name as your commit message.

**Example:** If branch is `project-setup-4`, commit message is `"project-setup-4"`

### Step-by-Step (If you want details)

- [ ] Stage all changes

  ```bash
  git add -A
  ```

  > This tells git "I want to save these changes"

- [ ] Create new branch (use step number)

  ```bash
  git checkout -b "project-setup-4"
  ```

  > Creates a new branch and switches to it. Your staged changes come with you.

- [ ] Commit your changes

  ```bash
  git commit -m "project-setup-4"
  ```

  > Saves your changes. Use the same name as your branch.

- [ ] Push to GitHub

  ```bash
  git push origin project-setup-4
  ```

  > Uploads your branch to GitHub so you can see it online.

## Learn More About Git

**Best Resources:**
- [Git Official Docs](https://git-scm.com/doc) - Official documentation
- [GitHub's Git Handbook](https://guides.github.com/introduction/git-handbook/) - Beginner-friendly guide
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials) - Step-by-step tutorials
- [Learn Git Branching](https://learngitbranching.js.org/) - Interactive visual tutorial (highly recommended!)

**Quick Reference:**
- `git status` - See what files have changed
- `git branch` - See what branch you're on
- `git log` - See your commit history

## Add New Git Command

To add a new git command to this workflow, say:

**`"add git command: [description]"`**

Example: `"add git command: show recent commits"`
