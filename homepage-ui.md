# PHASE 04 — Public Homepage
# PART 01 — Overall Layout, Header & Hero

---

# Objective

Build the official homepage for the National Youth Federation Nepal (NYFN) Gandaki Province Association.

The homepage must represent the organization with a modern, trustworthy, and institutional appearance while remaining simple, fast, and accessible.

This is NOT a commercial website.

It is the official public-facing digital platform of NYFN Gandaki Province.

The homepage should communicate

- Professionalism
- Transparency
- Leadership
- Youth Empowerment
- Organization
- Community Service

Everything should feel premium while avoiding unnecessary visual complexity.

---

# Development Rules

Follow every project guideline.

Requirements

✓ JavaScript ONLY

✓ Next.js App Router

✓ Tailwind CSS

✓ shadcn/ui

✓ Framer Motion

✓ Server Components by default

✓ Client Components only when required

✓ Responsive

✓ Localization First

✓ Dark Mode

✓ Accessibility

✓ SEO Friendly

✓ Future CMS Ready

Never

❌ Hardcode text

❌ Hardcode images

❌ Hardcode colors

❌ Duplicate Components

❌ Use mock architecture

Every section must later receive dynamic data from CMS.

---

# Homepage Structure

The homepage should follow this exact order.

```

Top Information Bar

↓

Main Header

↓

Hero Banner

↓

Organization Overview

↓

Chairperson Message

↓

Core Values

↓

Statistics

↓

Provincial Leadership

↓

District Overview

↓

Featured Events

↓

Call To Action

↓

Footer

```

Each section should have generous whitespace.

Never make sections feel crowded.

---

# Visual Identity

The design should immediately communicate

Government Website

+

Modern Political Organization

+

Youth Organization

Use clean typography.

Avoid startup UI.

Avoid colorful gradients.

Avoid oversized shadows.

Avoid glassmorphism.

Use flat elegant surfaces.

---

# Brand Color Rules

Primary

Official NYFN Flag Blue

Secondary

Official NYFN Flag Red

Background

Soft White

Dark Mode

Deep Navy

Blue should visually dominate.

Red should only emphasize important actions.

---

# Container Width

Desktop

Maximum

1400px

Content Width

1280px

Container

Centered

Large side padding.

---

# Spacing System

Use consistent spacing.

Example

```

XS

SM

MD

LG

XL

2XL

3XL

4XL

```

Never use arbitrary spacing.

---

# Section Padding

Desktop

```

Top

96px

Bottom

96px

```

Tablet

```

80px

```

Mobile

```

64px

```

Every section must follow this spacing.

---

# Top Information Bar

Purpose

Provide quick access to organization contact information.

Height

Desktop

40px

Tablet

40px

Mobile

36px

Background

Primary Blue

Text

White

Icons

White

---

# Top Information Layout

Desktop

```

┌───────────────────────────────────────────────┐

📍 Pokhara, Gandaki

☎ +977-XXXXXXXXXX

✉ info@nyfn.org.np

Facebook

Instagram

YouTube

TikTok

└───────────────────────────────────────────────┘

```

Left

Office Address

Phone

Email

Right

Social Icons

---

# Mobile Top Bar

Keep it simple.

Display

```

☎ Phone

✉ Email

Facebook

```

Hide office address.

---

# Top Bar Behaviour

Default

Visible.

Scroll

Hide smoothly upward.

When user scrolls back

Appear again.

Animation

200ms

Smooth.

---

# Future CMS Fields

The top bar must receive dynamic data later.

Fields

Office Address EN

Office Address NP

Phone

Email

Facebook

Instagram

YouTube

TikTok

Visibility Toggle

Notice Text

Emergency Notice

No frontend redesign should be required.

---

# Main Header

Purpose

Primary website navigation.

Desktop Height

80px

Mobile Height

72px

Sticky

Yes

Transparent over Hero

Yes

Solid after scrolling

Yes

---

# Header Layout

Desktop

```

LOGO

Navigation

Search

Language Switcher

Theme Toggle

```

Logo

Left

Navigation

Center

Utilities

Right

---

# Logo

Use official logo.

Support

