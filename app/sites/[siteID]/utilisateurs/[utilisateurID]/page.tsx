'use client'
import { useEffect, useState } from 'react'
import style from '../../../../../styles/components.module.css'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'

interface ExtendedSession extends Session {
    user: {
        name?: string | null
        email?: string | null
        image?: string | null
        role?: string // Add the role property
        id?: string
    }
}

interface UtilisateurID {
    code_utilisateur: number
    civilite: string
    nom: string
    prenom: string
    tel_perso: string
    mail: string
    commentaires: string
    code_type_utilisateur: number
}

export default function UtilisateurPage({
    params,
}: {
    params: { siteID: string; utilisateurID: string }
}) {
    const [Utilisateur, setUtilisateur] = useState<UtilisateurID[]>([])
    const [session, setSession] = useState<ExtendedSession | null>(null)

    useEffect(() => {
        const fetchUtilisateur = async () => {
            const sessionData = await getSession()
            setSession(sessionData as ExtendedSession)
            if (!params.utilisateurID) return

            const res = await fetch(
                `../../../../api/sites/${params.siteID}/utilisateurs/${params.utilisateurID}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const Utilisateur: UtilisateurID[] = await res.json()
            setUtilisateur(Utilisateur)
        }

        fetchUtilisateur()
    }, [params.utilisateurID, params.siteID])
    console.log(Utilisateur)
    if (!Utilisateur || Utilisateur.length === 0)
        return (
            <div className={style.page}>
                <h2 className={style.load}>Chargement...</h2>
            </div>
        )

    const Print = () => {
        const printContents = document.getElementById('printablediv')!.innerHTML
        const originalContents = document.body.innerHTML

        const applyPrintStyles = () => {
            document.body.innerHTML = printContents
            document.body.style.margin = '0'
            document.body.style.padding = '0'

            const allElements = document.body.getElementsByTagName('*')
            for (let i = 0; i < allElements.length; i++) {
                const element = allElements[i] as HTMLElement
                element.style.margin = '10px'
                element.style.fontSize = '12px'
                element.style.padding = '0'
                element.style.fontFamily = 'Arial'
                element.style.lineHeight = '1'
                element.style.letterSpacing = '0'
                element.style.wordSpacing = '0'
                element.style.borderLeft = 'none'
            }
        }

        const hideElements = () => {
            const element = document.getElementById('hide1')
            if (element) {
                element.style.display = 'none'
            }
            const element2 = document.getElementById('hide2')
            if (element2) {
                element2.style.display = 'none'
            }
            const element3 = document.getElementById('hide3')
            if (element3) {
                element3.style.display = 'none'
            }
        }
        applyPrintStyles()
        hideElements()
        window.print()
        document.body.innerHTML = originalContents
        window.location.reload()
    }
    return (
        <div className={style.idPage}>
            <div className={style.croixID}>
                <h1 className={style.titre_global}>Utilisateurs</h1>
                <a href='javascript:history.go(-1)' className={style.btnC}>
                    <Image
                        className={style.CRid}
                        src='/IMG/Return.png'
                        height={30}
                        width={30}
                        alt='Fermer la fenêtre'
                    />
                </a>
            </div>
            {session &&
                session.user &&
                session.user.role === ('AD' || 'RR' || 'PR' || 'RC') && (
                    <div>
                        <button className={style.btnModif} onClick={Print}>
                            Imprimer
                        </button>
                    </div>
                )}
            <div id='printablediv'>
                <div className={style.info_id}>
                    <div className={style.col_1}>
                        <div className={style.info}>
                            <p className={style.titre}>
                                Code de l&apos;utilisateur :
                            </p>
                            <p>
                                {Utilisateur[0].code_utilisateur == null
                                    ? '/'
                                    : Utilisateur[0].code_utilisateur}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Civilite :</p>
                            <p>
                                {Utilisateur[0].civilite == (null || '')
                                    ? '/'
                                    : Utilisateur[0].civilite}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Nom :</p>
                            <p>
                                {Utilisateur[0].nom == (null || '')
                                    ? '/'
                                    : Utilisateur[0].nom}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Prénom :</p>
                            <p>
                                {Utilisateur[0].prenom == (null || '')
                                    ? '/'
                                    : Utilisateur[0].prenom}
                            </p>
                        </div>
                    </div>

                    <div className={style.col_2}>
                        <div className={style.info}>
                            <p className={style.titre}>Téléphone personel :</p>
                            <p>
                                {Utilisateur[0].tel_perso == (null || '')
                                    ? '/'
                                    : Utilisateur[0].tel_perso}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Mail :</p>
                            <p>
                                {Utilisateur[0].mail == (null || '')
                                    ? '/'
                                    : Utilisateur[0].mail}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Commentaires :</p>
                            <p>
                                {Utilisateur[0].commentaires == (null || '')
                                    ? '/'
                                    : Utilisateur[0].commentaires}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Code utilisateur :</p>
                            <p>
                                {Utilisateur[0].code_type_utilisateur == null
                                    ? '/'
                                    : Utilisateur[0].code_type_utilisateur}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
