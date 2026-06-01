# Visione Vesuvio: Figma-to-Code Migration Strategy

## Objective

Replace the current UI of the Next.js project with the new Figma design in a controlled, incremental, and fully traceable way, without breaking navigation, existing content, or responsive behavior.

This document is the operational plan we will follow inside the repository.

## Current Audit

### Current technical structure

- Framework: Next.js 15 with App Router
- Main layout entry: `app/(app)/layout.js`
- Shared shell components:
  - `app/components/Navbar.js`
  - `app/components/Footer.js`
- Main routed pages:
  - `app/(app)/page.js`
  - `app/(app)/calendario/page.js`
  - `app/(app)/rassegne/page.js`
  - `app/(app)/about/page.js`
  - `app/(app)/store/page.js`
  - `app/(app)/contatti/page.js`
- Shared interactive content components:
  - `app/components/FilmGrid.js`
  - `app/components/FlippableCard.js`
  - `app/components/DateEventSwitcher.js`
  - `app/components/EventCard.js`
- Styling is currently spread across global CSS files under `app/styles/`, with several page-specific rules living together in broad shared files.

### What the current code tells us

The current UI already contains the right macro-areas for a cinematic cultural site:

- global navigation
- hero/media-first homepage
- seasonal programming page
- festivals/rassegne page
- editorial/about page
- contact page
- footer/social section

However, the current implementation has a few structural limits that would make a direct pixel-by-pixel redesign fragile if we do not refactor first:

- design tokens are incomplete and concentrated mostly in `app/styles/theme.css`
- many styles are global and tightly coupled to page markup
- some pages use inline styles instead of shared layout primitives
- content is hardcoded directly inside components instead of being organized in reusable data structures
- component naming is based on the old UI, not on a design-system mindset
- the responsive strategy is mostly patch-based, not driven by a unified desktop/mobile system

### Current hardcoded content inventory

Several important content structures are hardcoded directly inside routed pages or UI components:

- `app/components/Navbar.js`
  - `menuItems`
- `app/components/Footer.js`
  - `socialLinks`
- `app/components/FilmGrid.js`
  - `sampleFilmsData`
- `app/components/DateEventSwitcher.js`
  - `eventsByDate`
- `app/(app)/rassegne/page.js`
  - `rassegneData`
- `app/(app)/about/page.js`
  - `heroImageData`
  - `mapImageData`
  - editorial copy
- `app/(app)/store/page.js`
  - placeholder page content

This confirms that the redesign must include de-hardcoding, not only restyling.

### Existing admin/auth base already present

The codebase already contains a first admin-compatible foundation:

- `app/models/User.js`
  - `role` supports `admin` and `user`
  - `approved` is already modeled
- `app/api/auth/[...nextauth]/route.js`
  - `role` is propagated into JWT and session
- `app/api/auth/signup/route.js`
  - users are persisted in MongoDB
- `app/lib/mongodb.js`
  - shared MongoDB connection layer

So the migration can and should prepare the UI architecture for future admin-managed content instead of treating that as a separate unrelated project.

### What we could confirm from the public Figma view

From the public browser inspection of the Figma file, we could confirm these high-level signals:

- the file contains a desktop flow made of multiple frames/artboards arranged horizontally
- the file also contains a separate mobile flow, so the redesign is not desktop-only
- the visual language is organized as complete screens rather than isolated single widgets
- there are content modules tied to posters, imagery, navigation, editorial sections, and footer/contact areas

This is enough to justify a full UI migration plan.

### What must still be extracted from Figma before coding each screen

Before implementing any specific screen, we still need to capture from Figma:

- exact frame names and node IDs
- color tokens
- typography scale
- spacing/radius/shadow system
- desktop and mobile breakpoints implied by the design
- repeated components and their variants
- image ratios and cropping rules
- hover/active states for links, cards, and CTAs

This extraction must happen before each implementation phase, not only once at the beginning.

## Migration Principles

We will follow these rules throughout the redesign:

