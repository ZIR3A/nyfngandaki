---
trigger: always_on
---

# NYFN Gandaki Association Website
## Project Development Guidelines

Version: 1.0

---

# Project Overview

This project is the official website and content management system (CMS) for the **National Youth Federation Nepal (NYFN) - Gandaki Province Committee**.

The website serves as the official public portal for the organization and allows administrators to manage organizational information, committee members, districts, events, and general website settings.

The project must be developed as a **production-grade**, scalable, maintainable, secure, and localization-first application.

---

# Project Goals

The application should:

- Present the organization professionally.
- Allow the public to browse committee members.
- Display district committees.
- Showcase organizational events.
- Support English and Nepali from day one.
- Support Dark Mode.
- Be mobile-first.
- Be scalable for future provinces.
- Follow modern Next.js best practices.

---

# Primary Technology Stack

Framework

- Next.js (Latest Stable)
- App Router

Language

- JavaScript ONLY

Do NOT use TypeScript.

Database

- MongoDB
- Mongoose ODM

Authentication

- Auth.js (NextAuth)

Styling

- Tailwind CSS
- shadcn/ui

Storage

- Google Cloud Storage

Icons

- Lucide React

Animation

- Framer Motion

Validation

- Zod
- React Hook Form

Deployment

- Vercel
- MongoDB Atlas
- Google Cloud Storage

---

# Core Development Principles

This project must always follow these principles.

## 1. Production Ready

Never generate demo-quality code.

Every implementation should be production ready.

Avoid shortcuts.

Avoid mock implementations unless specifically requested.

---

## 2. Scalability

Always assume the application will grow.

Although the first release only supports Gandaki Province, the architecture must allow:

- Multiple Provinces
- National Committee
- Municipality Committees
- Ward Committees

without requiring major refactoring.

---

## 3. Reusability

Never duplicate components.

If a component can be reused, create a reusable component.

Examples

- Button
- Card
- Modal
- Section
- MemberCard
- EventCard
- PageHeader

---

## 4. Maintainability

Write code that another developer can understand.

Use descriptive names.

Avoid overly complex logic.

Keep files modular.

---

## 5. Consistency

Every module must follow the same architecture.

Naming

Folder structure

Error handling

API responses

Validation

Styling

must remain consistent.

---

# Localization First

Localization is NOT a feature.

Localization is a project architecture rule.

Every page must support localization from the very beginning.

Never build English first.

Never hardcode UI text.

---

## Supported Languages

English

Nepali

Future languages must be easy to add.

---

## Never Use

Do NOT use

- next-intl
- i18next
- react-intl

Build a custom localization system.

---

## Translation Rules

Every user-facing string must come from the localization helper.

Never do this

```javascript
<h1>About Us</h1>
```

Always

```javascript
<h1>{t("about.title")}</h1>
```

---

# Database Localization

Every user-visible field must support multiple languages.

Good

```javascript
title: {
    en: "",
    np: ""
}
```

Bad

```javascript
title: String
```

---

# UI Principles

The UI should feel

Professional

Clean

Modern

Minimal

Fast

Accessible

Avoid excessive animations.

Animations should support usability.

---

# Theme

The application's color palette should be derived from the official NYFN Gandaki logo.

Primary Colors

Primary Red

Primary Blue

White

Dark Navy

Light Gray

Support

- Light Mode
- Dark Mode
- System Mode

Never hardcode colors inside components.

Use semantic design tokens or CSS variables.

---

# Mobile First

Every page must be developed mobile-first.

Then

Tablet

Desktop

Large Desktop

---

# Accessibility

Always use semantic HTML.

Keyboard navigation must work.

Use proper labels.

Maintain sufficient color contrast.

Support screen readers.

---

# Component Rules

Build components that are:

Reusable

Composable

Configurable

Self-contained

Avoid page-specific components unless absolutely necessary.

---

# Project Structure

The application must follow a modular architecture.

Example

src/

app/

components/

features/

actions/

contexts/

providers/

hooks/

models/

services/

lib/

utils/

config/

constants/

localization/

middleware.js

---

# State Management

Prefer

React Context

Server Components

Server Actions

Avoid unnecessary global state.

Only introduce additional state management if justified.

---

# Forms

Every form must use

React Hook Form

Zod Validation

Server-side validation

Client-side validation

Error messages must be localized.

---

# API Guidelines

RESTful API design.

Consistent response structure.

Proper HTTP status codes.

Never expose sensitive data.

Always validate requests.

Always sanitize inputs.

---

# Error Handling

Every page should support

Loading

Empty

Error

Success

states.

Never leave users without feedback.

---

# Images

All uploaded media must use

Google Cloud Storage.

Do not store uploaded files inside the project.

Optimize images before rendering.

Use Next.js Image component whenever possible.

---

# Authentication

Only administrators can log in.

There is no public registration.

Roles

Super Admin

Admin

All admin routes must be protected.

---

# Database Guidelines

MongoDB

Mongoose

One model per file.

Avoid deeply nested documents unless appropriate.

Use indexes where necessary.

Design schemas for scalability.

---

# Performance

Optimize everything.

Use

Server Components

Lazy Loading

Dynamic Imports

Caching

Image Optimization

Avoid unnecessary client components.

---

# SEO

Every public page should support

Metadata

OpenGraph

Twitter Cards

Canonical URLs

Sitemap

Robots.txt

Structured Data

Localized metadata.

---

# Coding Standards

Use JavaScript only.

Use async/await.

Avoid callback nesting.

Prefer functional components.

Keep functions small.

Avoid large files.

Comment only where necessary.

Use descriptive variable names.

---

# Security

Validate all inputs.

Sanitize requests.

Hash passwords.

Protect admin routes.

Never expose secrets.

Store credentials only in environment variables.

---

# Git Workflow

Small commits.

Meaningful commit messages.

One feature per commit.

Never commit secrets.

Never commit .env files.

---

# Development Workflow

Every feature should follow:

1. Plan

2. Build

3. Test

4. Optimize

5. Review

6. Merge

Never skip testing.

---

# AI Development Rules

When generating code:

- Never use placeholder implementations unless explicitly requested.
- Never generate duplicate components.
- Always search the existing project before creating new files.
- Reuse utilities whenever possible.
- Keep imports organized.
- Follow the existing folder structure.
- Maintain consistent naming conventions.
- Do not introduce new libraries without justification.
- Do not refactor unrelated code while implementing a feature.
- Only implement the requested scope.

---

# Definition of Done

A task is considered complete only when:

- Feature works correctly.
- Responsive on mobile, tablet, and desktop.
- Localization implemented.
- Dark mode supported.
- Validation completed.
- Error handling implemented.
- Loading state implemented.
- Empty state implemented.
- Code reviewed.
- No console errors.
- No ESLint warnings.
- No duplicated code.
- Production ready.

---

# Final Principle

Quality is more important than speed.

The objective is to build a maintainable, scalable, production-ready system that can serve as the official digital platform for NYFN Gandaki today while being capable of supporting future organizational growth without architectural changes.