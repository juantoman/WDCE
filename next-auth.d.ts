import type UserType from "./user"

declare module "next-auth" {
   interface User {
    role?
  }
}