Light

Dark

Retina

PNG

Future SVG

Clicking logo always returns Home.

---

# Navigation

Menu

Home

About

Province Committee

Districts

Members

Events

Contact

Future

Search Results

Active state

Blue

Hover

Red underline

Keyboard navigation

Required.

---

# Mobile Navigation

Hamburger menu.

Slide from right.

Width

320px

Contains

Logo

Navigation

Language Switcher

Theme Toggle

Social Icons

Close Button

Contact Information

CTA Button

Animation

Slide

Fade

---

# Search

Display search icon.

Future search targets

Members

Districts

Events

Do not implement backend.

Prepare reusable search modal.

---

# Language Switcher

Supported

English

नेपाली

Requirements

No page reload.

Remember language.

Maintain current page.

Display

EN

|

ने

---

# Theme Toggle

Support

Light

Dark

System

Remember preference.

Animate icon.

Sun

Moon

Monitor

---

# Sticky Behaviour

Top Bar

Hide on scroll.

Main Header

Remain sticky.

Shadow appears after scrolling.

Background transitions

Transparent

↓

White

↓

Dark Navy

Smooth

200ms

---

# Hero Section

Purpose

Immediately introduce NYFN Gandaki.

The hero should feel powerful but simple.

Avoid unnecessary visual effects.

Height

Desktop

90vh

Tablet

80vh

Mobile

75vh

---

# Hero Layout

Desktop

```

┌──────────────────────────────────────────────┐

LEFT

Organization Title

Tagline

Description

CTA

CTA

RIGHT

Large Banner Image

Organization Illustration

or

Official Banner

└──────────────────────────────────────────────┘

```

Mobile

Stack vertically.

Text first.

Image second.

---

# Hero Content

Display

Small Label

Example

National Youth Federation Nepal

Large Heading

NYFN Gandaki Province Committee

Short Description

Localized.

Maximum

2–3 lines.

Buttons

Primary

View Provincial Committee

Secondary

Explore Events

---

# Hero Image

Should support

Banner

Illustration

Organization Photo

Future CMS editable.

Use Next.js Image.

Lazy loading.

Responsive.

---

# Hero Background

Do NOT use loud gradients.

Use

Soft Blue

Subtle overlay

Optional Nepal mountain silhouette

Optional Gandaki landscape

The hero should look official.

---

# Hero Animations

Allowed

Fade

Slide Up

Scale Image

Button Hover

Parallax (very subtle)

Avoid

Bounce

Flash

Heavy Motion

Animations should finish within

600ms.

---

# Hero CTA Buttons

Primary

Blue Filled

Secondary

Outline Blue

Hover

Red Accent

Consistent with theme.

---

# Scroll Indicator

At bottom of Hero.

Simple animated arrow.

Purpose

Encourage scrolling.

Hide after scrolling.

---

# Accessibility

Hero must support

Semantic headings

Proper H1

ARIA Labels

Keyboard Navigation

Alt Text

Color Contrast

---

# Localization

Every hero field must support

English

Nepali

Fields

Organization Name

Tagline

Description

Buttons

Image Alt Text

Everything must use the localization helper.

Never hardcode strings.

---

# Future CMS Preparation

Hero fields should later be editable.

CMS Fields

Hero Title

Hero Subtitle

Hero Description

Primary Button Text

Primary Button Link

Secondary Button Text

Secondary Button Link

Background Image

Hero Banner

Visibility Toggle

No redesign required later.

---

# Deliverables

At the end of Part 01

✅ Top Information Bar

✅ Sticky Header

✅ Responsive Navigation

✅ Mobile Drawer

✅ Search UI

✅ Theme Toggle

✅ Language Switcher

✅ Hero Banner

✅ Hero CTA

✅ Hero Animations

✅ Responsive Layout

✅ Dark Mode

✅ Localization Ready

✅ CMS Ready

No business logic.

No API integration.

No CRUD.

Build production-quality reusable components only.

# PHASE 04 — PUBLIC HOMEPAGE
# PART 02 — Organization Introduction, Chairperson Message, Mission, Vision, Core Values & Statistics

---

# Objective

