'use client'
import { useEffect, useState } from 'react'
import style from '../../../../../styles/components.module.css'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'
import withAuthorization from '@/components/withAuthorization'

interface ExtendedSession extends Session {
    user: {
        name?: string | null
        email?: string | null
        image?: string | null
        role?: string
        id?: string
    }
}

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

function Modalites_livraisonPage({
    params,
}: {
    params: { donsID: string; modalites_livraisonID: string }
}) {
    const [modalite_livraison, setModalites_livraison] = useState<
        modalite_livraisonID[]
    >([])
    const [session, setSession] = useState<ExtendedSession | null>(null)

    useEffect(() => {
        const fetchModalites_livraison = async () => {
            const sessionData = await getSession()
            setSession(sessionData as ExtendedSession)

            if (!params.modalites_livraisonID) return

            const res = await fetch(
                `../../../../api/dons/${params.donsID}/modalites-livraison/${params.modalites_livraisonID}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const modalite_livraison: modalite_livraisonID[] = await res.json()
            setModalites_livraison(modalite_livraison)
        }

        fetchModalites_livraison()
    }, [params.modalites_livraisonID, params.donsID, session])

    if (!modalite_livraison || modalite_livraison.length === 0)
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
            const element = document.getElementById('livraison')
            if (element) {
                element.style.display = 'none'
            }
            const element2 = document.getElementById('reception')
            if (element2) {
                element2.style.display = 'none'
            }
        }
        applyPrintStyles()
        hideElements()
        window.print()
        document.body.innerHTML = originalContents
        window.location.reload()
    }

    const allowedRoles = ['AD', 'RR', 'PR', 'RC']

    return (
        <div className={style.idPage}>
            <div className={style.croixID}>
                <h1 className={style.titre_global}>Modalités de livraison</h1>
                <a href='javascript:history.go(-1)' className={style.btnC}>
                    <Image
                        className={style.CRid}
                        src='/IMG/return.svg'
                        height={30}
                        width={30}
                        alt='Fermer la fenêtre'
                    />
                </a>
            </div>
            {session &&
                session.user &&
                allowedRoles.includes(session.user.role!) && (
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
                            <p className={style.titre}>
                                Numéro de la livraison :
                            </p>
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
                                {modalite_livraison[0].code_type_livraison ==
                                null
                                    ? '/'
                                    : modalite_livraison[0].code_type_livraison}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Date prévue de la livraison :
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
                                Prénom du contact d&apos;enlévement :
                            </p>
                            <p>
                                {modalite_livraison[0]
                                    .prenom_contact_enlevement == null
                                    ? '/'
                                    : modalite_livraison[0]
                                          .prenom_contact_enlevement}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Téléphone du contact d&apos;enlévement :
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
                                Mail du contact d&apos;enlévement :
                            </p>
                            <p>
                                {modalite_livraison[0]
                                    .mail_contact_enlevement == null
                                    ? '/'
                                    : modalite_livraison[0]
                                          .mail_contact_enlevement}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Adresse d&apos;enlévement :
                            </p>
                            <p>
                                {modalite_livraison[0].adresse_enlevement ==
                                null
                                    ? '/'
                                    : modalite_livraison[0].adresse_enlevement}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Adresse de la livraison :
                            </p>
                            <p>
                                {modalite_livraison[0].adresse_livraison == null
                                    ? '/'
                                    : modalite_livraison[0].adresse_livraison}
                            </p>
                        </div>
                    </div>

                    <div className={style.col_2}>
                        <div className={style.info}>
                            <p className={style.titre}>
                                Nombre de palette(s) prévue(s) :
                            </p>
                            <p>
                                {modalite_livraison[0].nombre_palette_prevu ==
                                null
                                    ? '/'
                                    : modalite_livraison[0]
                                          .nombre_palette_prevu}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Nombre de palette(s) consignée(s) prévue(s) :
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
                            <p className={style.titre}>
                                Nombre de carton(s) prévu(s) :
                            </p>
                            <p>
                                {modalite_livraison[0].nombre_cartons_prevu ==
                                null
                                    ? '/'
                                    : modalite_livraison[0]
                                          .nombre_cartons_prevu}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Poids prévu en kg :</p>
                            <p>
                                {modalite_livraison[0].poids_prevu_kg == null
                                    ? '/'
                                    : modalite_livraison[0].poids_prevu_kg}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Produit(s) sur palette(s) ? :
                            </p>
                            <p>
                                {modalite_livraison[0].produits_sur_palettes ==
                                null
                                    ? '/'
                                    : modalite_livraison[0]
                                          .produits_sur_palettes}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Température pour la conservation du/des
                                produit(s) :
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
                            <p className={style.titre}>Pièces associées :</p>
                            <p>
                                {modalite_livraison[0].pieces_associees == null}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withAuthorization(Modalites_livraisonPage, [
    'AD',
    'AP',
    'EN',
    'SU',
])
