// page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '../app/api/auth/[...nextauth]/route'
import Calendar from '@/components/Calendar'
import style from '../styles/components.module.css'

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        session && (
            <div className={style.page}>
                <h1 className={style.lg}>CALENDRIER</h1>
                <div className={style.calendar}>
                    <Calendar />
                </div>
            </div>
        )
    )
}
