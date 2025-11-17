# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is an n8n community node starter repository for building custom n8n integrations. It includes example nodes demonstrating both imperative and declarative coding styles for n8n node development.

## Prerequisites

- Node.js v22 or higher
- All development happens through the `@n8n/node-cli` which is included as a dev dependency

## Essential Commands

### Development
```bash
npm run dev          # Start n8n with hot reload (runs n8n-node dev)
npm run build        # Compile TypeScript to dist/ for production
npm run build:watch  # Build with watch mode enabled
```

### Code Quality
```bash
npm run lint         # Check code with n8n linter
npm run lint:fix     # Auto-fix linting issues
```

### Publishing
```bash
npm run release      # Create a new release
npm publish          # Publish to npm (after build)
```

## Architecture

### Two Node Implementation Styles

1. **Imperative Style** (`nodes/Example/Example.node.ts`)
   - Implements custom `execute()` method
   - Manual handling of input/output data
   - Direct control over all logic
   - Use when you need complex custom behavior

2. **Declarative Style** (`nodes/GithubIssues/GithubIssues.node.ts`) - **RECOMMENDED**
   - Low-code approach for HTTP API integrations
   - Define operations in node description with `routing` property
   - No `execute()` method needed - n8n handles requests automatically
   - Request/response logic handled by framework
   - Significantly less boilerplate

### Declarative Node Structure

The declarative approach organizes nodes into:

```
nodes/
  NodeName/
    NodeName.node.ts          # Main node file with description
    resources/                # Resource definitions
      resourceName/
        index.ts              # Exports all operations for resource
        get.ts                # Individual operation definitions
        getAll.ts
        create.ts
    listSearch/               # Dynamic dropdown functions
      getRepositories.ts
    shared/
      descriptions.ts         # Reusable field definitions
      transport.ts            # API request helper functions
      utils.ts
```

### Key Declarative Concepts

**Routing in Operation Definitions:**
Operations define HTTP requests inline using `routing.request`:
```typescript
{
  name: 'Get',
  value: 'get',
  routing: {
    request: {
      method: 'GET',
      url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}/issues/{{$parameter.issue}}',
    },
  },
}
```

**Routing in Field Definitions:**
Fields map to request body/query params using `routing.send`:
```typescript
{
  displayName: 'Title',
  name: 'title',
  type: 'string',
  routing: {
    send: {
      type: 'body',        // or 'query'
      property: 'title',
    },
  },
}
```

**List Search Methods:**
Dynamic dropdowns use `listSearch` methods for autocomplete:
```typescript
methods = {
  listSearch: {
    getRepositories,  // Function that returns INodeListSearchResult
    getUsers,
  },
};
```

### Credentials

Two credential types are included:
- `GithubIssuesApi.credentials.ts` - Personal Access Token auth
- `GithubIssuesOAuth2Api.credentials.ts` - OAuth2 flow

Credentials implement:
- `authenticate` property for adding auth headers/params
- `test` request to validate credentials
- Conditional display based on authentication parameter

### Package Registration

All nodes and credentials must be registered in `package.json`:
```json
{
  "n8n": {
    "credentials": ["dist/credentials/FileName.credentials.js"],
    "nodes": ["dist/nodes/NodeName/NodeName.node.js"]
  }
}
```

### TypeScript Configuration

- Compiles to CommonJS (`module: "commonjs"`)
- Target: ES2019
- Strict mode enabled
- Output to `dist/` directory
- Includes credentials and nodes directories

## Development Workflow

1. **Modify or create nodes** in `nodes/` directory
2. **Run `npm run dev`** to test in n8n (http://localhost:5678)
3. **Use declarative style** for HTTP API nodes when possible
4. **Lint before committing** with `npm run lint:fix`
5. **Build** with `npm run build` before publishing
6. **Update `package.json`** with node registrations and metadata

## Node Development Guidelines

- Use declarative routing for HTTP APIs to minimize code
- Organize complex nodes by resource and operation
- Implement `listSearch` methods for dynamic dropdowns
- Share common field descriptions in `shared/descriptions.ts`
- Handle authentication conditionally via `displayOptions`
- Set `requestDefaults` in node description for base URL and headers
- Package names must start with `n8n-nodes-`
- Include `n8n-community-node-package` keyword for discoverability