This section of the homepage should introduce visitors to the organization and establish trust.

Instead of immediately displaying committee members or statistics, the homepage should first explain:

• Who we are

• Why the organization exists

• What our mission is

• What values we follow

• What leadership stands for

Everything in this phase must remain completely dynamic and CMS-ready.

Never hardcode user-facing content.

---

# Section Order

Organization Overview

↓

Chairperson Message

↓

Mission • Vision • Objectives

↓

Core Values

↓

Organization Statistics

---

# Organization Overview

Purpose

Introduce NYFN Gandaki Province.

Layout

Desktop

```
------------------------------------------

Image

Organization Description

------------------------------------------
```

Mobile

```
Image

↓

Description
```

---

# Organization Image

Future CMS Editable

Support

Office

Meeting

Volunteer Activity

Official Event

Province Banner

Use Next.js Image.

Rounded corners.

Subtle shadow.

Responsive.

---

# Organization Content

Display

Small Label

Example

ABOUT THE ORGANIZATION

Large Heading

National Youth Federation Nepal

Gandaki Province Committee

Localized.

Paragraph

Maximum

3 paragraphs.

Each paragraph

Maximum

5 lines.

Do not create long walls of text.

---

# Read More Button

Display

Read More

↓

Navigate

/About

Blue Button

Hover

Red Accent

Localized.

---

# Future CMS Fields

Section Title EN

Section Title NP

Heading EN

Heading NP

Description EN

Description NP

Image

Visibility

Button Text

Button Link

Display Order

---

# Chairperson Message

Purpose

Visitors should immediately understand the leadership's vision.

This should feel personal yet official.

---

# Layout

Desktop

```
-------------------------------------

Chairperson Photo

Message

Signature

-------------------------------------
```

Mobile

```
Photo

↓

Message

↓

Signature
```

---

# Chairperson Photo

Rounded

Professional

Official Portrait

Maximum Width

420px

Responsive

Lazy Loaded

---

# Content

Display

Small Label

MESSAGE FROM THE CHAIRPERSON

Heading

Chairperson's Message

Paragraph

Maximum

5 short paragraphs.

Avoid long text.

At the bottom

Name

Position

Optional Signature Image

---

# CTA

Read Full Message

↓

About Page

---

# Future CMS Fields

Photo

Message EN

Message NP

Name

Position EN

Position NP

Signature Image

Button Text

Button Link

Visibility

---

# Mission Vision Objectives

Purpose

Quickly explain the organization.

Layout

Three equal cards.

Desktop

```
Mission

Vision

Objectives
```

Tablet

2 columns

Mobile

Single column

---

# Card Design

Icon

Heading

Short Description

Maximum

80 words.

Hover

Very subtle elevation.

Blue icon.

Red top accent.

---

# Mission

Future CMS

Title EN

Title NP

Description EN

Description NP

Icon

Visibility

---

# Vision

Future CMS

Title EN

Title NP

Description EN

Description NP

Icon

Visibility

---

# Objectives

Future CMS

Title EN

Title NP

Description EN

Description NP

Icon

Visibility

---

# Core Values

Purpose

Show organizational principles.

Layout

Desktop

3 columns

Tablet

2 columns

Mobile

1 column

---

# Suggested Values

National Unity

Youth Leadership

Democratic Values

Community Development

Volunteerism

Social Responsibility

These are placeholders only.

CMS will manage values later.

---

# Value Card

Display

Icon

Title

Short Description

Hover

Border Blue

Small Red Accent

Scale

1.02

Animation

Fade Up

---

# Future CMS Fields

Title EN

Title NP

Description EN

Description NP

Icon

Display Order

Visibility

---

# Organization Statistics

Purpose

Show organizational scale.

Numbers should increase trust.

Do NOT exaggerate.

Everything dynamic.

---

# Layout

Desktop

4 Cards

Tablet

2 x 2

Mobile

Single Column

---

# Statistics

Province Committee

District Committees

Registered Members

Completed Programs

Future

Volunteers

Women Members

Youth Members

Training Programs

Blood Donation Campaigns

Health Camps

Tree Plantation

Education Programs

Everything CMS configurable.