1. Do not rewrite the entire site in one pass.
2. Separate design foundations from page composition.
3. Convert visual patterns into reusable components before touching every page.
4. Keep routing and functional behavior stable while replacing only presentation and structure.
5. Migrate one screen at a time, but only after the shared shell and tokens are ready.
6. Always implement desktop and mobile together for each migrated section.
7. Prefer removing obsolete CSS instead of layering new CSS on top of legacy selectors.
8. Move repeatable business content out of JSX whenever it represents future editable data.
9. Design repeatable elements as renderers of structured data, not as one-off handcrafted sections.
10. Keep the frontend compatible with a future admin flow that creates, orders, activates, or hides supported content blocks from the database.

## Target Architecture

The new design should not live as a collection of one-off page styles. It should become a small design system inside the app.

### 1. Foundation layer

Create or consolidate a foundation layer for:

- colors
- typography
- spacing
- radii
- borders
- shadows
- layout widths
- section paddings
- animation timings

Suggested direction:

- keep CSS variables as the source of truth
- promote `theme.css` from "theme overrides" to real token file
- split raw tokens from component/page styles if the redesign becomes larger

Suggested files:

- `app/styles/theme.css`
- optional future split:
  - `app/styles/tokens.css`
  - `app/styles/foundations.css`

### 2. Shell layer

This is the site frame that all pages share:

- navbar
- page container
- footer
- max widths
- top/bottom spacing
- background logic

Files involved:

- `app/(app)/layout.js`
- `app/components/Navbar.js`
- `app/components/Footer.js`
- `app/styles/navbar.css`
- `app/styles/footer.css`
- `app/styles/base.css`

### 3. Reusable UI modules

These are the pieces that should be reusable across multiple pages:

- page hero block
- section heading block
- content media block
- CTA pill/button
- poster card
- film/program card
- date switcher
- editorial text block
- gallery or horizontal poster strip

### 4. Page composition layer

Pages should become orchestrators of sections, not containers of raw styling logic.

Each page should mostly:

- import reusable sections/components
- pass structured content
- define page-specific composition only where necessary

### 5. Content model layer

Between page composition and persistence, the project should evolve toward explicit content shapes.

This layer is responsible for defining:

- what is editable content
- what is reusable structure
- what is a variant
- what is global configuration
- what is route-specific content

Examples:

- navigation links
- footer social items
- hero blocks
- featured films
- program events
- festival seasons
- poster groups
- editorial sections
- contact blocks

### 6. Future admin-ready layer

The long-term goal is not to let an admin edit arbitrary markup. The goal is to let an admin compose approved, repeatable building blocks through structured data.

That means the architecture should evolve toward:

- strongly-shaped content documents
- reusable section schemas
- explicit component variants
- ordering fields
- visibility flags
- active/draft/published status where needed
- optional scheduling fields for time-based content

The rendering layer should stay deterministic: the admin chooses among supported patterns, and the frontend renders those patterns consistently.

## Replicable Elements: Admin-Oriented Strategy

This migration should distinguish clearly between two kinds of UI.

### A. Stable structural UI

These parts should remain code-owned and design-system controlled:

- shell layout
- responsive grid rules
- spacing system
- typography scale
- button variants
- card variants
- animation primitives
- container widths

An admin should not redesign these freely.

### B. Replicable content UI

These parts should eventually be creatable or editable by an admin through database-backed records:

- navigation entries
- homepage featured items
- program dates and events
- festival/rassegna entries
- poster collections
- editorial sections
- contact/social items
- future store items

For these elements, the code should own:

- formatting rules
- allowed variants
- validation
- rendering logic

The database should own:

- content values
- ordering
- visibility
- scheduling or active state
- asset references

### Admin-safe rule

The admin should be able to build an element, not redesign the system.

So the architecture should allow:

- choosing a supported block type
- filling structured fields
- selecting a variant
- reordering blocks
- toggling visibility

And should avoid:

- freeform styling per block
- arbitrary HTML
- layout-breaking overrides
- page-specific ad hoc fields with no schema discipline

