import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { SignInSchema } from "@/lib/zod"
import { compareSync } from "bcrypt-ts"
import Google from "next-auth/providers/google"

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session:{strategy:"jwt"},
  pages:{
    signIn:"/login",
  },
  providers: [
    Google,
    Credentials({
      credentials:{
        email:{},
        password:{}
      },
      authorize:async (credentials) => {
      const validatedFields=SignInSchema.safeParse(credentials);
      if(!validatedFields.success){
        return null;
      }
      
      const {email,password} = validatedFields.data;
      const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        password: true,
        role: true,
        point: true,
        emailVerified: true,
      }
    })
      if(!user || !user.password){
        throw new Error("User not found");
      }
      const passwordMatch = compareSync(password,user.password);
      if(!passwordMatch) return null;
      return user;
      }
    })
  ],
  //callback
  callbacks:{
    authorized({auth,request:{nextUrl}}){
      const isLoggedIn = !!auth?.user;
      const ProtectedRoutes = ["/dashboard","/user"];
      
      if(!isLoggedIn && ProtectedRoutes.includes(nextUrl.pathname)){
        return Response.redirect(new URL("/login",nextUrl));
      }

      if(isLoggedIn && nextUrl.pathname.startsWith("/login")){
        return Response.redirect(new URL("/dashboard",nextUrl));
      }
      return true;
    },
jwt: async ({ token, user }) => {

  // saat login pertama
  if (user) {
    token.id = user.id;
  }

  // ambil data terbaru user dari database
  const dbUser = await prisma.user.findUnique({
    where: {
      id: token.id as string,
    },
  });

  if (dbUser) {
    token.role = dbUser.role;
    token.point = dbUser.point;
  }

  return token;
},
    
session({ session, token }) {

  if (session.user) {

    session.user.id = token.id as string;
    session.user.role = token.role as string;
    session.user.point = token.point as number;

  }

  return session;
},
  }
});