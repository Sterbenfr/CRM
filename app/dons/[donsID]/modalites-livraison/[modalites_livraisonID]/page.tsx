'use client'
import { useEffect, useState } from 'react'
import style from '../../../../../styles/components.module.css'

interface modalite_livraisonID {
    numero_livraison: number
    code_Don: number
    code_type_livraison: string
    date_prevue_livraison: Date
    adresse_enlevement: string
    civilite_contact_enlevement: string
    nom_contact_enlevement: string
    prenom_contact_enlevement: string
    telephone_contact_enlevement: string
    mail_contact_enlevement: string
    code_Prestataire_transporteur: number
    adresse_livraison: string
    civilite_contact_livraison: string
    nom_contact_livraison: string
    prenom_contact_livraison: string
    telephone_contact_livraison: string
    mail_contact_livraison: string
    nombre_palette_prevu: number
    nombre_palettes_consignees_prevu: number
    nombre_cartons_prevu: number
    poids_prevu_kg: number
    produits_sur_palettes: string
    temperature_conserv_produits: number
    commentaires: string
    pieces_associees: Blob
}
export default function Modalites_livraisonPage({
    params,
}: {
    params: { donsID: string; modalites_livraisonID: string }
}) {
    const [modalite_livraison, setModalites_livraison] = useState<
        modalite_livraisonID[]
    >([])

    useEffect(() => {
        const fetchModalites_livraison = async () => {
            if (!params.modalites_livraisonID) return

            const res = await fetch(
                `http://localhost:3000/api/dons/${params.donsID}/modalites-livraison/${params.modalites_livraisonID}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const modalite_livraison: modalite_livraisonID[] = await res.json()
            setModalites_livraison(modalite_livraison)
        }

        fetchModalites_livraison()
    }, [params.modalites_livraisonID, params.donsID])
    if (!modalite_livraison || modalite_livraison.length === 0)
        return <div>Loading...</div>

    return (
        <div className={style.idPage}>
            <div>
                <h1 className={style.titre_global}>Modalites livraison</h1>
            </div>
            <div className={style.info_id}>
                <div className={style.col_1}>
                    <div className={style.info}>
                        <p className={style.titre}>Numero de la livraison :</p>
                        <p>
                            {modalite_livraison[0].numero_livraison == null
                                ? '/'
                                : modalite_livraison[0].numero_livraison}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Code du don :</p>
                        <p>
                            {modalite_livraison[0].code_Don == null
                                ? '/'
                                : modalite_livraison[0].code_Don}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Code du type de livraison :
                        </p>
                        <p>
                            {modalite_livraison[0].code_type_livraison == null
                                ? '/'
                                : modalite_livraison[0].code_type_livraison}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Date prevue de la livraison :
                        </p>
                        <p>
                            {
                                modalite_livraison[0].date_prevue_livraison
                                    .toString()
                                    .split('T')[0]
                            }
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Prenom du contact enlevement :
                        </p>
                        <p>
                            {modalite_livraison[0].prenom_contact_enlevement ==
                            null
                                ? '/'
                                : modalite_livraison[0]
                                      .prenom_contact_enlevement}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Téléphone du contact enlevement :
                        </p>
                        <p>
                            {modalite_livraison[0]
                                .telephone_contact_enlevement == null
                                ? '/'
                                : modalite_livraison[0]
                                      .telephone_contact_enlevement}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Mail du contact enlevement :
                        </p>
                        <p>
                            {modalite_livraison[0].mail_contact_enlevement ==
                            null
                                ? '/'
                                : modalite_livraison[0].mail_contact_enlevement}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Adresse enlevement :</p>
                        <p>
                            {modalite_livraison[0].adresse_enlevement == null
                                ? '/'
                                : modalite_livraison[0].adresse_enlevement}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Adresse de la livraison :</p>
                        <p>
                            {modalite_livraison[0].adresse_livraison == null
                                ? '/'
                                : modalite_livraison[0].adresse_livraison}
                        </p>
                    </div>
                </div>
                <div className={style.col_2}>
                    <div className={style.info}>
                        <p className={style.titre}>Nombre de palette prevu :</p>
                        <p>
                            {modalite_livraison[0].nombre_palette_prevu == null
                                ? '/'
                                : modalite_livraison[0].nombre_palette_prevu}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Nombre de palettes consignées prevu :
                        </p>
                        <p>
                            {modalite_livraison[0]
                                .nombre_palettes_consignees_prevu == null
                                ? '/'
                                : modalite_livraison[0]
                                      .nombre_palettes_consignees_prevu}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Nombre de cartons prevu :</p>
                        <p>
                            {modalite_livraison[0].nombre_cartons_prevu == null
                                ? '/'
                                : modalite_livraison[0].nombre_cartons_prevu}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Poids prevu kg :</p>
                        <p>
                            {modalite_livraison[0].poids_prevu_kg == null
                                ? '/'
                                : modalite_livraison[0].poids_prevu_kg}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Produits sur palettes :</p>
                        <p>
                            {modalite_livraison[0].produits_sur_palettes == null
                                ? '/'
                                : modalite_livraison[0].produits_sur_palettes}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Temperature pour la conservation du produit :
                        </p>
                        <p>
                            {modalite_livraison[0]
                                .temperature_conserv_produits == null
                                ? '/'
                                : modalite_livraison[0]
                                      .temperature_conserv_produits}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Commentaires :</p>
                        <p>
                            {modalite_livraison[0].commentaires == null
                                ? '/'
                                : modalite_livraison[0].commentaires}
                        </p>
                    </div>

                    {/* A revoir : Type Blob */}

                    <div className={style.info}>
                        <p className={style.titre}>Nombre de cartons prevu :</p>
                        <p>{modalite_livraison[0].pieces_associees == null}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
