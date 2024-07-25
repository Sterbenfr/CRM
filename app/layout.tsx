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
