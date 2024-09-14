import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import github from "next-auth/providers/github";
import { NextResponse } from "next/server";
import { prisma } from "./prisma/db";
export const authConfig = {
	adapter: PrismaAdapter(prisma),
	providers: [
		github({
			profile(profile) {
				return {
					role: profile.role ?? "user",
					id: String(profile.id),
					email: profile.email,
					image: profile.avatar_url,
					name: profile.name,
				};
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
	session: {
		strategy: "jwt",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnHome = nextUrl.pathname.startsWith("/");
			if (isOnHome && !isLoggedIn) {
				if (isLoggedIn) return true;
				return false;
			} else if (isLoggedIn && nextUrl.pathname === "/login") {
				return NextResponse.redirect(new URL("/", nextUrl));
			}
			return true;
		},
		jwt({ token, user }) {
			//@ts-ignore
			if (user) token.role = user.role;
			return token;
		},
		session({ session, token }) {
			//@ts-ignore
			session.user.role = token.role;
			return session;
		},
	},
} satisfies NextAuthConfig;