## Mandatory Pre-Implementation Figma Inventory

Before touching production code for a specific page, we must create a page-level Figma inventory.

For each screen, compile this checklist:

- route path
- Figma frame name
- Figma node ID
- desktop width
- mobile width
- shared components used
- page-only sections
- interactions/states
- image assets required
- copy/content source

Suggested mapping table to build while inspecting Figma:

| Route | Current file | Figma frame | Node ID | Shared parts | New parts needed |
|---|---|---|---|---|---|
| `/` | `app/(app)/page.js` | Home desktop/mobile | to fill | navbar, footer, hero, posters | maybe new section wrappers |
| `/calendario` | `app/(app)/calendario/page.js` | Programmazione desktop/mobile | to fill | date switcher, event card | maybe timeline header |
| `/rassegne` | `app/(app)/rassegne/page.js` | Rassegne desktop/mobile | to fill | poster grids, headings | maybe seasonal block wrapper |
| `/about` | `app/(app)/about/page.js` | About desktop/mobile | to fill | editorial sections | maybe stat/map module |
| `/contatti` | `app/(app)/contatti/page.js` | Contatti desktop/mobile | to fill | footer-like contact blocks | maybe contact cards |
| `/store` | `app/(app)/store/page.js` | Store desktop/mobile | to fill | shell only | likely entirely new screen |

## Code Cleanup and De-hardcoding Goals

The redesign should include a general cleanup pass at architecture level, not only visual polish.

### Cleanup objectives

- remove content arrays from renderer files when those arrays represent business content
- reduce inline styles in routed pages
- stop mixing layout, editorial data, and presentation rules in the same file when avoidable
- remove placeholder markup and spacing hacks
- isolate visual primitives from editable content
- delete CSS that exists only to preserve the previous design
- reduce global selector sprawl
- make repeatable elements easier to promote to DB-backed rendering later

### What should become data-driven first

These are the best first candidates for future admin-managed content:

- navbar items
- footer social links
- homepage featured films/program items
- calendario events
- rassegne seasons and poster groups
- about editorial sections
- contatti blocks

### What should stay code-owned first

These should remain in code even when content becomes DB-driven:

- breakpoints
- spacing scale
- typography tokens
- approved component variants
- animation rules
- accessibility behavior
- media aspect-ratio logic

### Recommended architecture rule

When a block is repeatable, model it as:

- schema/data shape
- renderer component
- optional variant enum
- optional future admin form config

Not as:

- a JSX file with embedded business content constants
- a page component that maps over temporary mock data forever

## Execution Plan

## Phase 0: Freeze scope and build the migration map

Goal: understand what must be replaced and in what order.

Tasks:

- inspect every target Figma frame for desktop and mobile
- map each frame to an existing route or to a missing route/section
- identify repeated components across screens
- list all legacy sections that will be deleted after migration
- note content gaps where the Figma introduces UI not represented in the current code

Deliverable:

- completed mapping table in this document or in a follow-up implementation checklist
- first list of hardcoded structures to extract into dedicated data/schema modules

Exit criteria:

- every current page is mapped to one or more Figma frames
- every Figma frame is classified as:
  - maps to existing code
  - requires a new component
  - requires a new page section
  - requires new content/assets

## Phase 1: Rebuild the design foundation

Goal: make the codebase capable of expressing the new design cleanly.

Tasks:

- audit `app/styles/theme.css`
- rename or replace old tokens that reflect the old UI only
- add missing tokens for:
  - background layers
  - text hierarchy
  - accent colors
  - card surfaces
  - spacing scale
  - border radius scale
  - shadows
  - content widths
- define typography tokens for:
  - display
  - hero title
  - section title
  - body
  - caption
  - menu label
  - button label
- normalize body/main/container rules in `app/styles/base.css`

Expected code impact:

- `app/styles/theme.css`
- `app/styles/base.css`
- possibly `app/styles/globals.css`

Important rule:

No page migration should begin until the token set is stable enough to avoid hardcoded magic numbers everywhere.

