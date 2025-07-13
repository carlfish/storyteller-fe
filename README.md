# Storyteller Frontend

A React-based frontend application for an interactive storytelling platform.

## Prerequisites

Before running this application, ensure you have the following installed/configured:

- **Node.js** (version 18 or higher)
- **Bun** (recommended package manager)
- **Auth0** properly set up for Single Page Auth

## Auth

Create a `.env` file in the root directory with the following variables:

```env
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_API_BASE_URL=URI of the Storyteller API server
```

Replace the Auth0 values with your actual Auth0 configuration.

## Installation

Install dependencies:

```bash
bun install
```

## Development

### Start Development Server

```bash
bun run dev
```

The application will be available at `http://localhost:5173`

### Other Useful Commands

#### Code Quality

```bash
# Run linting
bun run lint

# Fix linting issues automatically
bun run lint:fix

# Check code formatting
bun run format:check

# Format code automatically
bun run format
```

#### Building

```bash
# Build for production
bun run build

# Preview production build
bun run preview
```

## API Integration

The application integrates with a REST API. During development, API calls are intercepted and mocked using Mock Service Worker (MSW). The mock data is defined in `src/mocks/` directory.

## Contributing

1. Ensure code passes linting: `bun run lint`
2. Ensure code is properly formatted: `bun run format:check`
3. Test the build: `bun run build`

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. Check the terminal output for the actual URL. This will confuse Auth0 in dev.
