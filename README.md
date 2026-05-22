# CRM Connect Portal Starter

A clean, scalable starter template for a multi-tenant CRM / Connect client portal built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, Zustand, React Hook Form, Zod, and Axios.

## What This Is

This repository is a frontend starter template.

It exists to provide:

- A production-ready folder structure
- Clear data flow boundaries
- Mocked APIs for UI development before a backend exists
- A representative document feature with filters, pagination, forms, and mutations
- A minimal portal shell for future feature expansion

It does not try to be a full CRM. Only minimal sample features are included on purpose. New features should be added intentionally as real product requirements appear.

## Why This Template Exists

Many CRM starter projects become noisy too early. They ship with too many fake modules, oversized navigation, and patterns that are hard to maintain once real requirements arrive.

This template takes the opposite approach:

- Keep the app thin
- Keep the layout real
- Keep feature boundaries obvious
- Keep state ownership disciplined
- Keep mocked flows representative, not bloated

## Included Pages

Only these minimal pages are included:

- `/login`
- `/connect`
- `/connect/[companySlug]/dashboard`
- `/connect/[companySlug]/documents`
- `/connect/[companySlug]/settings`

## Included Feature Modules

Only these feature modules are included:

- `auth`
- `company`
- `dashboard`
- `document`

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Axios
- lucide-react
- ESLint
- npm

## Architecture Overview

This starter uses feature-based architecture with pragmatic clean separation.

Core rules:

- Business logic is grouped by feature, not by technical layer alone
- Shared UI exists only for generic reusable pieces
- React components call custom hooks, not Axios directly
- Server state lives in TanStack Query
- UI-only state lives in Zustand
- API functions live inside feature `api` folders
- Forms use React Hook Form with Zod validation
- Heavy filtering, sorting, pagination, permission checks, and aggregation should be handled by backend APIs

## Folder Structure

```text
src/
  app/
    layout.tsx
    globals.css
    page.tsx

    (auth)/
      login/
        page.tsx

    (portal)/
      connect/
        page.tsx
        [companySlug]/
          layout.tsx
          dashboard/
            page.tsx
          documents/
            page.tsx
          settings/
            page.tsx

  components/
    layout/
      portal-shell.tsx
      portal-sidebar.tsx
      portal-topbar.tsx

    shared/
      page-header.tsx
      empty-state.tsx
      error-state.tsx
      loading-state.tsx
      data-table-pagination.tsx

    ui/
      # shadcn/ui components

  features/
    auth/
      api/
      hooks/
      schemas/
      types/
      components/

    company/
      api/
      hooks/
      types/
      components/

    dashboard/
      api/
      hooks/
      types/
      components/

    document/
      api/
      hooks/
      schemas/
      types/
      components/

  lib/
    api/
      http-client.ts
      api-response.ts
    query/
      query-provider.tsx
    utils.ts

  stores/
    ui.store.ts

  config/
    navigation.ts
```

## Data Flow

The intended data flow is:

1. Route or feature component reads UI input
2. Component calls a feature hook
3. Hook uses TanStack Query or TanStack Mutation
4. Hook calls a feature API function
5. API function returns typed mocked data
6. UI renders typed state

Example:

```text
DocumentsPage
  -> useDocuments(companySlug, filters)
    -> getDocuments(companySlug, filters)
      -> mocked response with pagination meta
```

## State Management Rules

Use TanStack Query for:

- Lists
- Detail fetches
- Mutations
- Upload flows
- Cached server responses

Use Zustand for:

- Sidebar collapse state
- Other local UI-only toggles

Do not use Zustand for:

- API response caching
- Document lists
- Authentication session modeling
- Cross-page server data

## API Response Shapes

Shared API response types live in `src/lib/api/api-response.ts`.

List APIs use this shape:

```ts
{
  data: T[],
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
```

## Feature Module Pattern

A feature owns:

- API functions
- Hooks
- Validation schemas
- Feature-local types
- Feature-specific components

Example feature structure:

```text
features/
  document/
    api/
      document.api.ts
    hooks/
      use-documents.ts
      use-upload-document.ts
    schemas/
      upload-document.schema.ts
    types/
      document.type.ts
    components/
      document-filter.tsx
      document-table.tsx
      upload-document-dialog.tsx
```

