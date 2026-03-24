This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Password gate (production)

Protection is **fail-closed**: middleware always runs for matched routes. Without a valid **`portfolio_site_access`** cookie, requests are redirected to **`/login`**. If **`SITE_PASSWORD`** is missing in Vercel, nobody can complete login until you set it — the homepage is still not public.

1. Vercel → your project → **Settings** → **Environment Variables**
2. Add **`SITE_PASSWORD`** (and optionally **`SITE_ACCESS_SECRET`**) for **Production** (and **Preview** if needed)
3. **Redeploy**

Check `GET /api/site-access` — `gateConfigured: true` means login can succeed. Responses from middleware include **`X-Site-Gate-Middleware: 1`** and **`X-Site-Gate-Action`**: `public` | `allow` | `redirect`. Set **`SITE_GATE_DEBUG=1`** in Vercel to log `[site-gate]` lines in the deployment’s **Functions** logs.

### Performance (images & media)

- **Next.js Image** (`next/image`) is used for case-study bleed images, homepage/project cards, about portrait, and shared header GIF (GIFs use `unoptimized` so animation is preserved).
- **Priority loading** is limited to the homepage name GIF, login splash, and the first full-bleed image after each case-study intro (`CsBleedImgAfterIntro`).
- **Photography grid** HTML is post-processed so the first image is `fetchpriority="high"` / `loading="eager"` and the rest use `loading="lazy"` + `decoding="async"`.
- **Spectacles scroll video** uses `preload="metadata"` until the section nears the viewport, then switches to full load (reduces bandwidth before scroll).
- **PS5 inline videos** use `preload="metadata"` (still autoplay when in view).
- **Project card hover videos** use `preload="none"` and `poster` set to the static card image.
- **Custom cursor** listeners use a stable `useEffect` dependency list and `passive: true` on `mousemove`.
- **PS5 page videos** are re-encoded at two resolutions: 1920px (desktop) and 1280px (tablet/mobile). The `AutoPlayVideo` component picks the right source via `matchMedia` and uses `IntersectionObserver` to defer loading until near-viewport.
