// page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '../app/api/auth/[...nextauth]/route'
import Head from 'next/head'
import Calendar from '../components/Calendar'

export default async function Home() {
    const session = await getServerSession(authOptions)

    console.log(session ? session.user : 'No session')

    return (
        <div>
            <Head>
                <title>Calendrier</title>
                <meta name='description' content='Calendrier des dons' />
            </Head>
            <main style={{ paddingTop: '10rem' }}>
                <h1>CALENDRIER</h1>
                {session && session.user ? (
                    <>
                        <p>
                            Connecté avec l&apos;adresse : {session.user.email}
                        </p>
                        <div style={{ width: '50%', margin: '0 auto' }}>
                            <Calendar />
                        </div>
                    </>
                ) : (
                    <p>Vous n&apos;êtes pas connecté</p>
                )}
            </main>
        </div>
    )
}
