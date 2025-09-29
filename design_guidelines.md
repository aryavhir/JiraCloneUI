# Jira UI Clone - Design Guidelines

## Design Approach
**Reference-Based Approach**: Exact 1:1 replica of Atlassian Jira's current interface, prioritizing pixel-perfect accuracy over creative interpretation.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Jira Blue: 216 100% 50% (primary actions, links)
- Navy: 216 25% 15% (headers, primary text)
- White: 0 0% 100% (backgrounds, cards)

**Status Colors:**
- Success Green: 120 50% 40%
- Warning Orange: 35 85% 55%
- Error Red: 0 70% 50%
- In Progress Blue: 210 80% 60%

**Neutral Grays:**
- Text Primary: 0 0% 20%
- Text Secondary: 0 0% 45%
- Border Light: 0 0% 85%
- Background Gray: 0 0% 97%

### B. Typography
**Primary Font**: Inter or system fonts
- Headers: 600 weight, 16-24px
- Body text: 400 weight, 14px
- Labels: 500 weight, 12px
- Code/IDs: Monospace, 12px

### C. Layout System
**Tailwind Spacing**: Use units 1, 2, 3, 4, 6, 8, 12, 16
- Sidebar: Fixed 256px width
- Content padding: p-4 to p-6
- Card spacing: gap-4
- Button padding: px-4 py-2

### D. Component Library

**Navigation:**
- Left sidebar with project navigation tree
- Top breadcrumb navigation
- Global search bar in header
- User avatar dropdown menu

**Data Display:**
- Kanban board columns with draggable cards
- Issue cards showing key, summary, assignee, priority
- Sprint planning boards with backlog
- Issue detail panels with tabbed content

**Forms & Inputs:**
- Jira-style dropdowns with search
- Rich text editor for descriptions
- File upload areas
- Date/time pickers matching Jira style

**Overlays:**
- Issue detail modal (full-screen on mobile)
- Create issue modal
- User picker dropdowns
- Context menus for actions

### E. Key UI Patterns

**Issue Cards:**
- White background with subtle shadows
- Issue type icons (bug, story, epic)
- Priority indicators (colored triangles)
- Assignee avatars
- Status labels with colored backgrounds

**Kanban Board:**
- Columns with gray headers
- Drag-and-drop visual feedback
- Column limits and WIP indicators
- Swimlanes for epics/assignees

**Sidebar Navigation:**
- Collapsible project tree
- Active state highlighting
- Icon + text labels
- Nested navigation for project sections

## Images
No hero images required. Use only:
- User avatar placeholders (circular, 32px)
- Issue type icons from Material Icons
- Priority indicator symbols
- Project/company logos (small, in sidebar)
- Attachment thumbnails in issue details

## Specific Jira Features to Replicate
- Exact Jira header with Atlassian branding
- Project sidebar with identical navigation structure
- Sprint planning interface
- Issue creation modal with all field types
- Comment threads with @mentions
- Attachment handling UI
- Activity feeds and notifications
- Board configuration options

**Critical**: Maintain Jira's exact visual hierarchy, spacing, and interaction patterns. Every component should be indistinguishable from the original Jira interface.