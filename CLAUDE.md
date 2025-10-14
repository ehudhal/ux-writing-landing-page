# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Setup
```bash
pnpm i
pnpm vercel:pull-env  # Pull environment variables (run `npx vercel link` first if needed, choose "Chordio")
pnpm inngest          # Start Inngest dev server (required for background jobs)
pnpm dev              # Start Next.js dev server on port 3001
pnpm stripe           # (Optional) Start Stripe webhook listener
```

### Testing and Quality
```bash
pnpm test             # Run Jest tests in watch mode
pnpm lint             # Run ESLint
pnpm lint:fix         # Auto-fix linting issues
pnpm type-check       # Run TypeScript type checking
pnpm format:write     # Format code with Prettier
pnpm format:check     # Check code formatting
```

### Database Operations
```bash
pnpm drizzle-kit generate  # Generate migration from schema changes
pnpm db:migrate            # Run migrations (ensure on correct branch DB first)
pnpm beacon switch [branch]  # Switch to branch-specific database
pnpm drizzle-studio        # Open Drizzle Studio UI
```

### Prompt Library Management
This codebase uses a custom prompt library system for AI interactions:
```bash
pnpm build:prompts-library  # Build prompts JSON from markdown files
pnpm watch:prompts-library  # Watch prompts directory and rebuild on changes (runs with `pnpm dev`)
```

### Other Commands
```bash
pnpm build            # Build for production (includes prompts build and migrations)
pnpm scripts          # Run interactive scripts menu
pnpm localtunnel      # Expose local server for Slack app development
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 (App Router) with TypeScript
- **Database**: PostgreSQL via Drizzle ORM with Neon serverless
- **Authentication**: Clerk (with mandatory organization membership)
- **Background Jobs**: Inngest
- **AI**: Multiple providers via Vercel AI SDK (Anthropic, OpenAI, Google, AWS Bedrock)
- **Payments**: Stripe
- **Integrations**: Slack (via slack-edge), Figma
- **Monitoring**: Sentry, PostHog

### Key Architectural Patterns

#### 1. Prompt Library System
Located in `lib/prompts/`, this is a critical system for managing AI prompts:
- Prompts are authored as Markdown files in `lib/prompts/library/`
- Build script (`scripts/build-prompts-json.ts`) compiles them into `lib/prompts/library.json`
- Access via `prompts()` helper: `prompts('chat/response').add('chat/slack-format').toString()`
- Supports parameterization with `{paramName}` syntax
- Type-safe keys via `SpecificPromptKey` type
- **Important**: Always rebuild after modifying prompt files

#### 2. Database Schema Organization
Database schemas in `lib/db-schema/` by domain:
- `designs.ts`: Product designs with hierarchical screen structure
- `artifacts.ts`: Generated artifacts (briefs, wireframes, flowcharts, social posts)
- `chunks.ts`: UI component chunks within screen instances
- Each table exports Zod schemas for validation

#### 3. Jobs System (Inngest)
Background jobs in `jobs/` directory:
- `jobs/design/`: Design generation workflows
- `jobs/artifacts/`: Artifact generation (briefs, wireframes, etc.)
- `jobs/capture/`: Screenshot capture via Playwright
- Must run `pnpm inngest` alongside dev server for jobs to execute

#### 4. Service Layer Pattern
Business logic in `lib/services/`:
- One service per domain (e.g., `artifacts-service.ts`, `screens-service.ts`)
- Services manage database operations and use Vercel KV for ephemeral data
- Server Actions in `lib/actions/` call services for UI interactions

#### 5. Hierarchical Product/Design Structure
Products contain:
- **Designs** (design versions of a product)
- **Screens** (user-facing screens with stable IDs for versioning)
- **Screen Instances** (specific versions of screens)
- **Chunks** (UI components within screen instances, hierarchical)

This hierarchy supports versioning and iterative refinement.

#### 6. Middleware Chain
`middleware.ts` applies in order:
1. Service authentication (for external integrations)
2. Clerk authentication
3. Organization enforcement (redirects to `/orgs` if no org)
4. New chat redirect handler
5. CSP headers

### Important File Locations

- **API Routes**: `app/api/` - organized by integration (slack, auth, hooks, etc.)
- **App Routes**: Main app in `app/(app)/` route group, static pages in `app/(static)/`
- **Components**: `components/` - Radix UI-based design system
- **Chat Logic**: `lib/chat/` - chat session management and AI interaction
- **External Services**: `lib/external-services/` - integrations (Slack, Notion, Firecrawl)
- **Scripts**: `scripts/` - migration and maintenance scripts
- **Database Config**: `drizzle.config.ts` - uses `DATABASE_URL_UNPOOLED` env var

### Testing Notes
- Test account: `your_email+clerk_test@example.com` with code `424242`
- Jest configured for React component testing with jsdom
- Tests use `.test.ts` suffix

### Database Workflow
When creating migrations:
1. Modify schema in `lib/db-schema/`
2. Run `pnpm drizzle-kit generate`
3. Ensure on correct branch DB: `pnpm beacon switch [branch]`
4. Run `pnpm db:migrate`
5. See `docs/migrations.md` for conflict resolution

### Environment Setup
Required tools:
- NVM for Node.js version management
- pnpm (install globally: `npm install -g pnpm`)
- Stripe CLI (for webhook testing)
- Vercel CLI (for environment variable management)

### Content Security Policy
CSP is dynamically configured in middleware with S3 bucket URLs and integration domains. Update `middleware.ts` when adding new external resources.

### Key Configuration Files
- `next.config.js`: MDX support, Sentry integration, image domains, CORS for Chrome extension/Figma plugin
- `components.json`: shadcn/ui configuration
- `instrumentation.ts` & `instrumentation-client.ts`: Sentry setup for server/client