---

# Statistic Card

Display

Large Number

Small Label

Icon

Short Description

Hover

Blue Border

Blue Shadow

Red Accent Line

Animation

Count Up

Once only.

---

# Future CMS Fields

Title EN

Title NP

Value

Icon

Description EN

Description NP

Visibility

Display Order

---

# Background Styling

Alternate section backgrounds.

Example

Overview

White

Chairperson

Light Blue Surface

Mission

White

Core Values

Very Light Gray

Statistics

White

This creates visual rhythm.

Dark Mode

Maintain the same alternating hierarchy.

---

# Animations

Allowed

Fade

Slide Up

Reveal

Count Up

Hover Lift

Maximum Duration

600ms

No bouncing.

No spinning.

No flashy effects.

---

# Accessibility

Every section must include

Semantic HTML

ARIA Labels

Keyboard Accessibility

Heading Hierarchy

Image Alt Text

Proper Contrast

Screen Reader Friendly

---

# Localization

Everything supports

English

Nepali

Every field

Titles

Descriptions

Buttons

Labels

Statistics

Image Alt

Must use custom localization helper.

Never hardcode strings.

---

# CMS Preparation

Each section should already accept props or data objects.

Do NOT tightly couple layouts with content.

Prepare future interfaces for

Organization

Chairperson

Mission

Vision

Objectives

Core Values

Statistics

No frontend redesign should be required after CMS integration.

---

# Deliverables

After Part 02

✅ Organization Overview

✅ Chairperson Message

✅ Mission Section

✅ Vision Section

✅ Objectives Section

✅ Core Values

✅ Statistics

✅ Responsive Layout

✅ Dark Mode

✅ Localization Ready

✅ Accessibility Ready

✅ CMS Ready

No CRUD.

No APIs.

No backend implementation.

Only build production-quality reusable frontend components.


# PHASE 04 — PUBLIC HOMEPAGE
# PART 03 — Leadership, Districts, Activities, Events & Call To Action

---

# Objective

This section of the homepage showcases the organizational structure and public activities.

Visitors should immediately understand

• Who leads the organization

• Which districts are represented

• What social work has been completed

• What upcoming or recent events exist

Everything must remain fully dynamic and CMS-ready.

No hardcoded data.

---

# Section Order

Provincial Leadership

↓

District Overview

↓

Recent Activities & Impact

↓

Featured Events

↓

Call To Action

---

# Provincial Leadership

Purpose

Introduce the leadership team.

This is only a preview.

The dedicated Members page will contain the complete committee.

---

# Layout

Desktop

6 cards

Tablet

3 columns

Mobile

Single column slider

---

# Section Header

Small Label

PROVINCIAL LEADERSHIP

Heading

Meet Our Leadership Team

Description

Short introduction.

Localized.

Button

View Full Committee

↓

/province-committee

---

# Member Card

Display

Official Photo

Name

Position

District

Phone (Optional)

Email (Optional)

Social Links (Optional)

View Profile

Future

Badge

Current Committee

---

# Card Design

Rounded

White Surface

Blue Border

Red Accent Strip

Hover

Lift

Blue Border

Soft Shadow

---

# Member Image

Official portrait

Square

Responsive

Lazy Loaded

Fallback avatar if image unavailable.

---

# Future CMS Fields

Name EN

Name NP

Position EN

Position NP

Photo

District

Phone

Email

Social Links

Display Order

Visibility

Committee Type

---

# District Overview

Purpose

Display all districts under Gandaki Province.

Visitors should quickly understand organizational coverage.

---

# Layout

Desktop

4 columns

Tablet

2 columns

Mobile

Single column

---

# Gandaki Districts

Kaski

Lamjung

Tanahun

Gorkha

Syangja

Parbat

Baglung

Myagdi

Mustang

Manang

Nawalpur

---

# District Card

Display

District Banner

District Name

Member Count

Committee Level

View District

Hover

Blue Border

Soft Elevation

Red Accent Line

---

# Future Dynamic Information

District Name

District Image

Member Count

Committee Count

Description

Visibility

Display Order

---

# District CTA

Button

Explore All Districts