## Phase 1B: Define content shapes for repeatable blocks

Goal: prepare the redesign so repeatable sections can later become admin-managed records without rewriting rendering logic.

Tasks:

- identify every repeatable content block in current routes
- define a stable data shape for each one
- separate global config from page content
- decide which fields are plain content and which are component variants
- decide which entities need `order`, `slug`, `status`, `isVisible`, `startAt`, `endAt`, or `featured`

Initial candidates:

- nav item
- social link
- film/program card
- event
- festival season
- festival poster
- editorial section
- contact block

Suggested near-term implementation direction:

- first extract static arrays into dedicated data modules
- then make components consume those modules as props
- then evolve the same shapes into Mongo-backed models or API payloads when admin work starts

Important rule:

The first step is not "build CMS immediately". The first step is "stop coupling repeatable content to JSX structure".

## Phase 2: Replace the app shell

Goal: align global chrome with Figma before page-by-page migration.

Tasks:

- redesign `Navbar.js` to match new spacing, typography, logo sizing, and active state behavior
- redesign `Footer.js` to match new layout and social/contact structure
- update `app/(app)/layout.js` only if shell composition changes
- centralize shell widths and vertical rhythm
- validate sticky vs static behavior from Figma instead of preserving current behavior by default

Expected code impact:

- `app/components/Navbar.js`
- `app/components/Footer.js`
- `app/(app)/layout.js`
- `app/styles/navbar.css`
- `app/styles/footer.css`
- `app/styles/base.css`

Exit criteria:

- every page inherits the new header/footer look automatically
- no page-specific hack is needed to make the shell look correct

## Phase 3: Extract reusable redesign components

Goal: build the modules that several screens will reuse.

Components we are likely to need:

- `SiteHero`
- `SectionHeading`
- `PosterRail` or `PosterStrip`
- `PosterCard`
- `EditorialSection`
- `CTAButton`
- `ProgramDateSwitcher`
- `ProgramEventCard`
- `MediaBanner`

Where they can come from:

- existing `FilmGrid.js`
- existing `FlippableCard.js`
- existing `DateEventSwitcher.js`
- existing `EventCard.js`

Likely refactor direction:

- keep logic if still valid
- replace markup and class structure
- rename components if current names describe the old interaction instead of the new role
- move hardcoded content arrays out of component files when reuse becomes necessary

Expected code impact:

- `app/components/FilmGrid.js`
- `app/components/FlippableCard.js`
- `app/components/DateEventSwitcher.js`
- `app/components/EventCard.js`
- potentially new component files under `app/components/`

Important rule:

If the Figma no longer uses the "flip card" metaphor, we should not force the new design through `FlippableCard`. In that case we create a new poster/program card component and retire the old one.

### Component rule for future admin composition

Every reusable component that could render admin-created content should accept structured props rather than reading embedded constants.

Examples:

- `Navbar` should eventually render from a nav config array
- `Footer` should eventually render from a social/contact config object
- `ProgramEventCard` should render from an `event` object
- poster rails should render from item arrays
- editorial sections should render from typed section objects

## Phase 4: Migrate the homepage

Current entry:

- `app/(app)/page.js`

Current structure:

- full-bleed video
- text intro row
- large featured image
- film grid

Migration tasks:

- identify the homepage frame in Figma
- replicate section order exactly
- replace current hero/video treatment only if it still exists in the new design
- align title hierarchy, spacing, poster layout, and CTA placement with the Figma
- refactor the film/program section into the new visual card system
- remove legacy wrappers that only exist to support the old layout

Expected code impact:

- `app/(app)/page.js`
- `app/components/FilmGrid.js`
- `app/components/FlippableCard.js` or its replacement
- related CSS files

Exit criteria:

- homepage matches the new desktop and mobile frames
- no legacy home selectors remain unless still genuinely used

## Phase 5: Migrate the programmazione/calendario page

Current entry:

- `app/(app)/calendario/page.js`

Current supporting components:

- `app/components/DateEventSwitcher.js`
- `app/components/EventCard.js`

