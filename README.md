This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started.

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

## Documents and AI assistant

The documents pages at `/fr/documents`, `/en/documents`, and `/nl/documents` use the
versioned insurance catalog in `src/data/documents.json`. Each document can be opened
directly or analyzed through `/api/document-chat`.

Configure these variables in `.env.local` for development and in the Railway service's
**Variables** tab for deployment:

```dotenv
OPENROUTER_API_KEY=your-active-openrouter-api-key
OPENROUTER_MODEL=google/gemma-4-26b-a4b-it:free
```

`OPENROUTER_API_KEY` must belong to an active OpenRouter account. `OPENROUTER_MODEL`
is optional and defaults to `google/gemma-4-26b-a4b-it:free`; use a complete OpenRouter model ID
that is available under the account's privacy and data-policy settings. Some older
insurer document links may have expired or reject automated access independently of
the AI configuration.

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
# bdts-website
