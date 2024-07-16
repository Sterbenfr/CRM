'use client'
import { useEffect, useState } from 'react'
import style from '../../../../../styles/components.module.css'
import Image from 'next/image'

interface ReceptionID {
    numero_reception: number
    code_Don: number
    numero_BL: number
    date_reception: Date
    heure_reception: string
    nombre_palettes_recues: number
    nombre_palettes_consignees_recues: number
    nombre_palettes_consignees_rendues: number
    nombre_cartons_recus: number
    poids_recu_kg: number
    produits_sur_palettes: string
    commentaires: string
    pieces_associees: Blob
}

export default function ReceptionPage({
    params,
}: {
    params: { donsID: string; receptionID: string }
}) {
    const [reception, setReception] = useState<ReceptionID[]>([])

    useEffect(() => {
        const fetchReception = async () => {
            if (!params.receptionID) return

            const res = await fetch(
                `http://localhost:3000/api/dons/${params.donsID}/reception/${params.receptionID}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const reception: ReceptionID[] = await res.json()
            setReception(reception)
        }

        fetchReception()
    }, [params.receptionID, params.donsID])
    if (!reception || reception.length === 0)
        return (
            <div className={style.page}>
                <h2 className={style.load}>Chargement...</h2>
            </div>
        )

    return (
        <div className={style.idPage}>
            <div className={style.croixID}>
                <h1 className={style.titre_global}>Récéption</h1>
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
                        <p className={style.titre}>Numéro de réception :</p>
                        <p>
                            {reception[0].numero_reception == null
                                ? '/'
                                : reception[0].numero_reception}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Code de don :</p>
                        <p>
                            {reception[0].code_Don == null
                                ? '/'
                                : reception[0].code_Don}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Numéro BL :</p>
                        <p>
                            {reception[0].numero_BL == null
                                ? '/'
                                : reception[0].numero_BL}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Date de réception :</p>
                        <p>
                            {reception[0].date_reception == null
                                ? '/'
                                : reception[0].date_reception
                                      .toString()
                                      .split('T')[0]}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Heure de réception :</p>
                        <p>
                            {reception[0].heure_reception == null
                                ? '/'
                                : reception[0].heure_reception}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Nombre de palettes recues :
                        </p>
                        <p>
                            {reception[0].nombre_palettes_recues == null
                                ? '/'
                                : reception[0].nombre_palettes_recues}
                        </p>
                    </div>
                </div>
                <div className={style.col_2}>
                    <div className={style.info}>
                        <p className={style.titre}>
                            Nombre palettes consignées recues :
                        </p>
                        <p>
                            {reception[0].nombre_palettes_consignees_recues ==
                            null
                                ? '/'
                                : reception[0]
                                      .nombre_palettes_consignees_recues}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Nombre de palettes consignées rendues :
                        </p>
                        <p>
                            {reception[0].nombre_palettes_consignees_rendues ==
                            null
                                ? '/'
                                : reception[0]
                                      .nombre_palettes_consignees_rendues}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Nombre de cartons recus :</p>
                        <p>
                            {reception[0].nombre_cartons_recus == null
                                ? '/'
                                : reception[0].nombre_cartons_recus}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Poids recu en kg :</p>
                        <p>
                            {reception[0].poids_recu_kg == null
                                ? '/'
                                : reception[0].poids_recu_kg}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Produits sur les palettes :
                        </p>
                        <p>
                            {reception[0].produits_sur_palettes == null
                                ? '/'
                                : reception[0].produits_sur_palettes}
                        </p>
                    </div>
                    <div className={style.info}>
                        <p className={style.titre}>commentaires :</p>
                        <p>
                            {reception[0].commentaires == null
                                ? '/'
                                : reception[0].commentaires}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
