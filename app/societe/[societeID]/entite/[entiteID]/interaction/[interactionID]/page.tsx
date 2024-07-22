'use client'
import { useEffect, useState } from 'react'
import style from '../../../../../../../styles/components.module.css'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'

interface ExtendedSession extends Session {
    user: {
        name?: string | null
        email?: string | null
        image?: string | null
        role?: string // Add the role property
        id?: string
    }
}

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
    const [session, setSession] = useState<ExtendedSession | null>(null)
    useEffect(() => {
        const fetchInteraction = async () => {
            const sessionData = await getSession()
            setSession(sessionData as ExtendedSession)
            if (!params.interactionID) return

            const res = await fetch(
                `../../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/interactions/${params.interactionID}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const interaction: interactionID[] = await res.json()
            setInteraction(interaction)
        }

        fetchInteraction()
    }, [params.interactionID, params.societeID, params.entiteID])
    if (!interaction || interaction.length === 0)
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
            const element = document.getElementById('hide1')
            if (element) {
                element.style.display = 'none'
            }
            const element2 = document.getElementById('hide2')
            if (element2) {
                element2.style.display = 'none'
            }
            const element3 = document.getElementById('hide3')
            if (element3) {
                element3.style.display = 'none'
            }
        }
        applyPrintStyles()
        hideElements()
        window.print()
        document.body.innerHTML = originalContents
        window.location.reload()
    }

    return (
        <div className={style.idPage}>
            <div className={style.croixID}>
                <h1 className={style.titre_global}>Details des interaction</h1>
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

            {session &&
                session.user &&
                session.user.role === ('AD' || 'RR' || 'PR' || 'RC') && (
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
                                Code d&apos;interaction :
                            </p>
                            <p>{interaction[0].code_interaction}</p>
                        </div>
                        <div className={style.info}>
                            <p className={style.titre}>
                                Code utilisateur prospecteur :
                            </p>
                            <p>
                                {interaction[0].code_Utilisateur_Prospecteur ==
                                null
                                    ? '/'
                                    : interaction[0]
                                          .code_Utilisateur_Prospecteur}
                            </p>
                        </div>
                        <div className={style.info}>
                            <p className={style.titre}>
                                Code entite prospectee :
                            </p>
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
                                {interaction[0].code_modalite_interaction ==
                                null
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
        </div>
    )
}
