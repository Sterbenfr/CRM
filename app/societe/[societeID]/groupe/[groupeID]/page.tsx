'use client'
import { useEffect, useState } from 'react'
import style from '../../../../../styles/components.module.css'
import Image from 'next/image'

interface GroupeID {
    code_groupe: number
    nom_du_Groupe: string
    Logo: Blob
    site_Web: string
    commentaires: string
    date_arret_activite_du_Groupe: Date
}

export default function GroupePage({
    params,
}: {
    params: { societeID: string; groupeID: string }
}) {
    const [Groupe, setGroupe] = useState<GroupeID[]>([])

    useEffect(() => {
        const fetchGroupe = async () => {
            if (!params.groupeID) return

            const res = await fetch(
                `http://localhost:3000/api/societe/${params.societeID}/groupe/${params.groupeID}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const Groupe: GroupeID[] = await res.json()
            setGroupe(Groupe)
        }

        fetchGroupe()
    }, [params.groupeID, params.societeID])
    if (!Groupe || Groupe.length === 0)
        return (
            <div className={style.page}>
                <h2 className={style.load}>Chargement...</h2>
            </div>
        )

    return (
        <div className={style.idPage}>
            <div className={style.croixID}>
                <h1 className={style.titre_global}>Groupes</h1>
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
                        <p className={style.titre}>Code du groupe :</p>
                        <p>
                            {Groupe[0].code_groupe == null
                                ? '/'
                                : Groupe[0].code_groupe}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Nom du groupe :</p>
                        <p>
                            {Groupe[0].nom_du_Groupe == null
                                ? '/'
                                : Groupe[0].nom_du_Groupe}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Site web :</p>
                        <p>
                            {Groupe[0].site_Web == null
                                ? '/'
                                : Groupe[0].site_Web}
                        </p>
                    </div>
                </div>

                <div className={style.col_2}>
                    <div className={style.info}>
                        <p className={style.titre}>Commentaires :</p>
                        <p>
                            {Groupe[0].commentaires == null
                                ? '/'
                                : Groupe[0].commentaires}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Date d&apos;arrêt d&apos;activité du groupe :
                        </p>
                        <p>
                            {Groupe[0].date_arret_activite_du_Groupe == null
                                ? '/'
                                : Groupe[0].date_arret_activite_du_Groupe
                                      .toString()
                                      .split('T')[0]}
                        </p>
                    </div>
                    <div className={style.info}>
                        <a
                            href={`/societe/${params.societeID}/groupe/${params.groupeID}/groupe-site-link`}
                        >
                            <p className={style.titre}>
                                {' '}
                                Utilisateur(s) suivant le groupe{' '}
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
