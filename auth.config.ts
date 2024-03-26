// import type { NextAuthConfig } from 'next-auth';

// export const authConfig = {
//   pages: {
//     signIn: '/login',
//   },
//   providers: [
//     // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
//     // while this file is also used in non-Node.js environments
//   ],
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       Response.redirect(new URL('/dashboard', nextUrl));
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/dashboard', nextUrl));
//       }
//       return true;
//     },
//     async signIn({ user, account, profile, email, credentials }) {
//       const isAllowedToSignIn = true
//       if (isAllowedToSignIn) {
//         return true
//       } else {
//         // Return false to display a default error message
//         return false
//         // Or you can return a URL to redirect to:
//         // return '/unauthorized'
//       }
//     },
//     async jwt({ token, user }) {
//       if (user) token.role = user.role;
//       return token;
//     },
//     async session({ session, token }) {
//       console.log(session)
//       if (session?.user) session.user.role = token.role;
//       return session;
//     },
//   },
// } satisfies NextAuthConfig;

import { i18nRouter } from 'next-i18n-router'
import type { NextAuthConfig } from 'next-auth'
import { i18n } from "@/i18n-config";

const getLocaleFromPath = (pathname: string) => {
  const localeFromPathRegex = new RegExp(`^/(${i18n.locales.join('|')})?`)
  const localeFromPath = pathname.match(localeFromPathRegex)?.[1]
  return { locale: localeFromPath, path: localeFromPath ? `/${localeFromPath}` : '' }
}

const checkCurrentRoute = (pathname: string, locale?: string) => {
  const checkPathnameRegex = (pattern: string | RegExp) => {
    const rootRegex = new RegExp(pattern)
    return Boolean(pathname.match(rootRegex))
  }

  return {
    root: checkPathnameRegex(`^/(${locale})?$`),
    dashboard: checkPathnameRegex(`^(/${locale})?/dashboard.*`),
    teacher: checkPathnameRegex(`^(/${locale})?/teacher.*`),
    student: checkPathnameRegex(`^(/${locale})?/student.*`),
    login: checkPathnameRegex(`^(/${locale})?/login.*`),
    norole: checkPathnameRegex(`^(/${locale})?/norole.*`),
  }
}


type SessionProps = {
  session: any;
  token: any;
};

export const authConfig = {
  pages: {
    signIn: '/login'
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request }) {
      const { nextUrl } = request

      const locale = getLocaleFromPath(nextUrl.pathname)
      
      const dashboardUrl = new URL(`${locale.path}/dashboard`, nextUrl)
      const teacherUrl = new URL(`${locale.path}/teacher`, nextUrl)
      const studentUrl = new URL(`${locale.path}/student`, nextUrl)
      const noroleUrl = new URL(`${locale.path}/norole`, nextUrl)


      const { root: isOnRoot, dashboard: isOnDashboard, teacher: isOnTeacher, student: isOnStudent, login: isOnLogin, norole: isOnNoRole } = checkCurrentRoute(nextUrl.pathname, locale.locale)

      const isLoggedIn = !!auth?.user

      console.log("authorized")
      
      const role = auth?.user?.role
      console.log(auth)

      if ( role === "admin" ) {

        if ((isLoggedIn && !isOnDashboard )) {
          // If on root or logged in but not on dashboard, redirect to dashboard
            return Response.redirect(dashboardUrl)
        }

        if ((isOnRoot && !isLoggedIn) || (isOnLogin && !isLoggedIn) || (isOnDashboard && isLoggedIn)) {
          // Not logged in but on login OR logged in and on dashboard => allow access
          return i18nRouter(request, i18n)
        }
        
      }

      if ( role === "teacher" ) {

        if ((isLoggedIn && !isOnTeacher )) {
          // If on root or logged in but not on dashboard, redirect to dashboard
            return Response.redirect(teacherUrl)
        }

        if ((isOnRoot && !isLoggedIn) || (isOnLogin && !isLoggedIn) || (isOnTeacher && isLoggedIn)) {
          // Not logged in but on login OR logged in and on dashboard => allow access
          return i18nRouter(request, i18n)
        }
        
      }

      if ( role === "student" ) {

        if ((isLoggedIn && !isOnStudent )) {
          // If on root or logged in but not on dashboard, redirect to dashboard
            return Response.redirect(studentUrl)
        }

        if ((isOnRoot && !isLoggedIn) || (isOnLogin && !isLoggedIn) || (isOnStudent && isLoggedIn)) {
          // Not logged in but on login OR logged in and on dashboard => allow access
          return i18nRouter(request, i18n)
        }
        
      }

      if ( role === "user" || role === undefined ) {

        if ((isLoggedIn && !isOnNoRole )) {
          // If on root or logged in but not on dashboard, redirect to dashboard
            return Response.redirect(noroleUrl)
        }

        if ((isOnRoot && !isLoggedIn) || (isOnLogin && !isLoggedIn) || (isOnNoRole && isLoggedIn)) {
          // Not logged in but on login OR logged in and on dashboard => allow access
          return i18nRouter(request, i18n)
        }
        
      }

      // Not logged in and not on login or dashboard => redirect to login page
      return false
    },
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, user, trigger, session }) {
      console.log("jwt")
      if (trigger === "update") {
        token.role = session.user.role
      } else {
        if (user) token.role = user.role;
      }
      //
      console.log(session)
      return token;
    },
    // async jwt({ token, trigger, session }) {
    //   if (trigger === "update") token.role = session.user.role
    //   return token
    // },
    // async jwt({ token, user, trigger, session }) {
    //   console.log("jwt")
    //   console.log(session)
    //   if (session) token.role = session.role;
    //   console.log(token)
    //   if (trigger === "update") {
    //     return { ...token, ...session.user };
    //   }
    //   return { ...token, ...user };
    // },
    async session({ session, token }: SessionProps) {
      console.log("session")
      if (session?.user) { 
        session.user.role = token.role;
        session.user.id = token.sub;
      }
      console.log(session)
      return session;
    },
  }
} satisfies NextAuthConfig

