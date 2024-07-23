'use client'
import { useEffect, useState } from 'react'
import style from '../../../styles/components.module.css'
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

interface SocieteID {
    code_Societe: number
    raison_sociale: string
    nom_commercial: string
    Logo: Blob
    site_Web: string
    Siren: string
    code_type_activite_Societe: string
    commentaires: string
    code_Groupe_appartenance: number
    date_arret_activite_Societe: Date
}

export default function SocietePage({
    params,
}: {
    params: { societeID: string }
}) {
    const [Societe, setSociete] = useState<SocieteID[]>([])
    const [session, setSession] = useState<ExtendedSession | null>(null)

    useEffect(() => {
        const fetchSociete = async () => {
            const sessionData = await getSession()
            setSession(sessionData as ExtendedSession)
            if (!params.societeID) return

            const res = await fetch(`../../api/societe/${params.societeID}`)

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const Societe: SocieteID[] = await res.json()
            setSociete(Societe)
        }

        fetchSociete()
    }, [params.societeID])
    if (!Societe || Societe.length === 0)
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
                <h1 className={style.titre_global}>
                    Détails de l&apos;entreprise
                </h1>
                <a href='javascript:history.go(-1)' className={style.btnC}>
                    <Image
                        className={style.CR}
                        src='/IMG/return.svg'
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
                                Code de l&apos;entreprise :
                            </p>
                            <p>
                                {Societe[0].code_Societe == null
                                    ? '/'
                                    : Societe[0].code_Societe}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Raison sociale :</p>
                            <p>
                                {Societe[0].raison_sociale == (null || '')
                                    ? '/'
                                    : Societe[0].raison_sociale}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Nom commercial :</p>
                            <p>
                                {Societe[0].nom_commercial == (null || '')
                                    ? '/'
                                    : Societe[0].nom_commercial}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Commentaires :</p>
                            <p>
                                {Societe[0].commentaires == (null || '')
                                    ? '/'
                                    : Societe[0].commentaires}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Siren :</p>
                            <p>
                                {Societe[0].Siren == (null || '')
                                    ? '/'
                                    : Societe[0].Siren}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Site web :</p>
                            <p>
                                {Societe[0].site_Web == (null || '')
                                    ? '/'
                                    : Societe[0].site_Web}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Code du type d&apos;activite de
                                l&apos;entreprise :
                            </p>
                            <p>
                                {Societe[0].code_type_activite_Societe ==
                                (null || '')
                                    ? '/'
                                    : Societe[0].code_type_activite_Societe}
                            </p>
                        </div>
                    </div>

                    <div className={style.col_2}>
                        <div className={style.info}>
                            <p className={style.titre}>
                                Code de l&apos;entreprise d&apos;appartenance :
                            </p>
                            <p>
                                {Societe[0].code_Groupe_appartenance == null
                                    ? '/'
                                    : Societe[0].code_Groupe_appartenance}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Date d&apos;arrêt d&apos;activité de
                                l&apos;entreprise :
                            </p>
                            <p>
                                {Societe[0].date_arret_activite_Societe == null
                                    ? '/'
                                    : Societe[0].date_arret_activite_Societe
                                          .toString()
                                          .split('T')[0]}
                            </p>
                        </div>
                        <div className={style.info} id='hide1'>
                            <a
                                className={style.linkID}
                                href={`/societe/${params.societeID}/entite`}
                            >
                                <p className={style.titre}>
                                    {' '}
                                    Entité(s) appartenant à l&apos;entreprise{' '}
                                </p>
                            </a>
                        </div>
                        <div className={style.info} id='hide2'>
                            <a
                                className={style.linkID}
                                href={`/societe/${params.societeID}/groupe`}
                            >
                                <p className={style.titre}>
                                    {' '}
                                    Groupe d&apos;appartenance de
                                    l&apos;entreprise{' '}
                                </p>
                            </a>
                        </div>
                        <div className={style.info} id='hide3'>
                            <a
                                className={style.linkID}
                                href={`/societe/${params.societeID}/societe-site-link`}
                            >
                                <p className={style.titre}>
                                    {' '}
                                    Utilisateur(s) suivant l&apos;entreprise{' '}
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
