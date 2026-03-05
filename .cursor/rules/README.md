# Dynamic Cursor Rules - How This Works

## Overview

This project uses **dynamic Cursor rules** that automatically extract patterns from completed lessons and organize them into reusable rule files. Rules grow and update as you complete lessons.

## The Workflow

1. **You create lessons** in `docs/` or `.cursor/docs/` (e.g., `2-Basic-Chat-App.md`).
2. **When you start a lesson** – Add the **lesson name** and **step** to `docs/current-lesson.md` or `.cursor/docs/current-lesson.md` (or say it in chat).
3. **You complete the lesson** – Follow the steps; code reflects the outcome.
4. **When you're done** – Say **"Write notes, commit message, update rules"**. The AI will:
   - **Write notes** – Scan the code and update the lesson doc to match what's implemented.
   - **Suggest a commit message** – From the lesson/step (e.g. `basic-chat-app-step-8`).
   - **Update rules** – Extract patterns from the lesson doc and update `.cursor/rules/`.
5. **Rules are ready** for use in future chats and projects.

## Rule Organization

Rules are organized by category using descriptive prefixes:

- **project-setup-** = Foundational project setup guides
- **frontend-** = Frontend patterns (components, styling, frameworks)
- **backend-** = Backend patterns (API routes, databases, services)
- **architecture-** = Architecture patterns (structure, separation of concerns)
- **development-** = Development tools, workflows, and lesson notes
- **deployment-** = Deployment patterns
- **testing-** = Testing patterns
- **domain-** = Domain-specific patterns

## Sharing Rules (Optional)

Rules are **dynamic and flexible** - you can:

- **Keep local**: Rules stay in `.cursor/rules/` for this project only
- **Push to GitHub**: Commit rules to share with other projects via GitHub Import
- **Reference**: Create a meta-rule that documents where rules come from
- **Copy**: Manually copy rules folder to new projects

**You decide later** whether to push to GitHub or just reference locally.

## Using Rules in New Projects

When starting a new project:

1. **GitHub Import** (if rules are on GitHub):
   - Cursor Settings → Rules → Add Rule → Remote Rule (GitHub)
   - Paste repository URL
   - Rules sync automatically

2. **Copy Rules**:
   - Copy `.cursor/rules/` folder to new project
   - Customize as needed

3. **Reference Rule**:
   - Create a meta-rule documenting where rules come from
   - Import specific rules as needed

## Benefits

- ✅ **Automatic**: Rules update as you learn
- ✅ **Organized**: Clear categorization makes rules easy to find
- ✅ **Reusable**: Use in new projects via GitHub Import or copy
- ✅ **Version-controlled**: Rules tracked in git
- ✅ **Team-friendly**: Share with collaborators easily
- ✅ **Flexible**: Decide later how to share (GitHub, copy, or reference)

## Rule Files

- `project-setup-nuxt.md` - Complete Nuxt project setup guide
- `frontend-nuxt-patterns.md` - Nuxt routing, layouts, pages
- `frontend-vue-components.md` - Vue component patterns
- `frontend-composables.md` - Composables patterns
- `frontend-ui-styling.md` - UI and styling patterns
- `backend-api-routes.md` - Server API route patterns
- `architecture-separation-of-concerns.md` - Architecture principles
- `development-tooling.md` - Development tools (pnpm, ESLint, Husky)
- `development-git-workflow.md` - Git workflow patterns
- `development-lesson-notes.md` - Lesson notes: scan code and write/update docs
- `domain-chat-app.md` - Chat app specific patterns
