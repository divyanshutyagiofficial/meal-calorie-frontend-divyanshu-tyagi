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

- `npm run dev` - Dev server
- `npm run build` - Build for production
- `npm run start` - Start production
- `npm run lint` - ESLint

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

## Deployment

Works with Vercel out of the box. Set `NEXT_PUBLIC_API_BASE_URL` in environment variables.

## Troubleshooting

- If auth issues, clear localStorage
- Make sure backend is running on correct port
- Check network tab for API errors
