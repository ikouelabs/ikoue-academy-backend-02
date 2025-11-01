# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Runtime & Package Manager

This project uses **Bun** (v1.2.23+) as the runtime and package manager. Always use `bun` commands instead of `node`, `npm`, `pnpm`, or `yarn`.

## Development Commands

```bash
# Install dependencies
bun install

# Run the server
bun run index.ts

# Run tests
bun test

# Run tests with coverage
bun test --coverage

# Database migrations
bun run db:generate    # Generate migration files from schema
bun run db:migrate     # Run pending migrations
```

## Architecture

This backend follows **Hexagonal Architecture** (Ports & Adapters pattern) with a feature-based folder structure.

### Feature Structure

Each feature is organized into three layers:

```
src/features/{feature-name}/
├── domain/           # Business logic (entities, services, interfaces)
├── inbound/          # Input adapters (REST controllers, etc.)
├── outbound/         # Output adapters (repositories, external services)
├── index.ts          # Dependency wiring
└── {feature}.test.ts # Tests
```

**Key principles:**
- **Domain layer** contains business logic and defines interfaces (ports). It has no dependencies on external frameworks.
- **Inbound adapters** handle incoming requests (REST, MCP, etc.) and call domain services.
- **Outbound adapters** implement domain interfaces for external concerns (database, email, etc.).
- **index.ts** wires dependencies together (repository → service → controller → router).

### Dependency Flow

```
index.ts creates:
  Repository instance → Service instance → Controller/Router
```

Example from `src/features/users/index.ts`:
```typescript
const repository = new DrizzleUserRepository();
const service = new UserService(repository, emailSender);
const router = createUserController(service);
```

### Current Features

- **todos**: Todo management with simple in-memory and Drizzle DB repository implementations
- **users**: User management with authentication (bcrypt + JWT), email notifications
- **messaging**: Email abstraction with fake and Resend adapters
- **status**: Health check endpoint
- **home**: Root endpoint

## Database

- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Connection**: `src/db/index.ts` exports configured `db` instance
- **Schemas**: Defined in `src/db/schemas/` (todos.ts, users.ts)
- **Config**: `drizzle.config.ts` points to `./src/db/schemas` and outputs to `./drizzle`

Database connection requires `DATABASE_URL` environment variable.

## Authentication

JWT-based authentication implemented in `src/lib/auth.ts`:
- `createJwtToken(id, email, role)` - Creates signed JWT
- `verifyJwtToken(token, role?)` - Verifies and decodes JWT with optional role check
- Requires `JWT_SECRET` environment variable

User passwords are hashed with bcrypt (salt rounds: 10).

## Validation

Input validation uses **Zod** (v4). Schemas are defined in controllers (e.g., `createTodoSchema`, `updateTodoSchema` in `todo.rest.ts`).

## Testing

- Test framework: Bun's built-in test runner
- Test files: `{feature}.test.ts` alongside feature code
- Supertest used for HTTP endpoint testing

## TypeScript Configuration

- Path alias: `@/*` maps to `./src/*`
- Module resolution: bundler mode
- Strict mode enabled
- Target: ESNext

## Environment Variables

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT signing/verification
- `PORT` - Server port (defaults to 3000)

Load with dotenv (already configured in `src/index.ts` and `drizzle.config.ts`).

## Application Entry Point

- **Entry**: `src/index.ts` - Loads environment, starts Express server
- **Server setup**: `src/app/server.ts` - Configures Express app and mounts feature routers

## Repository Pattern

Features can have multiple repository implementations. Switch between them in the feature's `index.ts`:

```typescript
// In src/features/todos/index.ts
const repository = new SimpleTodoRepository();  // In-memory
// const repository = new DBTodoRepository();   // Database
```

The service receives the repository through dependency injection and calls the interface methods.

## Notes

- IDs use `crypto.randomUUID()` - never use auto-increment IDs
- Email sender is configured in `src/features/messaging/index.ts` (currently uses FakeEmailSender)
- Comments in code are in French; follow existing conventions
