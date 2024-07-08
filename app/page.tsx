// page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '../app/api/auth/[...nextauth]/route'
import Calendar from '../components/Calendar'
import style from '../styles/components.module.css'

export default async function Home() {
    const session = await getServerSession(authOptions)

    console.log(session ? session.user : 'No session')

    return (
        <div className={style.page}>
            <h1 className={style.lg}>CALENDRIER</h1>
            {session && session.user ? (
                <>
                    <p>Connecté avec l&apos;adresse : {session.user.email}</p>
                    <div className={style.calendar}>
                        <Calendar />
                    </div>
                </>
            ) : (
                <p>Vous n&apos;êtes pas connecté</p>
            )}
        </div>
    )
}
