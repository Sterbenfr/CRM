'use client'
import { useEffect, useState } from 'react'
import style from '../../../../../styles/components.module.css'
import Image from 'next/image'

interface EntiteID {
    code_entite: number
    raison_sociale: string
    nom_commercial: string
    logo: Blob
    siret: string
    code_ape: string
    code_rna: string
    code_cee: string
    nom_societe: string
    adresse: string
    telephone: string
    mail: string
    site_internet: string
    commentaires: string
    TE_libelle: string
    TD_libelle: string
    TP_libelle: string
    TC_libelle: string
    commentaires_logistique: string
    presence_quai: string
    pieces_associees: Blob
    cerfa: string
    FC_libelle: string
    date_arret_activite: Date
}

export default function EntitePage({
    params,
}: {
    params: { societeID: string; entiteID: string }
}) {
    const [entite, setEntite] = useState<EntiteID[]>([])

    useEffect(() => {
        const fetchEntite = async () => {
            if (!params.entiteID) return

            const res = await fetch(
                `http://localhost:3000/api/societe/${params.societeID}/entite/${params.entiteID}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const entite: EntiteID[] = await res.json()
            setEntite(entite)
        }

        fetchEntite()
    }, [params.entiteID, params.societeID])
    if (!entite || entite.length === 0)
        return (
            <div className={style.page}>
                <h2 className={style.load}>Chargement...</h2>
            </div>
        )

    return (
        <div className={style.idPage}>
            <div className={style.croixID}>
                <h1 className={style.titre_global}>Details de l&apos;entité</h1>
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
                        <p className={style.titre}>Code de l&apos;entité :</p>
                        <p>
                            {entite[0].code_entite == null
                                ? '/'
                                : entite[0].code_entite}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Raison sociale :</p>
                        <p>
                            {entite[0].raison_sociale == null
                                ? '/'
                                : entite[0].raison_sociale}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Nom commercial :</p>
                        <p>
                            {entite[0].nom_commercial == null
                                ? '/'
                                : entite[0].nom_commercial}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Siret :</p>
                        <p>{entite[0].siret == null ? '/' : entite[0].siret}</p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Code APE :</p>
                        <p>
                            {entite[0].code_ape == null
                                ? '/'
                                : entite[0].code_ape}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Code RNA :</p>
                        <p>
                            {entite[0].code_rna == null
                                ? '/'
                                : entite[0].code_rna}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Code CEE :</p>
                        <p>
                            {entite[0].code_cee == null
                                ? '/'
                                : entite[0].code_cee}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Nom de l&apos;entreprise :
                        </p>
                        <p>
                            {entite[0].nom_societe == null
                                ? '/'
                                : entite[0].nom_societe}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Adresse :</p>
                        <p>
                            {entite[0].adresse == null
                                ? '/'
                                : entite[0].adresse}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Téléphone :</p>
                        <p>
                            {entite[0].telephone == null
                                ? '/'
                                : entite[0].telephone}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Mail :</p>
                        <p>{entite[0].mail == null ? '/' : entite[0].mail}</p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Site internet :</p>
                        <p>
                            {entite[0].site_internet == null
                                ? '/'
                                : entite[0].site_internet}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Commentaires :</p>
                        <p>
                            {entite[0].commentaires == null
                                ? '/'
                                : entite[0].commentaires}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Type d&apos;entité :</p>
                        <p>
                            {entite[0].TE_libelle == null
                                ? '/'
                                : entite[0].TE_libelle}
                        </p>
                    </div>
                </div>
                <div className={style.col_2}>
                    <div className={style.info}>
                        <p className={style.titre}>Type de Don :</p>
                        <p>
                            {entite[0].TD_libelle == null
                                ? '/'
                                : entite[0].TD_libelle}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Type de Prestataire :</p>
                        <p>
                            {entite[0].TP_libelle == null
                                ? '/'
                                : entite[0].TP_libelle}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Type de Compétence(s) :</p>
                        <p>
                            {entite[0].TC_libelle == null
                                ? '/'
                                : entite[0].TC_libelle}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Commentaires logistique :</p>
                        <p>
                            {entite[0].commentaires_logistique == null
                                ? '/'
                                : entite[0].commentaires_logistique}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Présence en quai :</p>
                        <p>
                            {entite[0].presence_quai == null
                                ? '/'
                                : entite[0].presence_quai}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Cerfa :</p>
                        <p>{entite[0].cerfa == null ? '/' : entite[0].cerfa}</p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Fréquence du Cerfa :</p>
                        <p>
                            {entite[0].FC_libelle == null
                                ? '/'
                                : entite[0].FC_libelle}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Date d&apos;arret d&apos;activite :
                        </p>
                        <p>
                            {entite[0].date_arret_activite == null
                                ? '/'
                                : entite[0].date_arret_activite
                                      .toString()
                                      .split('T')[0]}
                        </p>
                    </div>
                    <div className={style.info}>
                        <a
                            className={style.linkID}
                            href={`/societe/${params.societeID}/entite/${params.entiteID}/contact`}
                        >
                            <p className={style.titre}>
                                {' '}
                                Contact(s) de l&apos;entité{' '}
                            </p>
                        </a>
                    </div>
                    <div className={style.info}>
                        <a
                            className={style.linkID}
                            href={`/societe/${params.societeID}/entite/${params.entiteID}/interaction`}
                        >
                            <p className={style.titre}>
                                {' '}
                                Interaction(s) avec l&apos;entité{' '}
                            </p>
                        </a>
                    </div>
                    <div className={style.info}>
                        <a
                            className={style.linkID}
                            href={`/societe/${params.societeID}/entite/${params.entiteID}/entite-site-link`}
                        >
                            <p className={style.titre}>
                                {' '}
                                Utilisateur(s) suivant l&apos;entité{' '}
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
