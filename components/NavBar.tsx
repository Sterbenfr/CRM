import React from 'react'
import Link from 'next/link'
import styles from '../styles/components.module.css'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'

interface NavBarProps {
    children?: React.ReactNode
    session: Session | null
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
    const { data: session } = useSession()

    return (
        <div>
            <nav className={styles.navbar}>
                <Link href='/' className={styles.img_nav}>
                    <Image
                        src='/IMG/logo_bl.png'
                        alt='logo'
                        width={180}
                        height={80}
                    />
                </Link>
                <Link href='/' className={styles.links}>
                    Calendrier
                </Link>
                <Link href='/dons' className={styles.links}>
                    Dons
                </Link>
                <Link href='/societe' className={styles.links}>
                    Entreprise
                </Link>
                <Link href='/sites' className={styles.links}>
                    Sites
                </Link>
                <Link href='/prestataire' className={styles.links}>
                    Prestataires
                </Link>
                {session ? (
                    <>
                        <Link href='/login' className={styles.links}>
                            Compte
                        </Link>
                    </>
                ) : (
                    <Link href='/login' className={styles.links}>
                        Connexion
                    </Link>
                )}
            </nav>
            {children}
        </div>
    )
}

export default NavBar
