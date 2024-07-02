'use client'
import { useEffect, useState } from 'react'
import style from '../../../styles/components.module.css'

interface SocieteID {
    code_Societe: number
    raison_sociale: string
    nom_commercial: string
    Logo: Blob
    site_Web: string
    Siren: string
    code_type_activite_Societe: string
    commentaires: string
    code_Societe_appartenance: number
    date_arret_activite_Societe: Date
}

export default function SocietePage({
    params,
}: {
    params: { societeID: string }
}) {
    const [Societe, setSociete] = useState<SocieteID[]>([])

    useEffect(() => {
        const fetchSociete = async () => {
            if (!params.societeID) return

            const res = await fetch(
                `http://localhost:3000/api/societe/${params.societeID}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const Societe: SocieteID[] = await res.json()
            setSociete(Societe)
        }

        fetchSociete()
    }, [params.societeID])
    if (!Societe || Societe.length === 0) return <div>Loading...</div>

    return (
        <div className={style.idPage}>
            <div>
                <h1 className={style.titre_global}>Societes</h1>
            </div>

            <div className={style.info_id}>
                <div className={style.col_1}>
                    <div className={style.info}>
                        <p className={style.titre}>code de la societe :</p>
                        <p>
                            {Societe[0].code_Societe == null
                                ? '/'
                                : Societe[0].code_Societe}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Raison sociale :</p>
                        <p>
                            {Societe[0].raison_sociale == null
                                ? '/'
                                : Societe[0].raison_sociale}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Nom commercial :</p>
                        <p>
                            {Societe[0].nom_commercial == null
                                ? '/'
                                : Societe[0].nom_commercial}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Commentaires :</p>
                        <p>
                            {Societe[0].commentaires == null
                                ? '/'
                                : Societe[0].commentaires}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Siren :</p>
                        <p>
                            {Societe[0].Siren == null ? '/' : Societe[0].Siren}
                        </p>
                    </div>
                </div>

                <div className={style.col_2}>
                    <div className={style.info}>
                        <p className={style.titre}>Site web :</p>
                        <p>
                            {Societe[0].site_Web == null
                                ? '/'
                                : Societe[0].site_Web}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Code du type activite societe :
                        </p>
                        <p>
                            {Societe[0].code_type_activite_Societe == null
                                ? '/'
                                : Societe[0].code_type_activite_Societe}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Code de la societe d appartenance :
                        </p>
                        <p>
                            {Societe[0].code_Societe_appartenance == null
                                ? '/'
                                : Societe[0].code_Societe_appartenance}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Date de l arret de l activite de la societe :
                        </p>
                        <p>
                            {Societe[0].date_arret_activite_Societe == null
                                ? '/'
                                : Societe[0].date_arret_activite_Societe
                                      .toString()
                                      .split('T')[0]}
                        </p>
                    </div>
                    <div className={style.info}>
                        <a href={`/societe/${params.societeID}/entite`}>
                            <p className={style.titre}>
                                {' '}
                                Entité(s) appartenant à l&apos;entreprise{' '}
                            </p>
                        </a>
                    </div>
                    <div className={style.info}>
                        <a href={`/societe/${params.societeID}/groupe`}>
                            <p className={style.titre}>
                                {' '}
                                Groupe d&apos;appartenance de l&apos;entreprise{' '}
                            </p>
                        </a>
                    </div>
                    <div className={style.info}>
                        <a
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
    )
}
