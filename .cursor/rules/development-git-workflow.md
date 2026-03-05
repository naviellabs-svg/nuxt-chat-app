---
description: "Git workflow patterns: branch naming, commit messages, and workflow commands"
alwaysApply: false
---

# Git Workflow

## Simple Workflow

Use this workflow for every lesson/step:

```bash
git add -A
git checkout -b "project-setup-4"
git commit -m "project-setup-4"
git push origin project-setup-4
```

## Branch Naming

Use step/lesson number format:
- `project-setup-4` - For project setup step 4
- `lesson-2-5` - For lesson 2, step 5
- `basic-chat-app-step-8` - For descriptive step names

## Commit Messages

- Always use the branch name as your commit message
- Example: If branch is `project-setup-4`, commit message is `"project-setup-4"`

## Step-by-Step

1. **Stage all changes**: `git add -A`
2. **Create new branch**: `git checkout -b "branch-name"`
3. **Commit**: `git commit -m "branch-name"`
4. **Push**: `git push origin branch-name`

## Why This Works

- `git add -A` - Stages all changes (new files, modified files, deleted files)
- `git checkout -b "branch-name"` - Creates new branch and switches to it
- `git commit -m "message"` - Saves changes with message
- `git push origin branch-name` - Uploads branch to GitHub

## Quick Reference

- `git status` - See what files have changed
- `git branch` - See what branch you're on
- `git log` - See commit history

## References

@docs/git-workflow.md
