# Fourlabs Studio frontend

Customer-facing Next.js application for Fourlabs Studio. It includes the marketing site, template shop, authentication, checkout, purchases, notifications, receipts, and customer account pages.

## Requirements

- Node.js 20 or newer
- `fourwaymedia-backend` running locally for authentication, catalog, checkout, and dashboard data
- A configured PostgreSQL/Paystack backend for real purchases

## Local development

Install dependencies and start the frontend:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Start the backend separately from `fourwaymedia-backend`:

```bash
npm install
npm run db:up
npm run db:migrate
npm run db:seed
npm run dev
```

The backend runs at [http://localhost:4000](http://localhost:4000) by default.

## Environment variables

Create `.env.local` in this directory:

```env
# Used by the browser to load the public shop catalog.
NEXT_PUBLIC_API_URL=http://localhost:4000

# Used by Next.js server-side proxy routes. Keep this server-only.
API_URL=http://localhost:4000
```

The backend has its own environment configuration. See the backend [README](../fourwaymedia-backend/README.md) and [build guide](../fourwaymedia-backend/BACKEND-BUILD-GUIDE.md).

## Main routes

| Route                           | Purpose                            |
| ------------------------------- | ---------------------------------- |
| `/`                             | Marketing homepage                 |
| `/shop`                         | Browse and purchase templates      |
| `/sign-in`, `/sign-up`          | Customer authentication            |
| `/verify-email`                 | Email verification                 |
| `/forgot-password`              | Password reset request             |
| `/dashboard`                    | Customer overview                  |
| `/dashboard/purchases`          | Purchased templates and downloads  |
| `/dashboard/notifications`      | Purchase and billing notifications |
| `/dashboard/receipts/[orderId]` | Authenticated purchase receipt     |
| `/dashboard/account`            | Profile and password settings      |

## API integration

The frontend uses the backend through same-origin Next.js proxy routes for authenticated requests. Public catalog data is fetched from `NEXT_PUBLIC_API_URL`.

Authenticated customer flows include:

- Registration, login, logout, email verification, and password reset
- One-time Paystack checkout
- Purchase confirmation and entitlement-based downloads
- Purchase notifications with amounts and receipt links
- User-owned receipt details

## Validation

Run the frontend checks before opening a pull request or deploying:

```bash
npm run lint
npm run build
```

The production build validates TypeScript, route generation, and the frontend bundle.
