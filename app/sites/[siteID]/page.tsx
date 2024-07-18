'use client'
import { useEffect, useState } from 'react'
import style from '../../../styles/components.module.css'
import Image from 'next/image'

interface siteID {
    code_site: number
    designation_longue: string
    designation_courte: string
    adresse: string
    libelle: string
    date_ouverture: Date
    date_fermeture: Date
    numero_telephone: string
    adresse_mail: string
    commentaires: string
}

export default function SitePage({ params }: { params: { siteID: string } }) {
    const [site, setSite] = useState<siteID[]>([])

    useEffect(() => {
        const fetchSite = async () => {
            if (!params.siteID) return

            const res = await fetch(
                `http://localhost:3000/api/sites/${params.siteID}`,
            )

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
                            {site[0].designation_longue == null
                                ? '/'
                                : site[0].designation_longue}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Désignation courte :</p>
                        <p>
                            {site[0].designation_courte == null
                                ? '/'
                                : site[0].designation_courte}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Adresse :</p>
                        <p>{site[0].adresse == null ? '/' : site[0].adresse}</p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Libelle :</p>
                        <p>{site[0].libelle == null ? '/' : site[0].libelle}</p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Date d&apos;ouverture :</p>
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
                            {site[0].numero_telephone == null
                                ? '/'
                                : site[0].numero_telephone}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Adresse mail :</p>
                        <p>
                            {site[0].adresse_mail == null
                                ? '/'
                                : site[0].adresse_mail}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Commentaires :</p>
                        <p>
                            {site[0].commentaires == null
                                ? '/'
                                : site[0].commentaires}
                        </p>
                    </div>
                    <div className={style.info}>
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
    )
}
