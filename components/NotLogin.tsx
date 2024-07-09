import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import style from '../styles/components.module.css'
import { Session } from 'next-auth'

export default function NotLogin() {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession()
            setSession(session)
        }

        fetchSession()
    }, [])

    console.log(session ? session.user : 'No session')

    return (
        <div className={style.page}>
            {session && session.user ? (
                <>
                    <p>Connecté avec l&apos;adresse : {session.user.email}</p>
                </>
            ) : (
                <p>Vous n&apos;êtes pas connecté</p>
            )}
        </div>
    )
}
