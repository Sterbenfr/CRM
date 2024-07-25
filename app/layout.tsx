'use client'
import './globals.css'
import { Mukta } from 'next/font/google'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import NotLogin from '../components/NotLogin'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Session } from 'next-auth'
import style from '../styles/components.module.css'
interface RootLayoutProps {
    children: ReactNode
    session: Session
}

const inter = Mukta({ weight: '500', subsets: ['latin'] })

export default function RootLayout({ children, session }: RootLayoutProps) {
    return (
        <html className={inter.className} lang='en'>
            <head>
                <title>CRM</title>
                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <meta
                    httpEquiv='Content-Security-Policy'
                    content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self'; connect-src 'self'; font-src 'self';object-src 'none';"
                />
                <meta httpEquiv='referrer' content='origin' />
                <meta
                    httpEquiv='Cross-Origin-Opener-Policy'
                    content='same-origin'
                />
                <meta
                    httpEquiv='Permissions-Policy'
                    content='fullscreen=(self)'
                />
                <meta
                    httpEquiv='Cross-Origin-Resource-Policy'
                    content='same-origin'
                />
                <meta
                    httpEquiv='Cross-Origin-Embedder-Policy'
                    content='require-corp'
                />
                <meta
                    httpEquiv='Strict-Transport-Security'
                    content='max-age=31536000; includeSubDomains'
                />
                <meta httpEquiv='X-Content-Type-Options' content='nosniff' />
                <meta
                    httpEquiv='Clear-Site-Data'
                    content='"storage","cookies"' //peut causer une déconnexion ???
                />
                <meta
                    httpEquiv='X-Permitted-Cross-Domain-Policies'
                    content='by-content-type'
                />
                <link rel='icon' href='/favicon.ico' />
            </head>
            <body>
                <div className={style.PageLay}>
                    <SessionProvider session={session}>
                        <NavBar session={session}>{children}</NavBar>
                        <NotLogin></NotLogin>
                    </SessionProvider>
                </div>
                <Footer />
            </body>
        </html>
    )
}
