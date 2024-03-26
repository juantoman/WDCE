## WDCE Nextjs 14 

We are starting a new project from the Next.js App Router Course - Final (more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website)

-Example for OAuth with Auth.js  
https://github.com/vercel/next.js/tree/canary/examples/auth

-If you want to have credentials and OAuth, comment line in app/api/auth/[...nextauth]/route.ts
//export const runtime = "edge";

-Adapter for postgreSQL in Vercel
https://authjs.dev/reference/adapter/pg

Create tables.

auth.ts

...
import PostgresAdapter from "@auth/pg-adapter"
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})
...
NextAuth({
  ...authConfig,
  adapter: PostgresAdapter(pool),
  session: { strategy: "jwt" },
  providers: [
...

-Role Based Access Control
https://authjs.dev/guides/basics/role-based-access-control

Turn information about the session
http://localhost:3000/api/auth/session

Create table user in PostgrSQL:

CREATE TABLE users
(
  id SERIAL,
  name VARCHAR(255),
  email VARCHAR(255),
  "emailVerified" TIMESTAMPTZ,
  image TEXT,
  role TEXT DEFAULT 'user',

  PRIMARY KEY (id)
);

Create ./next-auth.d.ts

import type UserType from "./user"

declare module "next-auth" {
   interface User {
    role?
  }
}

Change package.json

"next-auth": "5.0.0-beta.4",

-Internationalization
https://stackoverflow.com/a/77884856
https://github.com/vercel/next.js/tree/canary/examples/app-dir-i18n-routing

-Dark Mode
https://www.linkedin.com/pulse/implement-dark-mode-tailwindcss-nextjs13-app-5-simple-lucas-los-arcos
https://github.com/pacocoursey/next-themes

-Multiple Themes
https://darrenwhite.dev/blog/nextjs-tailwindcss-theming
https://dev.to/ultroneoustech/creating-multiple-themes-in-tailwind-css-and-nextjs-2e98
https://github.com/L-Blondy/tw-colors

-SWR real-time and Route Handlers
API 
https://nextjs.org/docs/app/building-your-application/routing/route-handlers
SWR
https://swr.vercel.app/es-ES/docs/getting-started
Fetcher in Typescript
https://github.com/vercel/swr/discussions/939#discussioncomment-7944890

-Load remote images
https://nextjs.org/docs/app/api-reference/components/image#remotepatterns

-Change Role
https://github.com/nextauthjs/next-auth/tree/main/apps/examples/nextjs/app/client-example
https://youtu.be/Rs8018RO5YQ?si=Q0Yg1y9NPrpqO_jG
