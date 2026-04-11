# Omaxe Eternity 2 Vrindavan Website Optimization

## What This Is

This is a real estate landing page and informational website for Omaxe Eternity 2 in Vrindavan. The goal of this project phase is to resolve technical SEO barriers (indexation and redirect errors) and optimize the site for high-quality lead generation, specifically focusing on WhatsApp and Direct Call conversions.

## Core Value

To seamlessly convert high-intent real estate investors into active leads through frictionless communication channels (WhatsApp and Calls) while maintaining perfect search engine visibility.

## Requirements

### Validated

- ✓ Static multi-page routing with responsive CSS design
- ✓ Contact form submission backend via Google Apps Script
- ✓ Direct WhatsApp linking functionality (`wa.me`)
- ✓ Existing Schema.org structured data implementation (`RealEstateAgent`, `FAQPage`, etc)

### Active

- [ ] Fix Google Search Console "Page with redirect" and "Redirect error" issues related to `.html` URLs.
- [ ] Ensure Canonical tags correctly match the final served URLs to eliminate duplicate/redirect loops.
- [ ] Improve Conversion Rate Optimization (CRO) for WhatsApp and direct call CTAs (more prominent, better copy for high-intent investors).
- [ ] Refine lead capture flows to better filter for high-quality investors.

### Out of Scope

- [Complete Re-platforming] — Sticking to the current static HTML/Vanilla-JS architecture as it functions well; no need for a heavy framework like React/Next.js right now.
- [Backend Database Integration] — We continue to rely on the current Google Sheets/Apps script and WhatsApp rather than building a custom database.

## Context

- The site uses a static hosting deployment that might be stripping `.html` extensions while the site’s internal links/sitemaps still contain `.html`, causing persistent GSC redirection loops.
- WhatsApp and direct phone calls are the primary and most successful lead generation channels; the contact form is secondary.
- The target audience is serious investors looking to buy plots. Lead quality is prioritized over pure lead volume.

## Constraints

- **Technical Environment**: Must remain a pure HTML/CSS/Vanilla JS static site.
- **Form Handling**: No dedicated server; forms must continue to gracefully fallback to WhatsApp if the Google Script payload fails.
- **Performance**: Enhancements must not introduce massive JS bundles that would hurt Core Web Vitals, keeping the site lean and fast for mobile.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Prioritize WhatsApp & Direct Calls over Form tweaks | User explicitly cited that WhatsApp and direct calls produce the highest volume/quality of leads. | — Pending |
| Clean `.html` internal linking | Resolving GSC redirect loops requires aligning internal referencing to the actual deployed route schema. | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-11 after initialization*