## Example Query Hook

```ts
export function useDocuments(companySlug: string, filters: DocumentFilters) {
  return useQuery({
    queryKey: ["documents", companySlug, filters],
    queryFn: () => getDocuments(companySlug, filters),
  })
}
```

## Example Mutation Hook

```ts
export function useUploadDocument(companySlug: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: uploadDocument,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["documents", companySlug],
      })
    },
  })
}
```

## Example Menu Config Item

```ts
{
  label: "Documents",
  href: (companySlug) => `/connect/${companySlug}/documents`,
  icon: FileText,
}
```

## Example Environment Variable

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

## How To Add A New Feature

1. Create a new folder in `src/features/<feature-name>`
2. Add `api`, `hooks`, `types`, and `components`
3. Add `schemas` if the feature includes forms
4. Keep API calls inside the feature `api` folder
5. Expose server state through feature hooks
6. Render the feature from route pages or layout-level components

Recommended pattern:

```text
features/
  your-feature/
    api/
    hooks/
    types/
    schemas/
    components/
```

## How To Add A New Menu Item

Update `src/config/navigation.ts`.

Example:

```ts
{
  label: "Your Feature",
  href: (companySlug) => `/connect/${companySlug}/your-feature`,
  icon: YourIcon,
}
```

Then create the matching route under `src/app/(portal)/connect/[companySlug]/your-feature/page.tsx`.

## How To Add A New API Hook

1. Add or extend the feature API file
2. Type the API response
3. Create a hook in `hooks/`
4. Use a stable query key
5. Keep component code unaware of transport details

Example:

```ts
export function useYourFeature(companySlug: string) {
  return useQuery({
    queryKey: ["your-feature", companySlug],
    queryFn: () => getYourFeature(companySlug),
  })
}
```

## How To Add A New Form With Zod And React Hook Form

1. Create a schema in `schemas/`
2. Export the inferred form type
3. Initialize `useForm` with `zodResolver`
4. Submit through a feature mutation hook
5. Invalidate relevant queries on success

Example:

```ts
const schema = z.object({
  name: z.string().min(1, "Name is required"),
})

type FormValues = z.infer<typeof schema>

const form = useForm<FormValues>({
  resolver: zodResolver(schema),
})
```

## How To Add shadcn/ui Components

If a required shadcn component is missing, add it with the CLI instead of hand-rolling a large replacement.

Example:

```bash
npm dlx shadcn@latest add button card dialog select table
```

This repository already includes the minimal components needed for the starter.

## Environment Variables

Create a local `.env.local` file when needed.

Supported variables:

- `NEXT_PUBLIC_API_BASE_URL`

The starter currently uses:

- Fallback: `http://localhost:8080/api`
- Mocked feature APIs: used for UI development before backend integration

## Installation

```bash
npm install
```

## Development

```bash
npm dev
```

## Lint

```bash
npm lint
```

## Build

```bash
npm build
```

## Mock API Notes

Backend integration is not implemented yet.

Current feature APIs:

- return mocked promises
- simulate realistic delay
- demonstrate pagination and sorting contracts
- keep React components free from transport code

This means developers can build real UI flows now and later replace mocked API functions with live integrations without rewriting page-level component structure.

## Document Feature Example

The `document` feature exists as the representative pattern for:

- server-style pagination
- server-style filtering
- server-style sorting
- upload form validation
- mutation and query invalidation

It is intentionally small. It is not a full document management product.

## Code Style Guidelines

- Use TypeScript strictly
- Avoid `any`
- Prefer feature-local types over shared catch-all types
- Keep React components thin
- Do not call Axios directly in components
- Put transport logic in feature APIs
- Put server state in TanStack Query
- Put UI-only state in Zustand
- Keep shared components generic
- Keep new menus and routes intentional

## Contribution Guidelines

1. Keep changes scoped to the requested feature
2. Preserve feature boundaries
3. Avoid adding fake product modules
4. Prefer extending existing patterns over inventing parallel ones
5. Document architectural changes in the README when they affect contributors

## Roadmap

Planned future directions:

- Real authentication integration
- Backend API integration
- More feature modules added intentionally from real requirements
- Testing setup expansion

## License

License placeholder. Add the license that matches your organization or open-source distribution plan.
