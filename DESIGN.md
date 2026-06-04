---
version: "alpha"
name: "Website.md Minimal"
description: "A clean, high-trust design system for an open-source AI website convention."
colors:
  primary: "#111827"
  secondary: "#4B5563"
  accent: "#2563EB"
  accentSoft: "#DBEAFE"
  background: "#FFFFFF"
  surface: "#F9FAFB"
  border: "#E5E7EB"
  success: "#047857"
  warning: "#B45309"
  danger: "#B91C1C"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "4rem"
    fontWeight: 760
    lineHeight: 1
    letterSpacing: "0"
  h1:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 740
    lineHeight: 1.05
    letterSpacing: "0"
  h2:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "0"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0"
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.95rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  code-panel:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

## Overview

The design should feel like a trusted open-source developer artifact with a simple founder-grade marketing front door. It should be crisp, calm, and direct.

## Colors

Use white and near-white surfaces as the default. Use deep ink for text and blue as a restrained action color. Avoid decorative gradients and over-stylized visual effects.

## Typography

Use large type only for the homepage hero. Documentation pages should prioritize readability and scanning.

## Layout

Use a narrow reading width for docs. Use a wider grid only for the homepage and examples gallery.

## Components

Code blocks are primary product surfaces. They should look polished and be easy to copy.

Buttons should be rare and explicit: quick start, GitHub, spec, examples.

## Do's and Don'ts

Do:

- Make the quick start obvious.
- Keep docs legible.
- Show the file model visually.
- Use real code blocks.

Don't:

- Use generic AI gradients.
- Use bloated hero art.
- Hide the GitHub link.
- Add marketing fluff.

