# Meal Calorie Count Generator - Frontend

Next.js web app for calorie tracking using USDA API.

## Features

- User auth (register/login)
- Calorie lookup for dishes
- Personal dashboard with history
- Responsive design
- Form validation with Zod

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Zustand for state
- React Hook Form + Zod
- Axios for API calls

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy env file:

   ```bash
   cp .env.example .env.local
   ```

   Update with your backend URL:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   ```

3. Start dev server:
   ```bash
   npm run dev
   ```

Open http://localhost:3000

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint linter
- `npm run lint:fix` - Fix auto-fixable ESLint issues
- `npm run format` - Format code with Prettier and fix lint issues
- `npm run test` - Run unit tests with Vitest
- `npm run test:ui` - Run tests with UI interface
- `npm run test:coverage` - Generate test coverage report
- `npm run test:e2e` - Run end-to-end tests with Playwright

## Usage

Register/login, then search for dishes to get calorie info. Dashboard shows your search history and stats.

## Notes

- JWT auth with localStorage persistence
- Responsive design (mobile-first)
- Form validation with Zod
- Error handling for API calls
- Toast notifications for UX

## API Endpoints

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /get-calories` - Get calorie data

## Testing

### Unit Tests
We use Vitest for component testing. Tests are located in `src/components/__tests__/`.

Run tests:
```bash
npm run test
```

For a better testing experience with a visual interface:
```bash
npm run test:ui
```

Generate coverage reports:
```bash
npm run test:coverage
```

### End-to-End Tests
E2E tests use Playwright and are in the `e2e/` directory.

```bash
npm run test:e2e
```

Run with UI mode for debugging:
```bash
npm run test:e2e:ui
```

### Writing Tests
- Component tests go in `src/components/__tests__/`
- Use the custom render function from `src/test/utils.tsx` for consistent testing
- Mock data factories are available in the test utils
- E2E tests should cover critical user flows

## Deployment

### Railway (Recommended)

Railway makes deployment simple. Here's how I set it up:

1. **Connect your repo** - Link your GitHub repository to Railway
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Install Command: `npm install`

3. **Environment variables** - Add these in Railway dashboard:
   ```
   NEXT_PUBLIC_API_BASE_URL=your-backend-url
   NODE_ENV=production
   ```

4. **Deploy** - Railway automatically deploys on every push to main branch

The `netlify.toml` file is configured for Netlify but Railway doesn't need it.

### Other Platforms

**Vercel**: Works out of the box. Just connect your repo and set environment variables.

**Netlify**: The `netlify.toml` file is already configured. Set publish directory to `.next` and build command to `npm run build`.

### Environment Variables

Make sure to set these in your deployment platform:
- `NEXT_PUBLIC_API_BASE_URL` - Your backend API URL
- `NODE_ENV` - Set to `production`

## Troubleshooting

**Authentication Issues**
- Clear localStorage in browser dev tools if you're stuck in a login loop
- Check that your backend URL is correct in environment variables
- Verify JWT tokens aren't expired (check localStorage)

**Build Errors**
- Run `npm run lint` to catch TypeScript/ESLint issues
- Make sure all environment variables are set correctly
- Try deleting `node_modules` and running `npm install` again

**API Connection Issues**
- Check network tab in browser dev tools for failed requests
- Verify backend is running and accessible
- Ensure CORS is configured properly on backend
- Double-check the API base URL format (no trailing slash)

**Styling Issues**
- Run `npm run format` to fix code formatting
- Check that Tailwind classes are being applied correctly
- Verify CSS imports are working

**Testing Problems**
- Make sure test files end with `.test.tsx` or `.spec.ts`
- Check that test setup file is properly configured in `vitest.config.ts`
- For E2E tests, ensure test environment is properly isolated
