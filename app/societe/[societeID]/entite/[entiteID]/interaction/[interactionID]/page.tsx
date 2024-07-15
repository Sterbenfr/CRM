'use client'
import { useEffect, useState } from 'react'
import style from '../../../../../../../styles/components.module.css'

interface interactionID {
    code_interaction: number
    code_Utilisateur_Prospecteur: number
    code_Entite_Prospectee: number
    date_interaction: Date
    code_type_interaction: string
    code_modalite_interaction: string
    code_contact_entite: number
    commentaires: string
    pieces_associees: Blob
    date_relance: Date
}

export default function InteractionPage({
    params,
}: {
    params: { societeID: string; entiteID: string; interactionID: string }
}) {
    const [interaction, setInteraction] = useState<interactionID[]>([])

    useEffect(() => {
        const fetchInteraction = async () => {
            if (!params.interactionID) return

            const res = await fetch(
                `http://localhost:3000/api/societe/${params.societeID}/entite/${params.entiteID}/interactions/${params.interactionID}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const interaction: interactionID[] = await res.json()
            setInteraction(interaction)
        }

        fetchInteraction()
    }, [params.interactionID, params.societeID, params.entiteID])
    if (!interaction || interaction.length === 0) return <div>Loading...</div>

    return (
        <div className={style.idPage}>
            <div className='Titre_haut'>
                <h1 className={style.titre_global}>Details des interaction</h1>
            </div>

            <div className={style.info_id}>
                <div className={style.col_1}>
                    <div className={style.info}>
                        <p className={style.titre}>Code d&apos;interaction :</p>
                        <p>{interaction[0].code_interaction}</p>
                    </div>
                    <div className={style.info}>
                        <p className={style.titre}>
                            Code utilisateur prospecteur :
                        </p>
                        <p>
                            {interaction[0].code_Utilisateur_Prospecteur == null
                                ? '/'
                                : interaction[0].code_Utilisateur_Prospecteur}
                        </p>
                    </div>
                    <div className={style.info}>
                        <p className={style.titre}>Code entite prospectee :</p>
                        <p>
                            {interaction[0].code_Entite_Prospectee == null
                                ? '/'
                                : interaction[0].code_Entite_Prospectee}
                        </p>
                    </div>
                    <div className={style.info}>
                        <p className={style.titre}>
                            Date de l&apos;interaction :
                        </p>
                        <p>
                            {interaction[0].date_interaction == null
                                ? ''
                                : interaction[0].date_interaction
                                      .toString()
                                      .split('T')[0]}
                        </p>
                    </div>
                    <div className={style.info}>
                        <p className={style.titre}>
                            Code type d&apos;interaction :
                        </p>
                        <p>
                            {interaction[0].code_type_interaction == null
                                ? '/'
                                : interaction[0].code_type_interaction}
                        </p>
                    </div>
                </div>

                <div className={style.col_2}>
                    <div className={style.info}>
                        <p className={style.titre}>
                            Code modalite interaction :
                        </p>
                        <p>
                            {interaction[0].code_modalite_interaction == null
                                ? '/'
                                : interaction[0].code_modalite_interaction}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Code contact de l&apos;entite :
                        </p>
                        <p>
                            {interaction[0].code_contact_entite == null
                                ? '/'
                                : interaction[0].code_contact_entite}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Commentaires</p>
                        <p>
                            {interaction[0].commentaires == null
                                ? '/'
                                : interaction[0].commentaires}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Date relance :</p>
                        <p>
                            {interaction[0].date_relance == null
                                ? '/'
                                : interaction[0].date_relance
                                      .toString()
                                      .split('T')[0]}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
