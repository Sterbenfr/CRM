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
interface siteID {
    code_site: number
    designation_longue: string
    designation_courte: string
    adresse: string
    code_type_site: string
    date_ouverture: Date
    date_fermeture: Date
    numero_telephone: string
    adresse_mail: string
    commentaires: string
}

export default function SitePage({ params }: { params: { siteID: string } }) {
    const [site, setSite] = useState<siteID[]>([])
    const [session, setSession] = useState<ExtendedSession | null>(null)

    useEffect(() => {
        const fetchSite = async () => {
            const sessionData = await getSession()
            setSession(sessionData as ExtendedSession)
            if (!params.siteID) return

            const res = await fetch(`../../api/sites/${params.siteID}`)

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const site: siteID[] = await res.json()
            setSite(site)
        }

        fetchSite()
    }, [params.siteID])
    if (!site || site.length === 0)
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
                <h1 className={style.titre_global}>Détails des sites :</h1>
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
                            <p className={style.titre}>Code du site :</p>
                            <p>
                                {site[0].code_site == null
                                    ? '/'
                                    : site[0].code_site}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Désignation longue :</p>
                            <p>
                                {site[0].designation_longue == (null || '')
                                    ? '/'
                                    : site[0].designation_longue}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Désignation courte :</p>
                            <p>
                                {site[0].designation_courte == (null || '')
                                    ? '/'
                                    : site[0].designation_courte}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Adresse :</p>
                            <p>
                                {site[0].adresse == (null || '')
                                    ? '/'
                                    : site[0].adresse}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Libelle :</p>
                            <p>
                                {site[0].code_type_site == null || ''
                                    ? '/'
                                    : site[0].code_type_site == null}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Date d&apos;ouverture :
                            </p>
                            <p>
                                {site[0].date_ouverture == null
                                    ? '/'
                                    : site[0].date_ouverture
                                          .toString()
                                          .split('T')[0]}
                            </p>
                        </div>
                    </div>
                    <div className={style.col_2}>
                        <div className={style.info}>
                            <p className={style.titre}>Date de fermeture :</p>
                            <p>
                                {site[0].date_fermeture == null
                                    ? '/'
                                    : site[0].date_fermeture
                                          .toString()
                                          .split('T')[0]}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Numero de téléphone :</p>
                            <p>
                                {site[0].numero_telephone == (null || '')
                                    ? '/'
                                    : site[0].numero_telephone}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Adresse mail :</p>
                            <p>
                                {site[0].adresse_mail == (null || '')
                                    ? '/'
                                    : site[0].adresse_mail}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Commentaires :</p>
                            <p>
                                {site[0].commentaires == (null || '')
                                    ? '/'
                                    : site[0].commentaires}
                            </p>
                        </div>
                        <div className={style.info} id='hide1'>
                            <a
                                className={style.linkID}
                                href={`/sites/${params.siteID}/utilisateurs`}
                            >
                                <p className={style.titre}>
                                    {' '}
                                    Utilisateurs du site{' '}
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
