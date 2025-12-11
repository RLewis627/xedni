
# Xedni ("zed-nee")

Web app for testing common or custom trading strategies on pre-generated, fake stock data.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

[![Vercel Deploy](https://deploy-badge.vercel.app/vercel/xedni-sandbox?name=xedni)](https://xedni-sandbox.vercel.app/)

![Vercel Deploy](https://deploy-badge.vercel.app/vercel/xedni-api?root=health&name=xedni-api)


## Stack

**Client:** React, Next.js, Typescript, TailwindCSS

**Server:** FastAPI (Python), Uvicorn

**Database:** Supabase (PostgreSQL)


## Features

[![Board Status](https://dev.azure.com/rachel-dev-projects/2c2f020b-7dd6-4c14-8a5d-cb5e676769dd/3dbf211b-23b0-4e2c-b6e0-f96b49bfdf9f/_apis/work/boardbadge/56b84713-8bf1-45ce-9543-1b3eadfd5fce?columnOptions=1)](https://dev.azure.com/rachel-dev-projects/2c2f020b-7dd6-4c14-8a5d-cb5e676769dd/_boards/board/t/3dbf211b-23b0-4e2c-b6e0-f96b49bfdf9f/Features/)

| Feature             | Sprint   | Dev  | Prod |
| :----------------   | :------- | :--: | :--: |
| Prices Candle Chart | Sprint 1 | 🟡  | ✔️  |
| Prices Table Chart  | Sprint 2 | ❌  | ❌  |
| Portfolio Creator   | Sprint 2 | ❌  | ❌  |
| Backtesting Setup   | Sprint 3 | ❌  | ❌  |


## Run Locally

Clone the project

```bash
  git clone https://github.com/RLewis627/xedni.git
```

Go to the project directory

```bash
  cd xedni
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
