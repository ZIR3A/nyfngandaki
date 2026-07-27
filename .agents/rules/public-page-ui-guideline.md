---
trigger: always_on
---

# NYFN Gandaki Association Website
# Public Website UI Guidelines

Version: 1.0

---

# Overview

This document defines the UI/UX standards for the public-facing website of the National Youth Federation Nepal (NYFN) – Gandaki Province.

The website should communicate professionalism, transparency, and trust while remaining modern, responsive, and accessible.

Every page must follow the same design language, spacing system, typography, and interaction patterns.

---

# Design Philosophy

The design should reflect:

- Professional
- Clean
- Government / Organization inspired
- Modern
- Friendly
- Trustworthy
- Minimal
- Fast

Avoid:

- Overly decorative designs
- Flashy gradients
- Heavy shadows
- Excessive animations
- Cluttered layouts

---

# Branding

The design must be inspired by the official NYFN logo.

Primary Identity Colors

- Primary Red
- Primary Blue
- White
- Dark Navy
- Neutral Gray

Accent colors should only be used sparingly.

---

# Theme

The application must support

- Light Mode
- Dark Mode
- System Mode

Theme preference should persist across visits.

All colors must be managed through semantic CSS variables.

Never hardcode colors inside components.

---

# Localization

Localization is mandatory.

Supported languages

- English
- Nepali

Every page must work correctly in both languages.

Every component must automatically update when language changes.

Language switching should never reload the entire application unnecessarily.

---

# Responsive Design

Always design Mobile First.

Breakpoints

Mobile

↓

Tablet

↓

Laptop

↓

Desktop

↓

Large Desktop

Every page must be responsive.

Never allow horizontal scrolling.

---

# Layout Width

Maximum content width

1200px–1400px

Centered

Consistent spacing

Large whitespace

---

# Spacing System

Use consistent spacing.

Example

XS

Small

Medium

Large

XL

2XL

Never use random spacing.

---

# Border Radius

Rounded but professional.

Cards

Buttons

Inputs

Dialogs

should use a consistent radius.

Avoid extreme rounding.

---

# Shadows

Very subtle.

Prefer borders over heavy shadows.

---

# Icons

Use

Lucide React

Only.

Icons should be consistent across the project.

---

# Buttons

Primary Button

- Filled
- Primary Red

Secondary Button

- Outline

Ghost Button

Text only

Danger Button

Used only in Admin.

Buttons must have

Hover

Focus

Disabled

Loading

states.

---

# Forms

Every form should contain

Title

Description

Proper Labels

Placeholder

Validation

Error Message

Help Text

Submit Button

Cancel Button

Validation messages must be localized.

---

# Cards

Cards should be reusable.

Standard card sections

Header

Content

Footer

Hover effects should be subtle.

---

# Empty States

Every listing page must support

Empty State

Examples

No Members Found

No Events Found

No Districts Found

Include illustration or icon.

Action button where applicable.

---

# Loading States

Never display blank pages.

Use

Skeleton Loaders

Loading Spinner

Progress Bar

where appropriate.

---

# Error States

Friendly error messages.

Localized.

Include retry button where applicable.

---

# Breadcrumb

Every secondary page should display

Home

↓

Current Section

↓

Current Page

---

# Search

Search must support

Members

Districts

Events

Search UI

Search Input

Search Icon

Clear Button

Loading Indicator

---

# Pagination

Standard pagination component.

Display

Previous

Next

Page Numbers

Responsive.

---

# Images

Use Next.js Image.

Lazy Load.

Proper alt text.

Responsive sizing.

Never stretch images.

---

# Animations

Animations should be subtle.

Recommended

Fade

Slide

Scale

Avoid

Bounce

Flash

Spinning UI

Long transitions

---

# Header

Sticky

Responsive

Transparent on Hero

Solid on scroll

Contains

Logo

Navigation

Language Switcher

Theme Toggle

Mobile Menu

---

# Navigation

Desktop

Horizontal Navigation

Mobile

Slide Drawer

Current page should always be highlighted.

---

# Footer

Contains

Organization Logo

Quick Links

Contact Information

Social Media

Copyright

Privacy

Designed consistently across all pages.

---

# Homepage

Purpose

Introduce NYFN Gandaki.

Sections

1. Hero Banner

Large banner

Organization title

Short introduction

Primary CTA

Secondary CTA

Background image

2. Organization Overview

Short description

Mission

Vision

Read More button

3. Statistics

Example

Province Committee

District Committees

Members

Events

Animated counters.

4. Provincial Leadership

Display top office bearers.

Photo

Name

Position

View All button.

5. District Overview

Grid of districts.

Each card

Image

District Name

Member Count

View Details

6. Featured Events

Latest events.

Image

Title

Date

Location

View Details

7. Call To Action

Become Connected

Contact Us

View Events

8. Footer

---

# About Page

Sections

Banner

Organization History

Vision

Mission

Objectives

Organization Structure

Constitution Download

Leadership Message (optional)

---

# Provincial Committee

Purpose

Display complete province committee.

Features

Search

Filter

Sorting

Member Cards

Card Design

Photo

Name

Position

District

Phone

Email

View Profile

---

# Member Profile

Banner

Photo

Full Name

Position

District

Biography

Phone

Email

Facebook

Other Social Links

Related Members

---

# District Listing

Display all Gandaki districts.

Card

Cover Image

District Name

Committee Count

Member Count

View Details

---

# District Details

Banner

District Information

Office Contact

Committee Members

Events conducted

Map (optional)

---

# Member Directory

Purpose

Search all members.

Features

Search

District Filter

Position Filter

Alphabetical Sorting

Grid/List View (optional)

Card

Photo

Name

Position

District

---

# Events Listing

Grid layout.

Card

Cover Image

Date

Title

Location

Short Description

View Details

Search

Filter by District

Filter by Year (future-ready)

---

# Event Details

Hero Banner

Title

Date

Venue

Organizer

Description

Image Gallery

Related Events

Back Button

---

# Contact Page

Banner

Office Information

Address

Phone

Email

Google Map

Contact Form

Social Links

Office Hours (optional)

---

# Search Results

Display

Members

Districts

Events

Grouped by category.

Show total result count.

Highlight matching text.

---

# 404 Page

Friendly illustration.

Localized message.

Return Home button.

---

# 500 Error Page

Friendly message.

Retry button.

Return Home.

---

# SEO

Every public page must include

Localized Page Title

Localized Description

Open Graph

Twitter Card

Canonical URL

Structured Data

---

# Accessibility

Every page must

Use semantic HTML

Support keyboard navigation

Support screen readers

Have proper heading hierarchy

Use sufficient color contrast

Support focus indicators

---

# Performance

Use Server Components where possible.

Optimize all images.

Lazy load non-critical content.

Use streaming where beneficial.

Avoid unnecessary client-side JavaScript.

---

# UI Consistency Checklist

Every page must include:

✓ Responsive Layout

✓ Localization

✓ Dark Mode

✓ Breadcrumb (where applicable)

✓ Loading State

✓ Empty State

✓ Error State

✓ SEO Metadata

✓ Proper Accessibility

✓ Optimized Images

✓ Consistent Typography

✓ Consistent Spacing

✓ Reusable Components

✓ Mobile Navigation

✓ Theme Support

---

# Final Design Principle

The public website should represent the professionalism and credibility of NYFN Gandaki. Every page should feel consistent, easy to navigate, visually balanced, and accessible in both English and Nepali. The experience should prioritize clarity over decoration, ensuring visitors can quickly find information about the organization, its members, districts, and activities while maintaining a modern, trustworthy appearance.