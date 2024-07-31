import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { findUser, verifyPassword } from '../../../../utils/auth'
import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { User } from 'next-auth'

interface ExtendedUser extends User {
    role: string
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error('No credentials provided')
                }
                const user = await findUser(credentials.email)
                if (!user) {
                    throw new Error('No user found')
                }
                const isValid = await verifyPassword(
                    credentials.password,
                    user.password,
                )
                if (!isValid) {
                    throw new Error('Invalid password')
                }
                return {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    name: user.name,
                }
            },
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.role = user.role
                token.name = user.name
            }
            return token
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token) {
                session.user = {
                    id: token.id,
                    email: token.email,
                    role: token.role,
                    name: token.name,
                } as ExtendedUser
            }
            return session
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 4 * 60 * 60,
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
}
