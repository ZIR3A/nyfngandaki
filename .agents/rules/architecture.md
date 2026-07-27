---
trigger: always_on
---

# NYFN Gandaki Association Website
# Application Architecture

Version: 1.0

---

# Overview

This project follows a **Feature-Based Modular Architecture** built on top of the **Next.js App Router**.

The architecture prioritizes:

- Scalability
- Maintainability
- Separation of Concerns
- Reusability
- Localization
- Performance

Every feature should be self-contained while still sharing common reusable components and utilities.

---

# Architectural Principles

The project follows these principles.

## Single Responsibility Principle

Each module should have one responsibility.

Examples

✓ Members Module

✓ Events Module

✓ District Module

Avoid modules that handle unrelated responsibilities.

---

## Feature First

Organize code by features instead of file types.

Good

```
features/
    members/
    districts/
    events/
```

Bad

```
components/

pages/

helpers/

services/

utils/

```

where business logic becomes scattered.

---

## Separation of Concerns

Business logic

↓

API

↓

Database

↓

UI

should always remain separated.

Never place database logic inside UI components.

Never place UI logic inside database models.

---

## Reusability

Shared components belong inside

```
components/
```

Business-specific components belong inside

```
features/
```

Example

```
components/ui/Button

components/ui/Dialog

components/layout/Header

components/layout/Footer

features/members/MemberCard

features/events/EventCard
```

---

# Architecture Layers

```
Presentation Layer

↓

Application Layer

↓

Business Layer

↓

Data Layer

↓

Infrastructure Layer
```

---

# Presentation Layer

Responsible for rendering UI.

Contains

- Pages
- Layouts
- Components
- Forms
- Dialogs

Never communicate directly with MongoDB.

Always use services/actions.

---

# Application Layer

Responsible for

- Server Actions
- API Routes
- Validation
- Authorization
- Business orchestration

Example

```
Create Member

↓

Validate

↓

Upload Image

↓

Create Database Record

↓

Return Response
```

---

# Business Layer

Contains project business rules.

Example

Members

District Assignment

Display Order

Event Visibility

Localization

Permissions

No UI should exist here.

---

# Data Layer

Responsible for

MongoDB

Mongoose

Schemas

Indexes

Queries

Repositories

---

# Infrastructure Layer

Responsible for

Google Cloud Storage

Authentication

Environment Variables

External APIs

Logging

Email

Future Notifications

---

# Folder Structure

```
src/

│

├── app/

├── components/

│   ├── ui/

│   ├── layout/

│   ├── shared/

│

├── features/

│   ├── members/

│   ├── districts/

│   ├── events/

│   ├── settings/

│   └── authentication/

│

├── actions/

├── services/

├── models/

├── lib/

├── hooks/

├── contexts/

├── providers/

├── localization/

├── middleware/

├── utils/

├── constants/

├── config/

└── validations/
```

---

# Feature Structure

Every feature should follow the same structure.

Example

```
features/

members/

│

├── components/

├── actions/

├── services/

├── validations/

├── hooks/

├── utils/

└── constants/
```

Every feature should remain isolated.

---

# App Router Structure

```
app/

(layout)

(page)

loading.js

error.js

not-found.js
```

Example

```
app/

[locale]/

layout.js

page.js

about/

members/

districts/

events/

contact/

admin/

login/
```

---

# Public Routes

```
/

/about

/members

/member/[id]

/districts

/districts/[slug]

/events

/events/[slug]

/contact
```

Localization should support:

```
/en/...

/np/...
```

---

# Protected Routes

```
/admin

/admin/dashboard

/admin/members

/admin/districts

/admin/events

/admin/settings

/admin/profile
```

Authentication required.

---

# Components

There are three types of components.

## UI Components

Pure reusable components.

Examples

Button

Input

Select

Dialog

Card

Table

Pagination

Badge

Alert

Avatar

---

## Shared Components

Reusable across features.

Examples

Header

Footer

Breadcrumb

Theme Toggle

Language Switcher

Search

Section

Container

Page Header

---

## Feature Components

Business specific.

Examples

MemberCard

MemberProfile

DistrictCard

EventCard

EventGallery

These should never be reused by unrelated features unless appropriate.

---

# Business Logic

Business logic should never exist inside components.

Bad

```
MemberCard.jsx

↓

Database Query

↓

Permission Check
```

Good

```
Service

↓

Action

↓

Component
```

---

# Database Models

Each model must live in its own file.

```
models/

User.js

Member.js

District.js

Event.js

SiteSetting.js
```

Never place multiple models inside one file.

---

# Services

Services communicate with MongoDB.

Examples

```
MemberService

DistrictService

EventService
```

They should contain

Create

Update

Delete

Search

Filtering

Pagination

Business queries

---

# Server Actions

Server Actions orchestrate operations.

Example

```
Create Member

↓

Validate

↓

Upload Image

↓

Create Member

↓

Revalidate Cache

↓

Return Response
```

---

# Validation

Every feature owns its validation.

Example

```
validations/

member.validation.js

district.validation.js

event.validation.js
```

Never validate inside components.

---

# Localization

Localization is part of the architecture.

Every page

Every API

Every component

Every model

must support

English

Nepali

No exceptions.

Never hardcode user-facing strings.

---

# Theme Architecture

Use semantic design tokens.

Never hardcode colors.

Example

Good

```
bg-primary

text-primary

border-primary
```

Bad

```
bg-red-600

text-blue-900
```

Colors come from CSS variables.

---

# State Management

Prefer

Server Components

↓

Server Actions

↓

React Context

↓

Local Component State

Avoid unnecessary global state.

Do not introduce Redux or Zustand unless justified by future complexity.

---

# Error Handling

Every page supports

Loading

Empty

Error

Not Found

Success

states.

Every API returns consistent responses.

---

# API Response Format

Success

```
{
    success:true,
    data:{},
    message:"..."
}
```

Failure

```
{
    success:false,
    message:"...",
    errors:[]
}
```

Keep the structure consistent.

---

# File Upload Flow

```
Admin

↓

Validation

↓

Google Cloud Storage

↓

Receive URL

↓

Save URL in MongoDB

↓

Return Response
```

Never store uploaded files inside the application.

---

# Rendering Strategy

Prefer

Server Components

Use Client Components only when necessary.

Examples

Need Client

Theme Toggle

Forms

Search

Language Switcher

Dialogs

Examples

Use Server

About

Members

Districts

Events

Homepage

SEO Pages

---

# Performance Strategy

Use

Server Rendering

Dynamic Imports

Image Optimization

Lazy Loading

Caching

Streaming where appropriate

Avoid unnecessary hydration.

---

# Security

Protect all admin routes.

Validate every request.

Sanitize user input.

Hash passwords.

Never expose environment variables.

Never trust client-side validation.

---

# Scalability

The architecture should support future modules without refactoring.

Examples

Future Modules

- News
- Gallery
- Documents
- Downloads
- Notices
- Volunteers
- Membership Requests
- Donation System
- Multi Province Support
- Municipality Committees
- Ward Committees

Every new module should integrate into the existing architecture without changing existing modules.

---

# Final Rule

Every architectural decision should prioritize:

1. Simplicity
2. Maintainability
3. Scalability
4. Performance
5. Security
6. Reusability

Never sacrifice long-term architecture for short-term convenience.