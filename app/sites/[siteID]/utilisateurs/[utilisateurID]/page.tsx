'use client'
import { useEffect, useState } from 'react'
import style from '../../../../../styles/components.module.css'
import Image from 'next/image'

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

    useEffect(() => {
        const fetchUtilisateur = async () => {
            if (!params.utilisateurID) return

            const res = await fetch(
                `http://localhost:3000/api/sites/${params.siteID}/utilisateurs/${params.utilisateurID}`,
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
                            {Utilisateur[0].civilite == null
                                ? '/'
                                : Utilisateur[0].civilite}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Nom :</p>
                        <p>
                            {Utilisateur[0].nom == null
                                ? '/'
                                : Utilisateur[0].nom}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Prénom :</p>
                        <p>
                            {Utilisateur[0].prenom == null
                                ? '/'
                                : Utilisateur[0].prenom}
                        </p>
                    </div>
                </div>

                <div className={style.col_2}>
                    <div className={style.info}>
                        <p className={style.titre}>Téléphone personel :</p>
                        <p>
                            {Utilisateur[0].tel_perso == null
                                ? '/'
                                : Utilisateur[0].tel_perso}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Mail :</p>
                        <p>
                            {Utilisateur[0].mail == null
                                ? '/'
                                : Utilisateur[0].mail}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Commentaires :</p>
                        <p>
                            {Utilisateur[0].commentaires == null
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
    )
}
