# Git Workflow Guide

## Standard Workflow (Use this every time)

### Quick Copy-Paste Commands

```bash
git checkout main
git pull origin main
git checkout -b "project-setup-4"
git add -A
git commit -m "project-setup-4"
git push -u origin project-setup-4
```

### Branch Naming

Use the step/lesson number format: `project-setup-4`, `lesson-2-5`, etc.

**Examples:**
- `project-setup-4` - For project setup step 4
- `lesson-1-12` - For lesson 1, step 12
- `lesson-2-5` - For lesson 2, step 5

### Commit Message

Always use the branch name as your commit message (the last step/lesson you completed).

**Example:** If branch is `project-setup-4`, commit message is `"project-setup-4"`

### Step-by-Step Instructions

- [ ] Start from main and pull latest

  ```bash
  git checkout main
  git pull origin main
  ```

- [ ] Create new branch (use step number)

  ```bash
  git checkout -b "project-setup-4"
  ```

  > Replace `project-setup-4` with your step name (e.g., `lesson-1-12`, `project-setup-4`)

- [ ] Stage all changes

  ```bash
  git add -A
  ```

- [ ] Commit (use branch name as message)

  ```bash
  git commit -m "project-setup-4"
  ```

  > Use the same name as your branch for the commit message

- [ ] Push to remote

  ```bash
  git push -u origin project-setup-4
  ```

  > Replace `project-setup-4` with your branch name. The `-u` flag sets upstream tracking.

## Add New Git Command

To add a new git command to this workflow, say:

**`"add git command: [description]"`**

Example: `"add git command: show recent commits"`
