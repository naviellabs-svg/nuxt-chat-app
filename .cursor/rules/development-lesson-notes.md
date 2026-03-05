---
description: "Lesson notes workflow: add lesson/step at start; when done AI writes notes, commit message, and updates rules"
globs: ["docs/**", ".cursor/docs/**"]
alwaysApply: false
---

# Lesson Notes Workflow

## Overview

**At lesson start:** You add the step and lesson name (in `docs/current-lesson.md` or `.cursor/docs/current-lesson.md`, or in chat).

**When you're done:** Say **"write notes, commit message, update rules"**. The AI will:
1. **Write notes** – Scan the code and write/update the lesson doc so it matches what's implemented.
2. **Suggest a commit message** – Based on the lesson/step name (e.g. `basic-chat-app-step-8`).
3. **Update rules** – Extract patterns from the lesson doc and update `.cursor/rules/`.

## When to Use

- After completing a lesson (or a step within a lesson)
- When you want the lesson doc to match the current code
- When you want one prompt to get notes + commit message + rules updated

## How It Works

1. **You start a lesson** – Add the **lesson name** and **step** to `docs/current-lesson.md` (or `.cursor/docs/current-lesson.md` if that's where your lesson files live), or tell the AI in chat.
2. **You complete the lesson** – Implement the steps; code reflects the outcome.
3. **You say** – **"Write notes, commit message, update rules"** (or **"I'm done – write notes, commit message, update rules"**).
4. **AI reads** – `docs/current-lesson.md` (or `.cursor/docs/current-lesson.md`) to get lesson and step.
5. **AI writes notes** – Scans the codebase and updates the lesson doc so it matches the code.
6. **AI suggests commit message** – e.g. `basic-chat-app-step-8` or `lesson-2-step-8`.
7. **AI updates rules** – Extracts patterns from the lesson doc and updates `.cursor/rules/`.

## Example: At Start of Lesson

Add to `docs/current-lesson.md` or `.cursor/docs/current-lesson.md`:

```markdown
**Lesson:** 2-Basic-Chat-App
**Step:** Step 8 - Create a Basic API with Server Routes
```

Or in chat: "Starting 2-Basic-Chat-App, Step 8."

## Example: When Done

- "Write notes, commit message, update rules."
- "I'm done – write notes, commit message, update rules."

## Lesson Doc Format

When writing or updating lesson notes, follow the existing format:

- Use clear step headings: `## Step N - Title`
- Use `###` for file paths or sections (e.g. `### app/pages/chat.vue`)
- Use checkboxes `- [ ]` for actionable tasks
- Include code blocks with language tags (`bash`, `vue`, `ts`, `json`, etc.)
- Add explanations in `>` blockquotes after code blocks
- Keep formatting consistent with other lessons in `docs/`

## What the AI Should Do

- Read the current lesson from `docs/current-lesson.md` or `.cursor/docs/current-lesson.md` to get lesson name and step.
- Read the lesson file (e.g. `docs/2-Basic-Chat-App.md` or `.cursor/docs/2-Basic-Chat-App.md`) to know structure and which step(s) to document.
- Read the relevant source files that were changed or created for that lesson/step.
- Write or update the lesson content so that:
  - Steps and file paths match what exists in the repo.
  - Code blocks match the actual code (or a representative snippet).
  - Explanations describe what the code does and why.
- Preserve any existing content that is still accurate; only add or update what changed.

## Benefits

- **Faster** – No need to manually copy code and write descriptions.
- **Accurate** – Notes stay in sync with the code.
- **Consistent** – Same structure and style across lessons.
- **Easy** – One prompt after each lesson to keep docs up to date.

## Commit Message

When you say "write notes, commit message, update rules", the AI suggests a commit message from the current lesson/step, e.g.:

- `basic-chat-app-step-8`
- `lesson-2-step-8`
- `project-setup-4`

Use it with the usual workflow: `git add -A`, `git checkout -b "branch-name"`, `git commit -m "commit-message"`, `git push origin branch-name`.

## Relation to "Update Rules"

- **"Write notes, commit message, update rules"** – One request: notes from code, commit message, then update rules.
- **"Update rules"** alone – AI only extracts patterns from lesson docs and updates `.cursor/rules/`.
