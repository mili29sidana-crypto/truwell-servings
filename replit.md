# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Project: Truwell Brand Website

A full-stack product website for **Truwell** — a youth-founded Indian nutrition startup making nutraceuticals fun and snackable.

### Brand
- **Colours**: #f3703c (coral orange), #5d0703 (deep dark red), #f4f3e6 (cream off-white)
- **Tagline**: "stay well, true well."
- **Instagram**: @truwell.in

### Products
1. **Coco Gut** — Truwell's Fibre Chocolate. 25g bar, 7.3g fibre, 3g sugar. Available now.
2. **B-Juvenate** — Multivitamin B-complex sachet (B6, B9, B12 + Magnesium Citrate). Coming soon.

### Features
- Scrollable single-page site with sticky nav
- Product showcase (Coco Gut order form, B-Juvenate waitlist)
- Sections: Hero, Who We Are, What We Do, Products, Our Journey, The Science, Footer
- Instagram link in footer

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/truwell-site)
- **API framework**: Express 5 (artifacts/api-server)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Database Schema

Tables:
- `products` — product catalogue (Coco Gut, B-Juvenate)
- `orders` — customer orders for in-stock products
- `waitlist` — email signups for coming-soon products

## API Routes

- `GET /api/products` — list products
- `POST /api/orders` — place an order
- `POST /api/waitlist` — join product waitlist

## Notes on Codegen

After running `pnpm --filter @workspace/api-spec run codegen`, orval overwrites `lib/api-zod/src/index.ts` with extra exports that cause TS errors. Fix with:
```
echo 'export * from "./generated/api";' > lib/api-zod/src/index.ts
```

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Pending Integrations (not yet connected)

- **Payments**: Stripe (UPI/Google Pay support) — user dismissed the Replit integration. Either re-propose `connector:ccfg_stripe_01K611P4YQR0SZM11XFRQJC44Y` or ask user for Stripe secret key to store as `STRIPE_SECRET_KEY`.
- **Email**: Resend (transactional emails for orders + waitlist) — user dismissed the Replit integration. Either re-propose `connector:ccfg_resend_01K69QKYK789WN202XSE3QS17V` or ask user for Resend API key to store as `RESEND_API_KEY`. Alternative: Razorpay for India-first payments (supports UPI, PhonePe, Google Pay natively).
