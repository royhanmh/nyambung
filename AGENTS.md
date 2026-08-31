# Nyambung AI Agent Rules

This project is a mobile-first conversation game. Build from the brief and brand rules first. Treat all visual inspiration as secondary.

## Core rules

- Always use Impeccable thinking for taste, spacing, hierarchy, and restraint.
- Always apply antislop from `agent/skills/antislop/SKILL.md` and the relevant skill files in `agent/skills/`.
- Keep the tone caveman: short, direct, blunt, no fluff, no fake polish.
- Keep output practical. No generic AI filler. No decorative junk.
- Use Bahasa Indonesia by default unless the user clearly asks for English.
- Reduce emoji use heavily. No decorative emoji in UI, copy, or labels unless the user explicitly asks for it.
- Keep everything mobile-first and warm, not sterile, not luxury-tech fake-clean.

## Source of truth

- `prd.md` is the product source.
- `brand-guide/BRAND-GUIDELINES.md` is the styling source.
- `inspo.txt` is inspiration only. It should guide mood, not copy exact layouts, literal copy, or implementation details.
- If there is conflict, product brief and brand guide win. Inspiration loses.

## Context7 rule

Before writing code that uses a library, framework, API, or tool, resolve the package or API with Context7 and fetch the current docs relevant to the task.

This includes React, router libraries, state tools, style tools, analytics, and any external API usage.

## Design expectations

- Favor warm cream, soft neutrals, soft cards, and calm contrast.
- Keep UI simple and readable on phone-sized screens.
- Use natural conversation flow, not template SaaS patterns.
- Reuse the brand system instead of inventing new visual language.
- Keep the app feeling personal, honest, and human.
- Make the app minimalistic: less noise, fewer elements, more white space, calmer hierarchy.
- Remove extra decoration, heavy gradients, dense blocks, and unnecessary visual chrome.
- Prioritize clarity over visual excitement. If a UI element does not help an action or feeling, remove it.

## Task execution rule

- Work in small, reviewable steps. Each task must be split into granular units with clear scope.
- Do not batch unrelated changes into one task.
- Each unit should be limited to one intent, one file group, or one UI section.
- Before starting a unit, state the exact task in plain language and wait for approval.
- The task must be written as a single granule: one scope, one outcome, one file group, one approval gate.
- After each unit, summarize the result and ask whether to continue to the next unit.
- If the user does not approve, stop. Do not continue.
- Never skip ahead to the next granule without explicit approval.

## Approval gate

- No code changes, no file edits, no refactors, and no UI changes without explicit user approval.
- No commit is allowed without user approval.
- Any task that touches git, staging, or commit must be explicitly approved by the user first.
- Never assume approval from silence or from previous tasks.

## Git rule

- Do not run git add, git commit, or git push without direct approval.
- If a commit is needed, first propose the exact commit message and scope, then wait for confirmation.
- Keep commit scope tight and task-specific.

## antislop pointer

<!-- antislop:start -->

## antislop

For UI, copy, people, mobile layout, or code comments work, read `agent/skills/antislop/SKILL.md` and then the skill for the task:

- UI / visual: `agent/skills/antislop-ui/SKILL.md`
- Copy & text: `agent/skills/antislop-copywriting/SKILL.md`
- People: `agent/skills/antislop-human/SKILL.md`
- Mobile / responsive: `agent/skills/antislop-layoutmobile/SKILL.md`
- Code comments: `agent/skills/antislop-code/SKILL.md`
Before starting, ask the user when antislop applies: during the work, or after it is done.
<!-- antislop:end -->
