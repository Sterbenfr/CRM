'use client'
import { useEffect, useState } from 'react'
import style from '../../../../../styles/components.module.css'

interface UtilisateurID {
    code_utilisateur: number
    civilite: string
    nom: string
    prenom: string
    tel_perso: string
    mail_restos_du_coeur: string
    commentaires: string
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
    if (!Utilisateur || Utilisateur.length === 0) return <div>Loading...</div>

    return (
        <div className={style.idPage}>
            <div>
                <h1 className={style.titre_global}>Utilisateurs</h1>
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
                        <p className={style.titre}>Prenom :</p>
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
                        <p className={style.titre}>Mail du restos du coeur :</p>
                        <p>
                            {Utilisateur[0].mail_restos_du_coeur == null
                                ? '/'
                                : Utilisateur[0].mail_restos_du_coeur}
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
                </div>
            </div>
        </div>
    )
}