↓

/districts

---

# Recent Activities & Impact

Purpose

Highlight the association's social contribution.

Unlike Events, these are achievements and completed work.

Examples

Blood Donation

Tree Plantation

Youth Training

Relief Distribution

Health Camp

Educational Program

Volunteer Campaign

Awareness Rally

Community Service

Everything editable through CMS.

---

# Layout

Desktop

Timeline

or

Three Featured Cards

Tablet

Two Columns

Mobile

Vertical Cards

---

# Activity Card

Display

Cover Image

Activity Title

Date

Location

Short Description

Statistics (Optional)

Example

150 Volunteers

200 Trees

500 Beneficiaries

View Details

---

# Hover

Blue Border

Image Zoom

Soft Shadow

---

# Future CMS Fields

Title EN

Title NP

Description EN

Description NP

Image

Date

Location

Volunteer Count

Beneficiary Count

Visibility

Display Order

---

# Featured Events

Purpose

Show important public events.

Maximum

3 Events

Newest First

---

# Layout

Desktop

Three Cards

Tablet

Two Columns

Mobile

Single Column

---

# Event Card

Display

Cover Image

Date

Location

Event Title

Short Description

Registration Status (Optional)

Button

View Event

---

# Future

Upcoming

Completed

Cancelled

Featured

Pinned

---

# Future CMS Fields

Title EN

Title NP

Description EN

Description NP

Image

Date

Location

Status

Registration Link

Visibility

Featured

---

# View All Events

Button

Explore Events

↓

/events

---

# Call To Action

Purpose

Guide visitors to important pages.

Should be visually strong but simple.

---

# Background

Primary Blue

White Text

Small Red Decorative Elements

---

# Heading

Join Hands in Building a Better Society

Localized.

---

# Description

Short encouraging message.

Maximum

3 lines.

---

# Buttons

Primary

View Provincial Committee

↓

/province-committee

Secondary

Explore Districts

↓

/districts

Third Button

Contact Us

↓

/contact

---

# Decorative Elements

Optional

Outline Shapes

Subtle Pattern

Mountain Silhouette

Flag Accent

Do not overuse graphics.

---

# Responsive Behaviour

Desktop

Buttons Inline

Tablet

Stack if necessary

Mobile

Full Width Buttons

Centered Text

---

# Animations

Allowed

Fade

Slide Up

Reveal

Hover Lift

Image Zoom

Card Elevation

Maximum

600ms

Avoid flashy animations.

---

# Accessibility

Every section must support

Semantic HTML

ARIA Labels

Keyboard Navigation

Image Alt Text

Proper Heading Hierarchy

High Contrast

Screen Reader Friendly

---

# Localization

Every field supports

English

Nepali

Fields

Section Titles

Descriptions

Buttons

Member Positions

District Names

Activity Titles

Event Titles

Everything must use the custom localization helper.

Never hardcode strings.

---

# CMS Preparation

Every section should already accept data through props.

Prepare reusable structures for

Leadership

Districts

Activities

Events

CTA

Future CRUD should only populate data.

No redesign required.

---

# Components To Build

ProvinceLeadershipSection

LeadershipCard

DistrictOverviewSection

DistrictCard

RecentActivitiesSection

ActivityCard

FeaturedEventsSection

EventCard

CTASection

All components must be reusable.

---

# Deliverables

After Part 03

✅ Provincial Leadership Preview

✅ District Overview

✅ Recent Activities & Impact

✅ Featured Events

✅ CTA Section

✅ Responsive Layout

✅ Dark Mode

✅ Localization Ready

✅ Accessibility Ready

✅ CMS Ready

No backend.

No CRUD.

No APIs.

Only production-quality reusable frontend components.


# PHASE 04 — PUBLIC HOMEPAGE
# PART 04 — Footer, Responsive Behavior, SEO, Performance, Accessibility & Final Polish

---

# Objective

Finalize the homepage implementation to production quality.

This phase focuses on the finishing layer that users often don't notice directly but that defines the quality, usability, accessibility, SEO, responsiveness, and maintainability of the homepage.

The homepage should now feel like the official website of a provincial government/public organization.

