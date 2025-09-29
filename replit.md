# Jira UI Clone

## Overview

This project is a pixel-perfect clone of Atlassian Jira's project management interface, built as a modern web application. The application focuses on replicating Jira's kanban board functionality, issue tracking system, and user interface components with exact visual fidelity. It features a React-based frontend with TypeScript, comprehensive UI components using shadcn/ui and Radix UI primitives, and drag-and-drop functionality for kanban boards.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **Build System**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom design tokens matching Jira's exact color palette and spacing
- **Component Library**: shadcn/ui components built on Radix UI primitives for accessibility and consistency
- **State Management**: React hooks with TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Drag & Drop**: @dnd-kit for accessible and performant kanban board interactions

### Design System
- **Color Palette**: Exact Jira color matching with CSS variables for theming
- **Typography**: Inter font family with defined weight and size hierarchies
- **Layout**: Tailwind spacing units (1, 2, 3, 4, 6, 8, 12, 16) for consistent spacing
- **Components**: Comprehensive UI component library including cards, modals, forms, and navigation elements

### Data Architecture
- **Type System**: Shared TypeScript interfaces for Jira entities (User, Project, Issue, Comment)
- **Issue Management**: Support for multiple issue types (story, bug, task, epic) with priority levels and status tracking
- **Mock Data**: Frontend-only implementation with comprehensive mock data for development and demonstration

### Application Structure
- **Layout**: Three-panel layout with header, sidebar navigation, and main content area
- **Kanban Board**: Drag-and-drop columns with issue cards showing key information
- **Issue Management**: Full CRUD operations with modals for creating and editing issues
- **Filtering**: Advanced filtering system by assignee, issue type, priority, status, and labels
- **Navigation**: Project tree navigation with breadcrumbs and search functionality

### Code Organization
- **Modular Components**: Isolated, reusable components with clear interfaces
- **Custom Hooks**: Shared logic for mobile detection, toast notifications, and form handling
- **Utility Functions**: Centralized styling utilities and helper functions
- **Type Safety**: Comprehensive TypeScript coverage with strict configuration

## External Dependencies

### UI Framework Dependencies
- **@radix-ui/***: Comprehensive set of unstyled, accessible UI primitives for building the component library
- **@tanstack/react-query**: Server state management and caching for API interactions
- **class-variance-authority**: Utility for creating variant-based component APIs
- **clsx** and **tailwind-merge**: Conditional CSS class management and Tailwind utility merging

### Drag and Drop
- **@dnd-kit/core**, **@dnd-kit/sortable**, **@dnd-kit/utilities**: Modern drag-and-drop toolkit for accessible kanban board functionality

### Form Management
- **react-hook-form**: Performant form library with validation
- **@hookform/resolvers**: Validation schema resolvers for form validation
- **zod**: TypeScript-first schema validation library

### Development Tools
- **Vite**: Next-generation frontend build tool for fast development and optimized builds
- **TypeScript**: Static type checking for enhanced development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **PostCSS**: CSS post-processing for Tailwind and autoprefixer

### Database and Backend (Configured but Frontend-Only)
- **@neondatabase/serverless**: Serverless PostgreSQL database driver (prepared for future backend integration)
- **drizzle-orm**: Type-safe ORM for database operations (prepared for future backend integration)

### Date and Time
- **date-fns**: Modern JavaScript date utility library for formatting and manipulation

### Additional Utilities
- **cmdk**: Command palette component for search and navigation
- **wouter**: Minimalist routing library for React applications