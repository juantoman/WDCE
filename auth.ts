import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import { authConfig } from './auth.config';
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM credentials WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PostgresAdapter(pool),
  session: {
    strategy: "jwt",
    maxAge: 60*60,
  },
  providers: [
    Google({
      profile(profile) {
        console.log(profile)
        return {
          id: profile.sub,
          name: `${profile.given_name}`,
          email: profile.email,
          image: profile.picture,
          role: 'user',
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().min(4), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    })
  ],
});
/*
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import { authConfig } from './auth.config';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
});
*/