Migration tasks:

- inspect how the new design presents dates, event detail, poster, and ticket CTA
- redesign the selector UI from the Figma rather than preserving the current control shape
- externalize event data if the new layout needs richer metadata
- verify state behavior for:
  - selected day
  - horizontal scroll
  - mobile overflow
  - CTA visibility

Expected code impact:

- `app/(app)/calendario/page.js`
- `app/components/DateEventSwitcher.js`
- `app/components/EventCard.js`
- `app/styles/date-event-switcher.css`

Important rule:

The new UI for this page should be data-driven. If we keep a richer event object, the component should only render it, not own editorial content architecture.

## Phase 6: Migrate the rassegne page

Current entry:

- `app/(app)/rassegne/page.js`

Current structure:

- upcoming festival block
- multiple past seasonal blocks
- large and small poster combinations

Migration tasks:

- inspect how the Figma organizes "prossima" and "passate"
- decide whether the page remains image-grid based or becomes editorial/catalog based
- create a section model for festival seasons
- replace ad hoc wrappers with one or two reusable poster composition blocks
- unify image handling and aspect-ratio behavior

Expected code impact:

- `app/(app)/rassegne/page.js`
- `app/styles/rassegne.css`
- potentially new poster layout components

Exit criteria:

- one content structure can power all seasonal sections
- the layout does not depend on unique CSS rules per poster block

## Phase 7: Migrate the about page

Current entry:

- `app/(app)/about/page.js`

Current structure:

- hero image
- map/media block
- three editorial sections

Migration tasks:

- inspect the Figma hierarchy for hero, editorial blocks, media, and captions
- convert the page to reusable editorial modules
- replace inline image styling with shared media wrappers
- normalize paragraph widths, section spacing, and title presentation

Expected code impact:

- `app/(app)/about/page.js`
- about-related rules currently living in `app/styles/base.css`

Important rule:

About should become content-led and typographically strong, not an accumulation of page-specific utility rules.

## Phase 8: Migrate contatti and store

Current entries:

- `app/(app)/contatti/page.js`
- `app/(app)/store/page.js`

Notes:

- `store` is currently a placeholder and is the most likely page to need full creation from the design
- `contatti` is currently simple and may need new cards, blocks, or a more brand-heavy composition

Tasks:

- map both pages to Figma frames
- implement the missing UI for `store` if the design defines it
- redesign contact information layout using the new token system
- remove placeholder spacing and presentational `<p>.</p>` markers from `contatti`

Expected code impact:

- `app/(app)/contatti/page.js`
- `app/(app)/store/page.js`
- contact/store-related styles

## Phase 8B: Prepare the future admin surface

Goal: leave the frontend in a state where a future admin area can plug into it with minimal redesign churn.

Tasks:

- document which sections are intended to become admin-managed
- align frontend props with likely persistence shapes
- avoid route components depending on local business-content constants
- centralize mock data in a way that can later be replaced by DB fetches
- preserve role-based access assumptions already present in the auth model

Future backend/admin concerns to keep in mind:

- admin-only CRUD for repeatable elements
- approval/publish workflow if needed
- media management strategy
- ordering and sorting support
- visibility scheduling
- route/section targeting for blocks

Important rule:

Frontend redesign choices made now should reduce the cost of a future admin dashboard, not increase it.

## Phase 9: Responsive pass based on the mobile Figma frames

Goal: make responsive behavior intentional instead of corrective.

Tasks:

- compare each migrated desktop screen with its mobile frame
- define where the layout truly changes:
  - stack order
  - content density
  - image cropping
  - navigation behavior
  - CTA width and position
- ensure shared components support both variants without page-specific overrides where possible

Important rule:

Do not derive mobile only by "shrinking desktop CSS". The presence of separate mobile frames in Figma means mobile is a first-class design target.

## Phase 10: Cleanup and deletion

Goal: finish the migration by removing the old UI, not just hiding it under the new one.

Tasks:

