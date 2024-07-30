import React from 'react'
import Link from 'next/link'
import styles from '../styles/components.module.css'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { usePathname } from 'next/navigation'

interface NavBarProps {
    children?: React.ReactNode
    session: Session | null
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
    const { data: session } = useSession()
    const path = usePathname()
    const firstSegment = path.split('/')[1] || ''
    const firstPathnameSegment = `/${firstSegment}`

    return (
        <div>
            <nav className={styles.navbar}>
                <div className={styles.nav}>
                    <Link href='/' className={styles.img_nav}>
                        <Image
                            src='/IMG/logo-bl.svg'
                            alt='logo'
                            width={180}
                            height={80}
                        />
                    </Link>
                    {session ? (
                        <>
                            <Link
                                href='/'
                                className={`${styles.links} ${
                                    firstPathnameSegment === '/'
                                        ? styles.underline
                                        : ''
                                }`}
                            >
                                Calendrier
                            </Link>
                            <Link
                                href='/dons'
                                className={`${styles.links} ${
                                    firstPathnameSegment === '/dons'
                                        ? styles.underline
                                        : ''
                                }`}
                            >
                                Dons
                            </Link>
                            <Link
                                href='/societe'
                                className={`${styles.links} ${
                                    firstPathnameSegment === '/societe'
                                        ? styles.underline
                                        : ''
                                }`}
                            >
                                Entreprise
                            </Link>
                            <Link
                                href='/sites'
                                className={`${styles.links} ${
                                    firstPathnameSegment === '/sites'
                                        ? styles.underline
                                        : ''
                                }`}
                            >
                                Sites RC
                            </Link>
                            <Link
                                href='/prestataire'
                                className={`${styles.links} ${
                                    firstPathnameSegment === '/prestataire'
                                        ? styles.underline
                                        : ''
                                }`}
                            >
                                Prestataires
                            </Link>
                            <Link
                                href='/utilisateurs'
                                className={`${styles.links} ${
                                    firstPathnameSegment === '/utilisateurs'
                                        ? styles.underline
                                        : ''
                                }`}
                            >
                                Utilisateurs
                            </Link>{' '}
                        </>
                    ) : null}

                    {session ? (
                        <>
                            <Link
                                href='/login'
                                className={`${styles.links} ${
                                    firstPathnameSegment === '/login'
                                        ? styles.underline
                                        : ''
                                }`}
                            >
                                Compte
                            </Link>
                        </>
                    ) : (
                        <Link
                            href='/login'
                            className={`${styles.links} ${
                                firstPathnameSegment === '/login'
                                    ? styles.underline
                                    : ''
                            }`}
                        >
                            Connexion
                        </Link>
                    )}
                </div>
                {session ? (
                    <Link
                        href='/documentation'
                        className={`${styles.doc} ${
                            firstPathnameSegment === '/documentation'
                                ? styles.circle
                                : ''
                        }`}
                    >
                        ?
                    </Link>
                ) : (
                    ''
                )}
            </nav>
            {children}
        </div>
    )
}

export default NavBar