No Admin functionality should be implemented.

No CRUD.

No APIs.

---

# Footer

## Purpose

The footer should act as the final information hub of the website.

It should reinforce the organization's identity while providing quick access to important information.

---

# Footer Layout

Desktop

---------------------------------------------------

Column 1

Organization Logo

Short Introduction

Social Media

Column 2

Quick Links

Home

About

Province Committee

Districts

Members

Events

Contact

Column 3

Office Information

Address

Phone

Email

Office Hours (Optional)

Column 4

Important Links

Privacy Policy

Terms

Constitution

Downloads (Future)

---------------------------------------------------

Bottom Bar

Copyright

Designed for NYFN Gandaki Province

Version (Optional)

---

# Footer Design

Background

Dark Navy

Text

White

Muted Text

Gray

Links

Light Gray

Hover

Primary Blue

Accent Divider

Small Red Line

Logo

White version

---

# Social Icons

Supported

Facebook

Instagram

YouTube

TikTok

Future

X (Twitter)

LinkedIn

Hover

Blue

Active

Red

---

# Newsletter

Do NOT implement.

Reserved for future.

---

# Responsive Footer

Desktop

4 Columns

Tablet

2 Columns

Mobile

Single Column

Centered

---

# Scroll To Top Button

Floating button

Bottom Right

Hidden initially.

Appears after user scrolls approximately 400px.

Click

Smooth scroll to top.

Blue background.

White icon.

Hover

Red.

---

# Responsive Rules

The homepage must support

Mobile

Tablet

Laptop

Desktop

Ultra Wide

No horizontal scrolling.

---

# Mobile Experience

Priority

Fast

Simple

Touch Friendly

Minimum touch target

44px

Navigation

Drawer

Buttons

Full Width

Cards

Single Column

Text

Readable

Spacing

Comfortable

---

# Tablet Experience

Two-column layouts where appropriate.

Maintain generous spacing.

Avoid desktop compression.

---

# Desktop Experience

Maximum content width

1280px

Container

Centered

Consistent spacing

Balanced layout

---

# Ultra Wide Screens

Maximum Width

1400px

Never stretch content edge-to-edge.

Center everything.

---

# Animations

Use Framer Motion.

Keep animations subtle.

Allowed

Fade

Reveal

Slide

Scale

Hover Lift

Image Zoom

Count Up

Page Transition

Maximum Duration

600ms

Do NOT use

Bounce

Flip

Rotate

Flash

Elastic

Heavy Motion

Animations should never distract users.

---

# Hover Interactions

Cards

Blue Border

Soft Elevation

Buttons

Blue

Hover

Red Accent

Navigation

Red Underline

Images

Very slight zoom

Statistics

Count Animation

No unnecessary effects.

---

# Loading Experience

Every homepage section must support loading.

Use

Skeleton Components

Examples

Hero Skeleton

Card Skeleton

Leadership Skeleton

District Skeleton

Event Skeleton

Never display blank pages.

---

# Empty States

Future Ready

Examples

No Events Available

No Members Found

No Districts Found

Illustration

Title

Description

Primary Action

Localized.

---

# Error States

Reusable.

Support

404

500

Network Error

Retry Button

Return Home Button

Localized.

---

# Image Standards

Use Next.js Image.

Requirements

Responsive

Lazy Loaded

Correct Sizes

Object Cover

Rounded Corners

Alt Text

Future Google Cloud Storage Compatible

No stretched images.

---

# Image Optimization

Every image should include

Alt Text

Width

Height

Blur Placeholder (Optional)

Responsive Sizes

Compression

---

# Accessibility

Homepage must achieve WCAG AA.

Requirements

Semantic HTML

Proper Heading Hierarchy

Keyboard Navigation

ARIA Labels

Alt Text

Visible Focus Ring

Color Contrast

Screen Reader Friendly

No inaccessible interactions.

---

# Keyboard Navigation

Users should navigate using only keyboard.

Tab

Shift + Tab

Enter

Escape

Space

Navigation Drawer

Search

Theme Toggle

Language Switcher

Buttons

Links

Everything must be accessible.

---

# SEO

