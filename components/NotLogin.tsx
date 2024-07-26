import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import style from '../styles/components.module.css'
import { Session } from 'next-auth'

export default function NotLogin() {
    const [session, setSession] = useState<Session | null>(null)
    const [isTimeoutReached, setIsTimeoutReached] = useState(false)

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession()
            setSession(session)
        }

        fetchSession()
        const timer = setTimeout(() => {
            setIsTimeoutReached(true)
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className={style.connect}>
            {isTimeoutReached ? (
                session && session.user ? (
                    <>
                        <p className={style.conect}>
                            Connecté avec l&apos;adresse : {session.user.email}
                        </p>
                    </>
                ) : (
                    <p className={style.notLog}>
                        Vous n&apos;êtes pas connecté
                    </p>
                )
            ) : null}
        </div>
    )
}