- delete unused selectors
- delete deprecated component branches
- remove dead layout wrappers
- remove unused hardcoded content structures
- reduce CSS overlap across `base.css`, `theme.css`, and page-specific files
- remove stale comments and placeholder copy
- replace ad hoc inline layout values with token-driven styles
- move remaining business-content constants out of renderer files
- identify dead or orphaned style files and selectors
- verify whether styles like `dashboard.css` are still needed or should be removed/refactored

Exit criteria:

- no legacy component survives only because "it still kind of works"
- CSS reflects the new design system, not both old and new at the same time

## Recommended File-by-File Change Order

Use this order during implementation:

1. `app/styles/theme.css`
2. `app/styles/base.css`
3. `app/components/Navbar.js`
4. `app/styles/navbar.css`
5. `app/components/Footer.js`
6. `app/styles/footer.css`
7. shared UI components under `app/components/`
8. `app/(app)/page.js`
9. `app/(app)/calendario/page.js`
10. `app/(app)/rassegne/page.js`
11. `app/(app)/about/page.js`
12. `app/(app)/contatti/page.js`
13. `app/(app)/store/page.js`
14. final CSS cleanup across `app/styles/`

## Recommended Delivery Slices

To keep the work safe and reviewable, split the migration into small merges:

1. design tokens + shell
2. homepage
3. programmazione/calendario
4. rassegne
5. about
6. contatti + store
7. de-hardcoding + admin-ready data extraction pass
8. cleanup pass

## Quality Gates

Each migrated page must pass all of the following:

- matches Figma desktop structure
- matches Figma mobile structure
- uses shared tokens instead of ad hoc inline values
- contains no placeholder layout hacks
- keeps navigation and routes working
- has coherent hover, focus, and active states
- has stable image behavior
- has no duplicated CSS for the same pattern in multiple files
- does not trap repeatable content inside component internals
- is compatible with future admin-fed structured data

## Risks and Guardrails

### Risk 1: trying to restyle legacy markup directly

Why it is risky:

- old markup was not designed for the new visual hierarchy

Guardrail:

- allow structural JSX refactors when the new design demands them

### Risk 2: preserving old component metaphors

Why it is risky:

- a new design may not want flip cards, oversized hover logic, or old CTA behavior

Guardrail:

- replace the component outright when the metaphor no longer matches the Figma

### Risk 3: mixing legacy CSS with new CSS indefinitely

Why it is risky:

- the codebase becomes harder to maintain after every page migration

Guardrail:

- delete or rewrite old selectors as soon as the new component is stable

### Risk 4: implementing desktop first and "fixing mobile later"

Why it is risky:

- the Figma already signals separate mobile artboards

Guardrail:

- each page migration closes only when desktop and mobile are both implemented

### Risk 5: rebuilding beautiful screens on top of hardcoded content structures

Why it is risky:

- the UI will look new, but the architecture will still resist admin features and future updates

Guardrail:

- whenever a block is repeatable, extract its content shape while migrating the screen

### Risk 6: giving future admins too much visual freedom

Why it is risky:

- design consistency breaks quickly when content management also becomes uncontrolled styling

Guardrail:

- admin capabilities should compose approved variants, not inject arbitrary presentation rules

## Definition of Done

The migration is complete when:

- every current route is visually aligned with its Figma counterpart
- the site shell is fully replaced
- all repeated UI patterns are backed by reusable components
- styling is token-driven
- obsolete legacy CSS and components are removed
- mobile behavior follows the mobile Figma frames, not guesswork
- repeatable content blocks can be fed by structured data instead of hardcoded JSX constants
- the frontend is ready for a future admin-managed content flow based on existing auth roles

## Immediate Next Step

Before starting code implementation, perform the first detailed Figma extraction pass for:

1. homepage desktop + mobile
2. shared navbar/footer patterns
3. programmazione desktop + mobile

In parallel, compile the first extraction list of repeatable entities to de-hardcode:

- nav items
- social links
- events
- featured films
- rassegne
- editorial sections

These two tracks together will unlock the foundation layer, the first real migration slice, and the future admin-ready architecture.