Homepage Metadata

Localized Title

Localized Description

Localized Keywords

Canonical URL

Open Graph

Twitter Card

Robots

Structured Data

Future CMS Editable

---

# Structured Data

Prepare

Organization Schema

Website Schema

Breadcrumb Schema

Future

Event Schema

Member Schema

District Schema

---

# Open Graph

Support

Title

Description

Image

URL

Locale

Future CMS editable.

---

# Performance

Target Lighthouse Score

Performance

95+

Accessibility

100

SEO

100

Best Practices

100

---

# Performance Rules

Prefer Server Components.

Use Client Components only where necessary.

Lazy Load

Heavy Components

Images

Animations

Use Dynamic Imports where beneficial.

Avoid unnecessary JavaScript.

---

# Localization

Every homepage element must support

English

Nepali

Everything should use

t()

Never hardcode strings.

Support

LTR

Future RTL Ready

Language must persist using cookies.

---

# Theme

Support

Light

Dark

System

Theme changes

No layout shift.

No flashing.

Persist selection.

---

# CMS Preparation

Every homepage section should be driven by data.

Prepare reusable data contracts.

Hero

Overview

Chairperson

Mission

Vision

Objectives

Core Values

Statistics

Leadership

Districts

Activities

Events

CTA

Footer

Top Information Bar

Header

No redesign should be required once CMS is integrated.

---

# Suggested Homepage Data Structure

Each section should consume structured data.

Example

Hero

Title

Subtitle

Description

Image

Buttons

Visibility

Statistics

Title

Value

Description

Icon

Display Order

Visibility

Leadership

Member

Position

Photo

Display Order

Visibility

Events

Title

Date

Location

Featured

Image

Visibility

Everything should already support future CRUD.

---

# Component Quality Rules

Every component should be

Reusable

Composable

Responsive

Accessible

Localized

Theme Aware

CMS Ready

Well Documented

Production Ready

Avoid duplicated code.

---

# Homepage Component Tree

PublicLayout

├── TopInfoBar

├── Header

├── HeroSection

├── OrganizationOverview

├── ChairpersonMessage

├── MissionVisionObjectives

├── CoreValues

├── StatisticsSection

├── LeadershipSection

├── DistrictOverview

├── RecentActivities

├── FeaturedEvents

├── CTASection

├── Footer

└── ScrollToTop

---

# Final User Experience

A visitor should be able to

Understand the organization within seconds

View leadership

Explore districts

See recent activities

Discover events

Find contact information

Switch language

Switch theme

Navigate easily

On any device

Without confusion

---

# Acceptance Checklist

The homepage is complete only if all items below are satisfied.

## Layout

✅ Top Information Bar

✅ Sticky Header

✅ Responsive Navigation

✅ Hero Section

✅ Organization Overview

✅ Chairperson Message

✅ Mission, Vision & Objectives

✅ Core Values

✅ Statistics

✅ Provincial Leadership

✅ District Overview

✅ Recent Activities & Impact

✅ Featured Events

✅ Call To Action

✅ Footer

---

## Features

✅ Localization

✅ Dark Mode

✅ Theme Persistence

✅ Language Persistence

✅ Scroll To Top

✅ Responsive Drawer

✅ Search UI Placeholder

---

## UI

✅ Responsive

✅ Mobile First

✅ Tablet Optimized

✅ Desktop Optimized

✅ Ultra Wide Optimized

---

## Quality

✅ Accessibility

✅ SEO Ready

✅ Structured Data Ready

✅ Performance Optimized

✅ Reusable Components

✅ CMS Ready

✅ Clean Architecture

---

## Performance Goals

Lighthouse Performance ≥ 95

Accessibility = 100

SEO = 100

Best Practices = 100

---

# Deliverables

The homepage should now represent the official digital identity of NYFN Gandaki Province.

Every section must be production-ready, reusable, localization-ready, theme-aware, responsive, accessible, and prepared for future CMS integration.

Do not implement Admin CMS functionality in this phase.

Do not implement CRUD operations.

Do not implement backend APIs.

Complete the homepage using reusable frontend architecture that will require minimal changes once dynamic content is connected.